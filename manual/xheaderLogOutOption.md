# US_14.003 | Header > Log out option

## TC_14.003.01 | Verify the "log out" button is visible in the application’s header after the user logs in
**Preconditions:**
User is on the login page.

**Steps:**
1. Navigate to the Jenkins Login page.
2. Enter the username into the input field. 
3. Enter the password.
4. Check the 'Keep me signed in' checkbox.
5. Click on the 'Sign in' button.
6. Verify the 'log out' button is visible.




## TC_14.003.02 | Verify the "log out" button redirects to the login page and terminates session
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'log out' button.
2. Verify the user was redirected to the login page and the current session on the server was terminated.




## TC_14.003.03 | Verify all session-related cookies are cleared after the Log out button clicked
**Preconditions:**
1. User is logged in.
2. User is on the main page (dashboard).

**Steps:**
1. Click on the 'log out' button.
2. Verify all session-related cookies are cleared.