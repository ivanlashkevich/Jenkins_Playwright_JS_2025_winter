class LoginPage {

   constructor(page) {
      this.page = page;
      this.getUsername = page.getByRole('textbox', { name: 'Username' });
      this.getPassword = page.getByRole('textbox', { name: 'Password' });
      this.getKeepMeSignedInCheckbox = page.getByRole('checkbox', { name: 'Keep me signed in' });
      this.getSignInButton = page.getByRole('button', { name: 'Sign in' });
      this.getSignInToJenkinsHeadline = page.getByText('Sign in to Jenkins');

   }

   async goto(url) {
      await this.page.goto(url);
   }

   async fillUsername(name) {
      await this.getUsername.fill(name);
   }

   async fillPassword(password) {
      await this.getPassword.fill(password);
   }

   async checkKeepMeSignedInCheckbox() {
      await this.getKeepMeSignedInCheckbox.check({ force: true });
   }

   async clickSignInButton() {
      await this.getSignInButton.click();
   }

   async login(username, password) {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.checkKeepMeSignedInCheckbox();
      await this.clickSignInButton();
   }


}
export default LoginPage