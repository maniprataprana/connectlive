
var crypto = require('crypto');
var mongoose = require('mongoose');


var emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
var usernameRegex = /^[a-z0-9-._]+$/;

var photoTypes = 'uploaded facebook google linkedin'.split(' ');
var roleTypes = ['admin', 'expert'];

var userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: 'Name is required', 
    trim: true 
  },
  username: {
    type: String, 
    trim: true, 
    lowercase: true,
    match: [usernameRegex, 'Enter  a valid username']
  },
	email: { 
		type: String, 
    trim: true, 
		match: [emailRegex, 'Enter a valid Email']
	},
	isEmailVerified: { 
    type: Boolean, 
    default: false 
  },  

  passwordSalt: String,
  passwordHash: String,
  
  roles: [{
    type: String, 
    enum: roleTypes
  }], // ['admin', 'expert', '..']
  
  uploadedPhoto: String,
  
  displayPhoto: {
    type: { 
      type: String, 
      enum: photoTypes 
    },
    photo: String
  },
  
  isActive: { 
    type: Boolean, 
    default: true 
  },
  
  facebook: {},
  google: {},
  linkedin: {},
  
}, {
  // overriding default timestamp fields
  timestamps: {
    createdAt: 'joinDate' 
  }

});

userSchema
  .virtual('password')
  .set(function(pass) { 
    this.passwordSalt = this.makeSalt();
    this.passwordHash = this.encryptPassword(pass);
  });


userSchema.pre('save', function(next) {
  if(this.passowrdSalt && !this.passwordHash) {
    return next(new Error('Invalid Password'));
  }
  next(null);
});


function emailValidator(email, fn) {
  
  var User = mongoose.model('User');

  if(this.isNew || this.isModified('email')) {
    
    User
      .find({email: email})
      .exec(function(err, users) {
        if(err) {
          console.log('error while validating email: ', err);
          return fn(false, 'Error validating email');
        }
       
        // if (!users.length) {
        //   return fn(false);
        // } else {
        //   return fn(true);
        // }

        return fn(users.length === 0);
        
      });    
    
  } else {
    return fn(true);
  } 

}

userSchema.path('email').validate(emailValidator, 'This email already exists');



userSchema.methods.makeSalt = function () {
  return Math.round(new Date().valueOf() * Math.random()) + '';
  
};

userSchema.methods.encryptPassword = function(password) {
  if(!password || !password.trim().length)
    return '';

  try {
    return crypto.createHmac('sha1', this.passwordSalt).update(password).digest('hex');
  } catch(err) {
    console.log('Error encrypting password: ', err);
    return '';
  }
  
};

userSchema.methods.authenticate = function(password) {
  return this.encryptPassword(password) === this.passwordHash;
}

userSchema.methods.hasRole = function(role) {
    return this.roles.indexOf(role) !== -1;
};

userSchema.methods.isAdmin = function() {
  return this.hasRole('admin');
}

mongoose.model('User', userSchema);

// var User = mongoose.model('User');
