
module.exports = {
  db: 'mongodb://localhost/connect-live_dev',
  
  facebook: {
    clientID: process.env.DEV_FACEBOOK_CLIENTID,    
    clientSecret: process.env.DEV_FACEBOOK_SECRET,
    callbackURL: 'http://localhost:3000/api/users/auth/facebook/callback'
  },

  google: {
    clientID: process.env.DEV_GOOGLE_CLIENTID,    
    clientSecret: process.env.DEV_GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/api/users/auth/google/callback'
  },

  linkedin: {
    clientID: process.env.DEV_LINKEDIN_CLIENTID,    
    clientSecret: process.env.DEV_LINKEDIN_SECRET,
    callbackURL: 'http://localhost:3000/api/users/auth/linkedin/callback'
  },

    
    
};