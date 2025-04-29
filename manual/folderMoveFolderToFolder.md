# US_04.002 | Folder > Move Folder to Folder

## TC_04.002.01 | Verify the possibility to move one Folder to another from the Folder page
**Preconditions:**
1. User is logged in.
2. Two Folders were created.
3. User is on main page (dashboard).

**'Creating a Folder' steps:**
1. Click on the 'New Item' link.
2. Enter an item name (e.g. 'Folder_1');
3. Select the Folder item type.
4. Click the 'OK' button.
5. Click the 'Save' button.
6. Click on the 'Dashboard' breadcrumb link.

**Steps:**
1. Click on the Folder link in the job table.
2. Click on the 'Move' link in the sidebar menu.
3. Select the destination path for the Folder (e.g. 'Folder_2');
4. Click on the 'Move' button.
5. Verify the Folder was moved to another Folder.




## TC_04.002.02 | Verify all possible paths for moving the folder are displayed in the dropdown menu
**Preconditions:**
1. User is logged in.
2. Two Folders were created.
3. User is on main page (dashboard).

**Steps:**
1. Verify there are only two Folders created.
2. Hover over the Folder link (e.g. 'Folder_1') in the job table.
3. Click on the dropdown chevron.
4. Click on the 'Move' dropdown option.
5. Click on the 'Move' dropdown.
6. Verify all possible paths for moving the folder are displayed in the dropdown menu: 'Jenkins', 'Jenkins » Folder_1'.




## TC_04.002.03 | Verify the possibility to see the location of the moved folder in the breadcrumbs
**Preconditions:**
1. User is logged in.
2. Two Folders were created.
3. User is on main page (dashboard).

**Steps:**
1. Hover over the 1st Folder link in the job table.
2. Click on the appeared dropdown chevron.
3. Click on the 'Move' dropdown option.
4. Click on the 'Move' dropdown.
5. Select the destination path for the Folder (e.g. 'Folder_2').
6. Click the 'Move' button.
7. Verify the location of the moved Folder (e.g. 'Folder_1') in the breadcrumb.




## TC_04.002.04 | Verify the abscence of the Move section on the Folder page if there is only one Folder on the Dashboard page
**Preconditions:**
1. User is logged in.
2. Two Folders were created.
3. User is on main page (dashboard).

**Steps:**
1. Click on the Folder link in the job table.
2. Click on the 'Move' link in the sidebar menu.
3. Verify the presence of the 'Move' section on the Folder page.
4. Click on the 'Delete Folder' link in the sidebar menu.
5. Click on the 'Yes' button.
6. Ensure there is only one Folder in the jobs table.
7. Click on the Folder link in the job table.
8. Verify the absence of the 'Move' section on the Folder page.
