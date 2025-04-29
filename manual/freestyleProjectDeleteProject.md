# US_01.004 | FreestyleProject > Delete Project

## TC_01.004.01 | Verify the Freestyle project is deleted from the Dashboard page
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the Project page.

**'Creating a Freestyle ptoject' steps:**
1. Click on the 'New Item' link.
2. Enter an item name into the input field (e.g. 'Item_1').
3. Select the Freestyle project item type.
4. Click the 'OK' button.
5. Click on the 'Save' button.

**Steps:**
1. Click on the dashboard breadcrumb link in the header.
2. Hover over the Freestyle project link in the job table.
3. Click on the dropdown chevron.
4. Click on the 'Delete Project' dropdown option.
5. Click on the 'Yes' button.
6. Verify the Freestyle project is deleted.




## TC_01.004.02 | Verify the Freestyle project is deleted from the Project page after deletion cancel
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the Project page.

**Steps:**
1. Click on the 'Delete Project' link in the sidebar menu.
2. Click on the 'Cancel' button.
3. Click on the 'Delete Project' link.
4. Verify the 'Cancel' and the 'Yes' buttons are both enabled.
5. Click on the 'Yes' button.
6. Verify the Freestyle project is deleted.




## TC_01.004.03 | Verify the confirmation message is displayed before deletion
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the Project page.

**Steps:**
1. Click on the 'Delete Project' link in the sidebar menu.
2. Verify the display of the confirmation message titled 'Delete Project' with the text 'Delete the Project ‘Item_1’?'.