# US_13.001 | User > Create new User

## TC_13.001.01 | Verify the created user successfully logs in to Jenkins
**Preconditions:**
1. User was created by the Admin.
2. Direct access to Admin features for the User was restricted by the Admin.
3. User is on the Login page.

**'Creating a new User' steps:**
1. Click on the 'Manage Jenkins' link in the side menu.
2. Click on the 'Users' section link.
3. Click on the 'Create User' linkin the top right.
4. Enter username into the input field.
5. Enter password.
6. Confirm password.
7. Enter the full name into the input field.
8. Enter the E-mail address into the inout field.
9. Click on the 'Create User' button.

**Steps:**
1. Enter the username into the input field. 
2. Enter the password.
3. Check the 'Keep me signed in' checkbox.
4. Click on the 'Sign in' button.
5. Verify the user is logged in.



## TC_13.001.02 | Verify the user does not have direct Jenkins access to Admin features
**Preconditions:**
1. User was created by the Admin.
2. Direct access to Admin features for the User was restricted by the Admin.
3. User is on the Login page.

**Steps:**
1. Enter the username into the input field. 
2. Enter the password.
3. Check the 'Keep me signed in' checkbox.
4. Click on the 'Sign in' button.
5. Verify the 'Manage Jenkins' link is not displayed.
6. Verify direct admin URL access is blocked.


## TC_13.001.03 | Verify the possibility for Admin to delete the user
**Preconditions:**
1. User is logged in as Admin.
2. A new user was created by Admin.
3. Admin is on the "Manage Jenkins > Users" page.

**Steps:**
1. Click on the 'Delete' link.
2. Click on the 'Yes' button, confirming the deletion.
3. Verify the User was deleted.