# US_00.000 | New Item > Create New item

## TC_00.000.01 | Verify a New Item is created using the "Create a job" button
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'Create a job' button.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Freestyle project').
4. Click the 'OK' button.
5. Click the 'Save' button.
6. Verify the new item name is as expected.
7. Click the Jenkins logo.
8. Verify that the new item (e.g. 'Item_1') was created.




## TC_00.000.02 | Verify a New Item is created from the "New Item" link in the left sidebar
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the "New Item" link in the left sidebar.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Freestyle project').
4. Click the 'OK' button.
5. Click the 'Save' button.
6. Verify the new item name is as expected.
7. Click the Jenkins logo.
8. Verify that the new item (e.g. 'Item_1') was created.




## TC_00.000.03 | Verify a New Item is created from the Dashboard dropdown menu
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Hower over the 'Dashboard' link in the left top corner.
2. Click on the dropdown chevron.
3. Select the 'New Item' dropdown option.
4. Enter an item name into the input field (e.g. 'Item_1).
5. Select an item type (e.g. 'Freestyle project').
6. Click the 'OK' button.
7. Click the 'Save' button.
8. Click the 'Dashboard' link in the left top corner.
9. Verify that the new item (e.g. 'Item_1') was created.




## TC_00.000.04 | Verify the New Item can only be created using unique item name
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).
3. A Freestyle project was created.

**'Creating a Freestyle project' steps:**
1. Click on the 'Create a job' button.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Freestyle project').
4. Click on the 'OK' button.
5. Click on the 'Save' button.
6. Click on the Jenkins logo in the header.

**Steps:**
1. Click on the 'New Item' button.
2. Enter the previously used item name into the input field (e.g. 'Item_1).
3. Verify the error '» A job already exists with the name ‘Item_1’ occured.
4. Select an item type (e.g. 'Freestyle project').
5. Verify the 'OK' button is disabled.
6. Enter a new item name into the input field (e.g. 'Item_2).
7. Click the 'OK' button.
8. Click the 'Save' button.
9. Click on the 'Dashboard' link in the header.
10. Verify the New Item with the unique item name was created.