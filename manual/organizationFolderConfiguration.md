# US_06.001 | Organisation folder > Configuration

## TC_06.001.01 | Verify the Organization Folder icon changed from "Metadata Folder Icon" to the "Default Icon"
**Preconditions:**
1. User is logged in.
2. An Organization Folder was created.
3. User is on the Organization Folder Configure page.

**Steps:**
1. Click on the 'Appearance' link in the side menu.
2. Select the 'Default Icon' option from the 'Icon' dropdown menu.
3. Click on the 'Save' button.
4. Verify the "Default Icon" is  visible.




## TC_06.001.02 | Verify the possibility to set the Organization Folder Repository Source configuration
**Preconditions:**
1. User is logged in.
2. An Organization Folder was created.
3. User is on the Organization Folder Configure page.

**Steps:**
1. Click on the 'Add' button of the 'Repository Sources' section.
2. Select the 'Single repository' dropdown option.
3. Fill in the repository name into the input field.
4. Click on the 'Add' button of the 'Sources' section.
5. Select the 'Single repository & branch' dropdown option.
6. Fill in the single branch name into the input field.
7. Enter the project reposittory URL into the 'Repository URL' input field.
8. Click on the 'Save' button.
9. Click on the 'Configure' link in the side menu.
10. Verify the single repository, Single branch name and the Repository URL contain the expected input values.




## TC_06.001.03 | Verify the Organization Folder is scanned after configuring the "Projects" settings and saving
**Preconditions:**
1. User is logged in.
2. An Organization Folder was created.
3. User is on the Organization Folder Configure page.

**Steps:**
1. Click on the 'Add' button of the 'Repository Sources' section.
2. Select the 'Single repository' dropdown option.
3. Fill in the repository name into the input field.
4. Click on the 'Add' button of the 'Sources' section.
5. Select the 'Single repository & branch' dropdown option.
6. Fill in the single branch name into the input field.
7. Enter the project reposittory URL into the 'Repository URL' input field.
8. Click on the 'Save' button.
9. Verify the Organization Folder was scanned.




## TC_06_001.04 | Verify the Publisher white-list of the 'Untrusted' section contains all possible options
**Preconditions:**
1. User is logged in.
2. An Organization Folder was created.
3. User is on the Organization Folder Configure page.

**Steps:**
1. Click on the 'Add property' button.
2. Select the 'Untrusted' dropdown option.
3. Verify the 'Publisher white-list' contains all possible options.
