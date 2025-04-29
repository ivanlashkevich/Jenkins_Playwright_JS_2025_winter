# US_14.002 | Header > Search Box

## TC_14.002.01 | Verify the user can select a suggestion to auto-fill and complete the search
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Freestyle project').
4. Click on the 'OK' button.
5. Click on the 'Save' button.
6. Click on the Jenkins logo in the header.
7. Fill the search field with the first character of the item name (e.g. 'I').
8. Select the suggestion to auto-fill and complete the search.
9. Press the 'Enter' button.
10. Verify the corresponding page opened.




## TC_14.002.02 | Verify the display of the corresponding message if no matches found
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Enter a new item name into the search field (e.g. 'Item_1').
2. Press the 'Enter' button. 
3. Verify the display of the error message with the text 'Nothing seems to match.' on the search result page.




## TC_14.002.03 | Verify that in case of multiple matches the result page displays all matches
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link.
2. Enter an item name into the input field (e.g. 'Item_1).
3. Select an item type (e.g. 'Freestyle project').
4. Click on the 'OK' button.
5. Click on the 'Save' button.
6. Click on the Jenkins logo in the header.
7. Fill the search field with the first character of the item name (e.g. 'I').
8. Press the 'Enter' button.
9. Verify all the matches provided with the auto-fill suggestion are displayed on the result page.




## TC_14.002.04 | Verify the search results for Lower and Uppercase characters are the same when insensitive search option is activated
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'New Item' link.
2. Enter an item name into the input field (e.g. 'initiatives).
3. Select an item type (e.g. 'Freestyle project').
4. Click on the 'OK' button.
5. Click on the 'Save' button.
6. Click on the username dropdown chevron in the header.
7. Click on the 'Configure' dropdown option.
8. Verify the 'Insensitive search tool' is checked.
9. Type the first item name Uppercase character (e.g. 'I') in the search field.
10. Press the 'Enter' button.
11. Verify the search results contain the values corresponding to the item name first Uppercase character 
(e.g. 'initiatives', 'admin', 'config', 'configure', 'Built-In Node').
12. Clear the search box input.
13. Type the item name first Lowercase character (e.g. 'i') in the search field.
14. Press the 'Enter' button.
15. Verify the auto-completion suggested variants of the Upper and Lowercase characters are the same.
