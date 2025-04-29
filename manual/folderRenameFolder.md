# US_04.001 | Folder > Rename Folder

## TC_04.001.01 | Verify a Folder is renamed from drop-down menu of the folder-element in the breadcrumb
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
1. Hover over the breadcrumb Folder link in the header. 
2. Click on the dropdown chevron.
3. Click on the 'Rename' dropdown option.
4. Fill in a new name into the input field (e.g. 'Folder_2').
5. Click on the 'Rename' button.
6. Verify the Folder was renamed.




## TC_04.001.02 | Verify a Folder name changes are observed from both Folder and Dashboard pages
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the Folder page.

**Steps:**
1. Click on the 'Rename' link in the sidebar menu. 
2. Fill in a new name into the input field (e.g. 'Folder_2').
3. Click on the 'Rename' button.
4. Verify the updated Folder name is displayed on the Folder page.
5. Click on the Jenkins logo.
6. Verify the updated Folder name is displayed on the Dashboard page.




## TC_04.001.03 | Verify the presence of the "Display Name" hint and its description on the Configure page when clicked
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the Folder page.

**Steps:**
1. Click on the 'Configure' link in the sidebar menu.
2. Hover over the 'Display Name' hint.
3. Verify the presence of the "Display Name" hint with the text 'Help for feature: Display Name'.
4. Click on the 'Display Name' hint.
5. Verify the display of the hint description text under the 'Display Name' input field.




## TC_04.001.04 | Verify that the display name when set, is shown on both Folder and Dashboard pages
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the Folder page.

**Steps:**
1. Click on the 'Rename' link in the sidebar menu. 
2. Fill in a new name into the input field (e.g. 'Folder_2').
3. Click on the 'Rename' button.
4. Verify the Folder was renamed.
5. Click on the 'Configure' link in the sidebar menu.
6. Fill in a Display name into the input field.
7. Click on the 'Save' button.
8. Verify the Display name is shown on the Folder page.
9. Click on the Dashboard breadcrumb link.
10. Verify the Display name is shown on the Dashboard page.