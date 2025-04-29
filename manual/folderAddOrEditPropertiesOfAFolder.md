# US_04.005 | Folder > Add or Edit Properties of a Folder

## TC_04.005.01 | Verify the configured Health metrics and Pipeline Libraries properties of a Folder are saved
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the Folder page.

**'Creating a Folder' steps:**
1. Click on the 'New Item' link.
2. Enter an item name (e.g. 'Folder_1');
3. Select the Folder item type.
4. Click the 'OK' button.
5. Click the 'Save' button.

**Steps:**
1. Click on the 'Configure' link in the sidebar menu.
2. Click on the 'Health metrics' dropdown chevron.
3. Click on the 'Add metric' dropdown chevron.
4. Select the 'Child item with worst health' dropdown option.
5. Click on the 'Add' button of the 'Pipeline Libraries' section.
6. Fill in the Library name into the 'Library' input field.
7. Specify the repository URL in the 'Project Repository' input field.
8. Click the 'Save' button.
9. Click on the 'Configure' link in the sidebar menu.
10. Verify the Health metrics and Pipeline Libraries properties are saved.




## TC_04.005.02 | Verify the mandatory fields of the Pipeline Libraries of a Folder are marked with a red hint
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the Folder page.

**Steps:**
1. Click on the 'Configure' link in the sidebar menu.
2. Click on the 'Pproperties' link in the sidebar menu.
3. Click on the 'Add' button of the 'Pipeline Libraries' section.
4. Verify the mandatory field 'Name' is marked with a red hint with the text 'You must enter a name.'.
5. Select the 'Legacy SCM' option from the 'Retrieval method' dropdown menu.
6. Verify the mandatory field 'Repository URL' is marked with a red hint with the text 'Please enter Git repository.'.




## TC_04.005.03 | Verify the appeared section after checking the checkbox "Cache fetched versions on controller for quick retrieval"
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the Folder page.

**Steps:**
1. Click on the 'Configure' link in the sidebar menu.
2. Click on the 'Pproperties' link in the sidebar menu.
3. Click on the 'Add' button of the 'Pipeline Libraries' section.
4. Check the checkbox 'Cache fetched versions on controller for quick retrieval'.
5. Verify the appeared input fields 'Refresh time in minutes', 'Versions to exclude', 'Versions to include' and the checkbox 'Force clear cache'.