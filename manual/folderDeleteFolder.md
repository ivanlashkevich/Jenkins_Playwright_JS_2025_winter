# US_04.003 | Folder > Delete Folder

## TC_04.003.01 | Verify that after deleting a top-level folder, the user is redirected to the DashboardPage
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the subfolder page.

**'Creating a folder and a subfolder' steps:**
1. Click on the 'New Item' link.
2. Enter an item name (e.g. 'Folder_1');
3. Select the Folder item type.
4. Click the 'OK' button.
5. Click the 'Save' button.
6. Click on the 'Create a job' button.
7. Enter an item name (e.g. 'Folder_2');
8. Select the Folder item type.
9. Click the 'OK' button.
10. Click the 'Save' button.

**Steps:**
1. Click on the top-level folder link in the breadcrumb menu.
2. Verify the user is on the top-level folder page.
3. Click on the 'Delete Folder' link in the sidebar menu.
4. Click on the 'Yes' button.
5. Verify the top-level Folder was deleted and the user is on the Dashboard page.




## TC_04.003.02 | Verify that after deleting a subfolder, the user is redirected to the top-level FolderPage
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the subfolder page.

**Steps:**
1. Verify the user is on the subfolder page.
2. Click on the 'Delete Folder' link in the sidebar menu.
3. Click on the 'Yes' button.
4. Verify the subfolder was deleted and the user is on the top-level folder page.




## TC_04.003.03 | Verify the user can create a folder and a subfolder with the names of the deleted ones
**Preconditions:**
1. User is logged in.
2. A Folder was created.
3. User is on the subfolder page.

**Steps:**
1. Verify the title of the subfolder is as expected (e.g. 'Folder_2').
2. Click on the top-level folder link in the breadcrumb menu (e.g. 'Folder_1').
3. Verify the title of the top-level folder is as expected (e.g. 'Folder_1').
4. Click on the 'Delete Folder' link in the sidebar menu.
5. Click on the 'Yes' button.
6. Verify the folder with its subfolder were deleted.
7. Click on the 'New Item' link.
8. Enter an item name (e.g. 'Folder_1');
9. Select the Folder item type.
10. Click the 'OK' button.
11. Click the 'Save' button.
12. Click on the 'Create a job' button.
13. Enter an item name (e.g. 'Folder_2');
14. Select the Folder item type.
15. Click the 'OK' button.
16. Click the 'Save' button.
17. Verify the subfolder title is as the deleted one (e.g. 'Folder_2');
18. Click on the top-level folder link in the breadcrumb menu (e.g. 'Folder_1').
19. Verify the top-level folder title is as the deleted one (e.g. 'Folder_1');
