# US_01.006 | FreestyleProject > Move project

## TC_01.006.01 | Verify the Freestyle project is moved to a Folder from the Dashboard page
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. A Folder was created.
4. User is on the Folder page.

**'Creating a Freestyle ptoject' steps:**
1. Click on the 'New Item' link.
2. Enter an item name into the input field (e.g. 'Item_1').
3. Select the Freestyle project item type.
4. Click the 'OK' button.
5. Click on the 'Save' button.
6. Click on the dashboard breadcrumb link in the header.

**'Creating a Folder' steps:**
7. Click on the 'New Item' link.
8. Enter an item name (e.g. 'Folder_1');
9. Select the Folder item type.
10. Click the 'OK' button.
11. Click the 'Save' button.

**Steps:**
1. Click on the Jenkins logo in the header.
2. Hover over the Freestyle project link in the job table.
3. Click on the dropdown chevron.
4. Click on the 'Move' dropdown option.
5. Select the destination path (e.g. 'Jenkins » Folder_1').
6. Click on the 'Move' button.
7. Verify the Freestyle project is located inside the Folder.
8. Click on the Folder title link in the dashboard breadcrumb menu.
9. Verify the Freestyle project is displayed in the job table on the Folder page.




## TC_01.006.02 | Verify the Freestyle project is moved to a Folder from the Project page
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. A Folder was created.
4. User is on the Folder page.

**Steps:**
1. Click on the Jenkins logo in the header.
2. Click on the Freestyle project link in the job table.
3. Click on the 'Move' link in the sidebar menu.
4. Select the destination path (e.g. 'Jenkins » Folder_1').
5. Click on the 'Move' button.
6. Verify the Freestyle project is located inside the Folder.
7. Click on the Folder breadcrumb link in the header.
8. Verify the Freestyle project is displayed in the job table on the Folder page.




## TC_01.006.03 | Verify the Freestyle project is moved to one of available Folders
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. A Folder was created.
4. User is on the Folder page.


**'Creating another Folder' steps:**
1. Click on the Jenkins logo in the header.
2. Click on the 'New Item' link.
3. Enter an item name (e.g. 'Folder_2');
4. Select the Folder item type.
5. Click the 'OK' button.
6. Click the 'Save' button.

**Steps:**
1. Click on the Jenkins logo in the header.
2. Hover over the Freestyle project link in the job table.
3. Click on the dropdown chevron.
4. Click on the 'Move' dropdown option.
5. Select the destination path (e.g. 'Jenkins » Folder_2').
6. Click on the 'Move' button.
7. Verify the Freestyle project is located inside the last created Folder (e.g. 'Folder_2').
8. Click on the Folder link (e.g. 'Folder_2') in Dashboard breadcrumb.
9. Verify the Freestyle project is displayed in the job table on the Folder page of the selected Folder (e.g. 'Folder_2').




## TC_01.006.04 | Verify a Freestyle project created from a Folder, is inside this Folder by default
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. A Folder was created.
4. User is on the Folder page.

**Steps:**
1. Click on the 'Create a job' link.
2. Enter an item name into the input field (e.g. 'Item_1').
3. Select the Freestyle project item type.
4. Click the 'OK' button.
5. Click on the 'Save' button.
6. Verify the Freestyle project is located inside the Folder (e.g. 'Folder_1').
7. Click on the Folder link (e.g. 'Folder_1') in Dashboard breadcrumb.
8. Verify the Freestyle project (e.g. 'Item_2') is displayed in the job table on the Folder page.