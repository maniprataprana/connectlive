module.exports = {
  db: 'mongodb://localhost/connect-live_test',

  facebook: {
    clientID: process.env.DEV_FACEBOOK_CLIENTID,    
    clientSecret: process.env.DEV_FACEBOOK_SECRET,
    callbackURL: 'https://live-expert-anandkr.c9users.io/users/auth/facebook/callback'
  },

  google: {
    clientID: process.env.DEV_GOOGLE_CLIENTID,    
    clientSecret: process.env.DEV_GOOGLE_SECRET,
    callbackURL: 'https://live-expert-anandkr.c9users.io/users/auth/google/callback'
  },

  linkedin: {
    clientID: process.env.DEV_LINKEDIN_CLIENTID,    
    clientSecret: process.env.DEV_LINKEDIN_SECRET,
    callbackURL: 'https://live-expert-anandkr.c9users.io/users/auth/linkedin/callback'
  }

}