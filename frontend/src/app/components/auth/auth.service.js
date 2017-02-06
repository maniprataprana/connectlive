
export class AuthService {
  constructor($http, $window, $location, API_URL, toaster) {
    'ngInject';

    this.$http = $http;
    this.$window = $window;
    this.$location = $location;
    this.API_URL = API_URL;
    this.toaster = toaster;

    this.user = null;


  }

  notifyServerError() {
    const message = 'OOPS! Try after some time!'
    this.toaster.pop('error', 'Server Error', message);
  }

  logError(errorResponse) {
    console.log('error: ', errorResponse);
  }

  storeUser(user) {
    this.user = user;
  }
  
  getUser() {
    return this.user;
  }

  removeUser() {
    this.user = null;
  }

  updateUser() {
    return this.$http.get('/currentuser')
    .then(({data})=> this.storeUser(data.user))   
    .catch((error) => this.logError(error));
  }


  // credentials: { email: 123@123.com, password: xxxx } 
  login(credentials, next='/') {
    return this.$http.post(`/users/auth/login?next=${next}`, credentials)
      .then(({data}) => { 
        // go back to the page that required login
        this.$window.location.href = data.redirectUrl; 
      })
      .catch((error) => {
        if(error.status === 400) { // toast it
          this.toaster.pop('error', 'Login Error', error.data.message);
        } else {
          this.logError(error);
          this.notifyServerError();
        }
      })
  }

  
  register(credentials, next = '/') {
    return this.$http.post(`/users/?next=${next}`, credentials)
      .then(({data}) => { 
        console.log('data(new user): ', data);
        // go back to the page that required login
        this.$window.location.href = data.redirectUrl; 
      })
      .catch((error) => {
        this.logError(error);
        if(error.status === 400) {
          this.toaster.pop('error', 'Signup Error', error.data.message);
        } else {
          this.notifyServerError();
        }
      });
  }

  logout() {
    return this.$http
      .get('/users/auth/logout')
      .then(()=> this.removeUser())
      .then(()=> { 
        this.$window.location.href = '/'; 
      })
      .catch((error)=> this.logError(error));
  }

  isAuthenticated() {
    return !!this.user;
  }
    
	getSocialAuthURL(type) {
		const urlPrefix = `${this.API_URL}/users/auth`; 
    const social = {
      facebook: `${urlPrefix}/facebook`, 
      google: `${urlPrefix}/google`, 
      linkedin: `${urlPrefix}/linkedin`, 
    };
    // create the social url along with where to redirect after authentication
    // let url = this.$location.url();
    let protocol = this.$location.protocol();
    let host = this.$location.host();
    let port = this.$location.port();
    let base = `${protocol}://${host}:${port}`;
		// console.log('myBase: ', base);
    const url = '/'
		const socialUrl = `${social[type]}?next=${base}${url}`;	

    return socialUrl;		
	}


}