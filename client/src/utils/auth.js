import decode from "jwt-decode";

class AuthService {
  //retrieve saved data in token
  getProfile() {
    return decode(this.getToken());
  }

  //check if user still logged in
  loggedIn() {
    //checks if there is a saved token and it's still valid
    const token = this.getToken();
    //use type coersion to check if token is NOT undefined and the token is not expired
    return !!token && !this.isTokenExpired(token);
  }

  //check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  //retrieve token from localStorage
  getToken() {
    //Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  //Set token to localStorage and reload page to homepage
  login(idToken) {
    //saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  //Clear token from localStorage and force logout with reload
  logout() {
    //clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    //this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
