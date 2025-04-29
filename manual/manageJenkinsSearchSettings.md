# US_09.001 | Manage Jenkins > Search settings

## TC_09.001.01 | Verify the search suggestion dropdown displays all matches
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the 'Manage Jenkins' link in the side menu.
2. Clear the search field.
3. Enter the first character of the item name into the search field.
4. Verify all matches are displayed in the suggestion dropdown.




## TC_09.001.02 | Verify the possibility to select the desired item from the search suggestion dropdown
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the 'Manage Jenkins' link in the side menu.
2. Clear the search field.
3. Enter the first character of the item name into the search field.
4. Select random suggested dropdown option.
5. Verify the user was redirected to the corresponding page.




## TC_09.001.03 | Verify the display of the corresponding message in the search suggestion dropdown if no matches found
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the 'Manage Jenkins' link in the side menu.
2. Clear the search field.
3. Enter a new item name into the search field.
4. Verify the display of the 'No results' message in the search suggestion dropdown.




## TC_09.001.04 | Verify the search field is cleared by pressing the "x" button
**Preconditions:**
1. User is logged in.
2. A Freestyle project was created.
3. User is on the main page (dashboard).

**Steps:**
1. Click on the 'Manage Jenkins' link in the side menu.
2. Clear the search field.
3. Enter the first character of the item name into the search field.
4. Verify the search field isn't empty.
5. Click on the 'x' button.
6. Verify the search field is cleared.