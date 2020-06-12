const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


// Create Schema
const UserSchema = new Schema( {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [ true, 'Please add an email!' ],
    unique: true
  },
  role: {
    type: String,
    enum: [ 'user', 'publisher' ],
    default: 'user'
  },
  password: {
    type: String,
    required: [ true, 'Please add a password!' ],
    minlength: 4,
    // select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
} )

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  // return jwt.sign( 
  //   { id: this._id }, 
  //   process.env.JWT_SECRET, 
  //   { expiresIn: process.env.JWT_EXPIRE } 
  //   )

  return this._id
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function ( enteredPassword ) {
  // return true or false
  // return await bcrypt.compare( enteredPassword, this.password )
  return enteredPassword === this.password
}

module.exports = mongoose.model( 'User', UserSchema )