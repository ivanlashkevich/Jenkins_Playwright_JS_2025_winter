# US_00.002 | New Item > Create Pipeline Project

## TC_00.002.01 | Verify the url of the configure page contains the name of the new Pipeline
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link in the left sidebar.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Pipeline').
4. Verify the configure page url contains the Pipeline name.
5. Click the 'OK' button.
6. Click the 'Save' button.
7. Click on the Jenkins logo in the header.
8. Verify that the new Pipeline project (e.g. 'Item_1') was created.




## TC_00.002.02 | Verify the Pipeline project name does not contain any special characters
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link in the left sidebar.
2. Enter an item name, containing special characters, into the input field (e.g. 'Item#1).
3. Verify the display of the validation message with the text '» ‘#’ is an unsafe character' under the input field.
4. Clear the input field.
5. Enter an item name, not containing any special characters, into the input field (e.g. 'Item_1').
6. Select an item type (e.g. 'Pipeline').
7. Click on the 'OK' button.
8. Click on the 'Save' button.
9. Click on the 'Dashboard' breadcrumbs link in the header.
10. Verify that the new Pipeline project (e.g. 'Item_1') was created.
11. Verify that the item name does not contain any special characters.




## TC_00.002.03 | Verify the possibility to create the Pipeline project with any special characters in its name
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link in the left sidebar.
2. Enter an item name, containing special characters, into the input field (e.g. 'Item#1).
3. Verify the display of the validation message with the text '» ‘#’ is an unsafe character' under the input field.
4. Select an item type (e.g. 'Pipeline').
5. Ensure that the 'OK' button is disabled.
6. Click on the Jenkins logo in the header.
7. Verify that the Pipeline project (e.g. 'Item_1') was not created.