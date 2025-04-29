const searchResultsData = {
    firstSearchCharacter: ['a', 'c', 'd', 'e', 'f', 'g', 'i', 'l', 'm', 'n', 'o', 'r', 't', 'u'],
    // 'Insensitive search tool' checkbox is checked;
    characterSearchResults: {
        'a': ['admin', 'All', 'manage'],
        'c': ['config', 'configure'],
        'd': ['admin', 'Built-In Node'],
        'e': ['manage', 'configure', 'Built-In Node'],
        'f': ['config', 'configure'],
        'g': ['log', 'config', 'manage', 'configure'],
        'i': ['admin', 'config', 'configure', 'Built-In Node'],
        'l': ['log', 'All', 'Built-In Node'],
        'm': ['manage', 'admin'],
        'n': ['admin', 'config', 'manage', 'configure', 'Built-In Node'],
        'o': ['log', 'config', 'configure', 'Built-In Node'],
        'r': ['configure'],
        't': ['Built-In Node'],
        'u': ['configure', 'Built-In Node']
    }
};

function projectName() {
    const projectName = ['blockchains', 'channels', 'initiatives', 'lifetime value', 'mindshare', 'relationships', 'technologies', 'users'];
    const randomIndex = Math.floor(Math.random() * projectName.length);
    return projectName[randomIndex];
}

const searchResults = {
    results: {
        'b': ['blockchains', 'Built-In Node'],
        'c': ['config', 'channels', 'configure'],
        'i': ['initiatives', 'admin', 'config', 'configure', 'Built-In Node'],
        'l': ['log', 'lifetime value', 'All', 'Built-In Node'],
        'm': ['manage', 'mindshare', 'admin'],
        'r': ['relationships', 'configure'],
        't': ['technologies', 'Built-In Node'],
        'u': ['users', 'configure', 'Built-In Node']
    }
};


function itemName() {
    const itemName = ['channels', 'initiatives', 'lifetime value', 'technologies'];
    const randomIndex = Math.floor(Math.random() * itemName.length);
    return itemName[randomIndex];
}

const searchSettingsResults ={
    results: {
        'c': ['Clouds', 'Appearance', 'Security', 'Credentials', 'Credential Providers'],
        'i': ['Plugins', 'Security', 'Credentials', 'Credential Providers', 'System Information'],
        'l': ['Tools', 'Plugins', 'Clouds', 'Credentials', 'Credential Providers'],
        't': ['System', 'Tools', 'Security', 'Credentials', 'Credential Providers'],
    }
}

export { searchResultsData, projectName, searchResults, itemName, searchSettingsResults };