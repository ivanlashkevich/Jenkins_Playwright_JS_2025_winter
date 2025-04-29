# US_16.002 | Dashboard > Create View

## TC_16.002.01 | Verify the view can be created through entering a name, selecting a type and saving
**Preconditions:**
1. User is logged in.
2. An Freestyle project and a Folder were created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the '+ New View' button.
2. Enter a view name into the input field.
3. Select the 'List View' type.
4. Click on the 'Create' button.
5. Click the 'OK' button.
6. Click on the 'Dashboard' breadcrumb link.
7. Verify the view was created.




## TC_16.002.02 | Verify the possibility to add and delete columns while configuring the view
**Preconditions:**
1. User is logged in.
2. An Freestyle project and a Folder were created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the '+ New View' button.
2. Enter a view name into the input field.
3. Select the 'List View' type.
4. Click on the 'Create' button.
5. Check the Job checkboxes.
6. Delete the 'Status' column, clicking on the the 'x-button'.
7. Click 'Add column' button.
8. Select the 'Project description' column dropdown option.
9. Verify the deletion of the 'Status' column and the display of the 'Description' one.




## TC_16.002.03 | Verify that only selected jobs are displayed in the view after it is saved
**Preconditions:**
1. User is logged in.
2. An Freestyle project and a Folder were created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the '+ New View' button.
2. Enter a view name into the input field.
3. Select the 'List View' type.
4. Click on the 'Create' button.
5. Check the first item checkbox in the 'Jobs' section.
6. Click on the 'OK' button.
7. Verify that only selected item is displayed in the view.




## TC_16.002.04 | Verify that only selected columns are displayed in the saved view
**Preconditions:**
1. User is logged in.
2. An Freestyle project and a Folder were created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the '+ New View' button.
2. Enter a view name into the input field.
3. Select the 'List View' type.
4. Click on the 'Create' button.
5. Check the Job checkboxes.
6. Delete all the columns in the 'Columns' section, by clicking the 'x-button' on each.
7. Click 'Add column' button.
8. Select the 'Name' column dropdown option.
9. Click on the 'OK' button.
10. Verify that only selected 'Name' column is displayed in the view job table.