import dotenv from 'dotenv';
dotenv.config();

const JENKINS_HOST = process.env.LOCAL_HOST || 'localhost';
const JENKINS_PORT = process.env.LOCAL_PORT || 8080;
const JENKINS_USER = process.env.LOCAL_ADMIN_USERNAME || 'admin';
const JENKINS_API_TOKEN = process.env.LOCAL_ADMIN_TOKEN;

async function getJenkinsCrumb() {
    const crumbUrl = `http://${JENKINS_HOST}:${JENKINS_PORT}/crumbIssuer/api/json`;
    const response = await fetch(crumbUrl, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return { crumb: data.crumb, field: data.crumbRequestField };
    } else {
        throw new Error(`Failed to fetch crumb. Status: ${response.status} - ${response.statusText}`);
    }
}

async function deleteJobs() {
    try {
        const projectNames = await listProjects();
        // console.log('Deleting jobs:', projectNames);
        await deleteMultipleProjects(projectNames);
    } catch (error) {
        console.error('Error deleting jobs:', error);
    }
}

async function deleteViews() {
    try {
        const { crumb, field } = await getJenkinsCrumb();
        const viewNames = await getViews();

        await Promise.all(viewNames
            .filter(name => name !== 'All')
            .map(async viewName => {
                const url = `http://${JENKINS_HOST}:${JENKINS_PORT}/view/${encodeURIComponent(viewName)}/doDelete`;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
                        [field]: crumb,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                // console.log(res.ok ? `Deleted view: ${viewName}` : `Failed to delete ${viewName} (Status: ${res.status})`);
            })
        );
    } catch (error) {
        console.error('View deletion error:', error.message);
    }
}

async function getViews() {
    // Try API first
    const apiRes = await fetch(`http://${JENKINS_HOST}:${JENKINS_PORT}/api/json?tree=views[name]`, {
        headers: { Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}` }
    });
    if (apiRes.ok) return (await apiRes.json()).views.map(v => v.name);

    // Fallback to UI scraping
    const html = await (await fetch(`http://${JENKINS_HOST}:${JENKINS_PORT}/`)).text();
    return [...new Set([...(html.match(/href="\/view\/([^\/]+)\/"/g) || [])]
        .map(match => match.match(/\/view\/([^\/]+)\//)[1]))];
}

async function deleteUsers() {
    try {
        const script = `
    import jenkins.model.*
    import hudson.model.*
    import hudson.security.*

    def currentUser = '${JENKINS_USER}'
    def instance = Jenkins.getInstance()
    def userList = hudson.model.User.getAll()
    def deleted = []

    for (user in userList) {
        def userId = user.getId()
        if (userId != currentUser && userId != 'anonymous') {
            try {
                user.delete()
                deleted << userId
            } catch (e) {
                println "Failed to delete user \${userId}: \${e.message}"
            }
        }
    }

    // Ensure the 'All' view still exists
    if (instance.getView("All") == null) {
        def allView = new AllView("All")
        instance.addView(allView)
        instance.setPrimaryView(allView)
    }

    return "Deleted users: " + deleted.join(", ")
`;

        const { crumb, field } = await getJenkinsCrumb();
        const res = await fetch(`http://${JENKINS_HOST}:${JENKINS_PORT}/scriptText`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                [field]: crumb,
            },
            body: `script=${encodeURIComponent(script)}`,
        });

        const resultText = await res.text();

        if (res.ok) {
            // console.log(`User deletion result: ${resultText}`);
        } else {
            console.error(`Failed to run script. Status: ${res.status}`);
        }

    } catch (error) {
        console.error('Error deleting users via script:', error);
    }
}

async function deleteNodes() {
    try {
        const mainPageUrl = `http://${JENKINS_HOST}:${JENKINS_PORT}/`;
        const response = await fetch(mainPageUrl, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
            },
        });

        if (response.ok) {
            const html = await response.text();
            const nodes = getSubstringsFromPage(html, 'href="/computer/', '/"');
            for (const node of nodes) {
                const deleteUrl = `http://${JENKINS_HOST}:${JENKINS_PORT}/computer/${node}/doDelete`;
                const crumb = getCrumbFromPage(html);
                await deleteByLink(deleteUrl, crumb);
                console.log(`Node "${node}" deleted successfully.`);
            }
        } else {
            console.error(`Failed to fetch nodes. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting nodes:', error);
    }
}

async function deleteDescription() {
    try {
        const mainPageUrl = `http://${JENKINS_HOST}:${JENKINS_PORT}/`;
        const response = await fetch(mainPageUrl, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
            },
        });

        if (response.ok) {
            const html = await response.text();
            const crumb = getCrumbFromPage(html);
            const url = `http://${JENKINS_HOST}:${JENKINS_PORT}/submitDescription`;
            const body = `description=&Submit=&Jenkins-Crumb=${crumb}&json=${encodeURIComponent(
                JSON.stringify({ description: "", Submit: "", "Jenkins-Crumb": crumb })
            )}`;

            const deleteResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
            });

            if (deleteResponse.ok) {
                // console.log('Description deleted successfully.');
            } else {
                console.error(`Failed to delete description. Status: ${deleteResponse.status}`);
            }
        } else {
            console.error(`Failed to fetch main page. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting description:', error);
    }
}

function getSubstringsFromPage(html, startDelimiter, endDelimiter) {
    const regex = new RegExp(`${startDelimiter}(.*?)${endDelimiter}`, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

function getCrumbFromPage(html) {
    const crumbMatch = html.match(/name="Jenkins-Crumb" value="(.*?)"/);
    return crumbMatch ? crumbMatch[1] : null;
}

async function deleteByLink(url, crumb) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
                'Jenkins-Crumb': crumb,
            },
        });

        if (response.ok) {
            console.log(`Deleted item at URL: ${url}`);
        } else {
            console.error(`Failed to delete item. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting item at ${url}:`, error);
    }
}

async function cleanData() {
    // console.log('Starting cleanup process...');
    await deleteViews();
    await deleteJobs();
    await deleteUsers();
    await deleteNodes();
    await deleteDescription();
    // console.log('Cleanup process completed.');
}

async function listProjects() {
    const url = `http://${JENKINS_HOST}:${JENKINS_PORT}/api/json?tree=jobs[name]`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.jobs.map(job => job.name);
    } else {
        throw new Error(`Failed to list projects. Status: ${response.status} - ${response.statusText}`);
    }
}

async function deleteMultipleProjects(projectNames) {
    for (const jobName of projectNames) {
        await deleteProjectByAPI(jobName);
    }
}

async function deleteProjectByAPI(jobName) {
    try {
        const { crumb, field } = await getJenkinsCrumb();

        const url = `http://${JENKINS_HOST}:${JENKINS_PORT}/job/${encodeURIComponent(jobName)}/doDelete`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${JENKINS_USER}:${JENKINS_API_TOKEN}`).toString('base64')}`,
                [field]: crumb,
            },
        });

        if (response.ok) {
            // console.log(`Project "${jobName}" deleted successfully.`);
        } else if (response.status === 404) {
            console.warn(`Project "${jobName}" not found for deletion.`);
        } else {
            console.error(`Failed to delete project "${jobName}". Status: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error deleting project "${jobName}":`, error);
    }
}

export { cleanData };
