# US_01.002 | FreestyleProject > Rename Project

## TC_01.002.01 | Verify the Freestyle project is renamed from the Dashboard page
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on Project page.

**'Creating a Freestyle Project' steps:**
1. Click on the 'Create a job' button.
2. Enter an item name (e.g. 'Item_1').
3. Select an item type (e.g. 'Freestyle project').
4. Click on the 'OK' button.
5. Click on the 'Save' button.

**Steps:**
1. Click on the dashboard breadcrumb link.
2. Hover over the project title link in the job table.
3. Click on the dropdown chevron.
4. Click on the 'Rename' dropdown menu item.
5. Fill in a new item name into the input field (e.g. 'Item_2').
6. Click on the 'Rename' button.
7. Verify the Freestyle project was renamed.
8. Click on the Jenkins logo.
9. Verify the renamed project is displayed in the project table.




## TC_01.002.02 | Verify the Freestyle project is renamed from the Project page
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on Project page.

**Steps:**
1. Verify the user is on the Project page.
2. Click on the 'Rename' menu option.
3. Fill in a new item name into the input field (e.g. 'Item_2').
4. Click on the 'Rename' button.
5. Verify the Freestyle project was renamed.
6. Click on the Jenkins logo.
7. Verify the renamed project is displayed in the project table.




## TC_01.002.03 | Verify the Freestyle project is renamed using Cyrillic
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on Project page.

**Steps:**
1. Click on the 'Rename' menu option.
2. Fill in a new item name into the input field, using Cyrillic (e.g. 'Элемент').
3. Check the input item name value.
4. Click on the 'Rename' button.
5. Verify the Freestyle project was renamed.
6. Click on the Jenkins logo.
7. Verify the project name in Сyrillic is displayed in the project table.




## TC_01.002.04 | Verify the possibility to rename a Freestyle project by overwriting its name
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on Project page.

**Steps:**
1. Click on the 'Rename' menu option.
2. Fill in the same item name into the input field (e.g. 'Item_1').
3. Ensure the display of the warning message with the text 'The new name is the same as the current name.'.
4. Click on the 'Rename' button.
5. Check the display of the error message, containing the text 'Error'.
6. Click on the Jenkins logo.
7. Verify the initial project name is displayed in the project table.