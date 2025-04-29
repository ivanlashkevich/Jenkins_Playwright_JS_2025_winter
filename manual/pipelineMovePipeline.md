# US_02.006 | Pipeline > Move pipeline

## TC_02.006.01 | Verify the "Move" link appears on the Pipeline page only after a Folder is created
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link in the left sidebar.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Pipeline').
4. Click the 'OK' button.
5. Click the 'Save' button.
6. Verify the 'Move' link isn't displayed.
7. Click on the Jenkins logo.
8. Click on the 'New Item' link in the left sidebar.
9. Enter an item name into the input field (e.g. 'Item_1).
10. Select an item type (e.g. 'Folder').
11. Click the 'OK' button.
12. Click the 'Save' button.
13. Verify the 'Move' link appeared.




## TC_02.006.02 | Verify the possibility to view a list of available target projects in the move dropdown menu
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).
3. The two Folders and a Pipeline were created.

**Steps:**
1. Click on the Pipeline link in the job table.
2. Click on the 'Move' link in the side menu.
3. Click on the 'Move' dropdown menu.
4. Verify the display of the list of available target projects




## TC_02.006.03 | Verify that after the move, the pipeline is transferred to the target project
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).
3. The two Folders and a Pipeline were created.

**Steps:**
1. Click on the Pipeline link in the job table.
2. Click on the 'Move' link in the side menu.
3. Click on the 'Move' dropdown menu.
4. Select the destination project for the Pipeline (e.g. 'Jenkins » Folder_1').
5. Click on the 'Move' button.
6. Click on the target project link in the breadcrumb (e.g. 'Folder_1').
7. Verify the Pipeline is displayed in the target project job table.




## TC_02.006.04 | Verify that after the move is complete, the pipeline retained its configurations and data
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).
3. The two Folders and a Pipeline were created.

**Steps:**
1. Click on the Pipeline link in the job table.
2. Click on the 'Configure' link in the side menu.
3. Click on the 'Pipeline' buutton in the side menu.
4. Select the 'Pipeline script from SCM' option from the 'Definition' dropdown.
5. Select the 'Git' dropdown option from the 'SCM' dropdown.
6. Enter the project reposittory URL into the 'Repository URL' input field.
7. Click on the 'Save' button.
8. Click on the 'Move' link in the side menu.
9. Click on the 'Move' dropdown menu.
10. Select the destination project for the Pipeline (e.g. 'Jenkins » Folder_1').
11. Click on the 'Move' button.
12. Click on the target project link in the breadcrumb (e.g. 'Folder_1').
13. Verify the Pipeline is displayed in the target project job table.
14. Click on the Pipeline project link in the job table.
15. Click on the Pipeline button.
16. Click on the 'Configure' link in the leftside menu.
17. Click on the 'Pipeline' link in the leftside menu.
18. Verify the 'Pipeline script from SCM' is seleted and the project reposittory URL is visible.