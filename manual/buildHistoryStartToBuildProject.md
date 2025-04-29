# US_08.001 | Build history > Start to build a project

## TC_08.001.01 | Verify the build status icon for "Not built" project and pipeline is shown on the "Dashboard" page
**Preconditions:**
1. User is logged in.
2. User is on the Dashboard page.
3. A Freestyle project and a Pipeline were created.

**Steps:**
Verify the "Not built" status icon is shown for the project and the pipeline.




## TC_08.001.02 | Verify the possibility for the user to "Schedule a build" from the "Dashboard page"
**Preconditions:**
1. User is logged in.
2. User is on the Dashboard page.
3. A Freestyle project and a Pipeline were created.

**Steps (performed sequentually for both projects: Freestyle project, Pipeline):**
1. Click on the "Schedule a Build" link for the Freestyle project/Pipeline in the job table.
2. Verify the "Build scheduled" notification is displayed.
3. Click on the "Build History" link in the side menu.
4. Verify the Freestyle project/Pipeline build appeared in the build history.
5. Click on the Jenkins logo.




## TC_08.001.03 | Verify the possibility to trigger a project build from the "Project page" using "Build Now" option from menu
**Preconditions:**
1. User is logged in.
2. User is on the Dashboard page.
3. A Freestyle project and a Pipeline were created.

**Steps (performed sequentually for both projects: Freestyle project, Pipeline):**
1. Click on the project link in the job table.
2. Click on the 'Build Now' link in the side menu.
3. Verify the "Build scheduled" notification is displayed.
4. Verify the project build appeared in the "Build History" section.
5. Click on the Jenkins logo.




## TC_08.001.04 | Verify the information about the new build appears on the "Build history" page
**Preconditions:**
1. User is logged in.
2. User is on the Dashboard page.
3. A Freestyle project and a Pipeline were created.

**Steps:**
1. Click on the "Schedule a Build" link for the project in the job table.
2. Click on the "Schedule a Build" link for the pipeline in the job table.
3. Click on the "Build History" link in the side menu.
4. Verify the builds are displayed in the "Build History of Jenkins" table.