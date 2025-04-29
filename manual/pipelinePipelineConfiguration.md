# US_02.004 | Pipeline > Pipeline Configuration

## TC_02.004.01 Verify the project is disabled via the Enable/Disable toggle
**Preconditions:**
1. User is logged in.
2. A Pipeline project was created.
3. User is on the Configure page.

**'Creating a Pipeline Project' steps:**
1. Click on the 'New Item' menu link.
2. Enter an item name into the input field.
3. Select Pipiline item type.
4. Click on the 'OK' button.

**Steps:**
1. Click on the 'Enabled' toggle.
2. Verify the toggle changed to 'Disabled'
3. Click on the 'Save' button.
4. Verify the project is disabled.




## TC_02.004.02 Verify the project is enabled after being disabled via the Enable/Disable toggle
**Preconditions:**
1. User is logged in.
2. A Pipeline project was created.
3. User is on the Configure page.

**Steps:**
1. Click on the 'Enabled' toggle.
2. Click on the 'Save' button.
3. Click on the 'Enable' button.
4. Click on the 'Configure' link in the leftside menu.
5. Verify the 'Enabled' option is switched on.




## TC_02.004.03 Verify the choice of the pipeline script directly in Jenkins (using the editor)
**Preconditions:**
1. User is logged in.
2. A Pipeline project was created.
3. User is on the Configure page.

**Steps:**
1. Click on the 'Pipeline' link in the leftside menu.
2. Select the 'Pipeline script' dropdown option.
3. Select the 'Scripted Pipeline' dropdown option.
4. Click on the 'Save' button.
5. Click on the 'Configure' link in the leftside menu.
6. Click on the 'Pipeline' link in the leftside menu.
7. Verify the 'Pipeline script' option is seleted.




## TC_02.004.04 Verify the choice of linking the pipeline to a Jenkinsfile stored in source control
**Preconditions:**
1. User is logged in.
2. A Pipeline project was created.
3. User is on the Configure page.

**Steps:**
1. Click on the 'Pipeline' link in the leftside menu.
2. Select the 'Pipeline script from SCM' option from the 'Definition' dropdown.
3. Select the 'Git' dropdown option from the 'SCM' dropdown.
4. Enter the project reposittory URL into the 'Repository URL' input field.
5. Click on the 'Save' button.
6. Click on the 'Configure' link in the leftside menu.
7. Click on the 'Pipeline' link in the leftside menu.
8. Verify the 'Pipeline script from SCM' is seleted and the project reposittory URL is visible.