# US_00.004 | New item > Create Folder

## TC_00.004.01 | Verify a New Folder is created from Dashboard dropdown menu in the top left
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Hower over the 'Dashboard' link in the left top corner.
2. Click on the dropdown chevron.
3. Select the 'New Item' dropdown option.
4. Enter an item name into the input field (e.g. 'Item_1).
5. Select an item type (e.g. 'Folder').
6. Click the 'OK' button.
7. Click the 'Save' button.
8. Click the 'Dashboard' link in the left top corner.
9. Verify that the new item (e.g. 'Item_1') was created.




## TC_00.004.02 | Verify a New Folder is created from other existing
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).
3. A Folder with a description was created.

**Steps:**
1. Click on the 'New Item' link in the left sidebar.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Folder').
4. Fill in the 'Copy from' input field with the first folder name character (e.g. 'Folder_1').
5. Select the suggested option.
6. Click on the 'OK' button.
7. Click on the 'Save' button.
8. Click on the Jenkins logo.
9. Verify both Folders are displayed in the job table.




## TC_00.004.03 | Verify a New Folder can only be created using a unique name
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).
3. A Folder was created.

**Steps:**
1. Click on the 'New Item' link in the left sidebar.
2. Enter the recently created Folder name into the input field (e.g. 'Folder_1).
3. Verify the displayed validation message with the text '» A job already exists with the name ‘Folder_1’»'.
4. Select an item type (e.g. 'Folder').
5. Verify the 'OK' button is disabled.
6. Enter a new item name into the input field (e.g. 'Folder_2').
7. Click on the 'OK' button.
8. Click the 'Save' button.
9. Click the Jenkins logo.
10. Verify that the new Folder was created.