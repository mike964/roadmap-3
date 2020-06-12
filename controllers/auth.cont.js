const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../middleware/async.mdlwr' )
// const sendEmail = require( '../utils/sendEmail' )
const User = require( '../models/User' )
//==============================================================
// @desc      Register user
// @access    Public     
// @route     POST /api/v1/auth/register
exports.register = asyncHandler( async ( req, res, next ) => {
  const { name, email, password, role } = req.body    // pull out data from req.body

  // Create user
  const user = await User.create( {
    name,
    email,
    password,
    role
  } )

  // Create token 
  const token = user.getSignedJwtToken()

  res.status( 200 ).json( { success: true, user, token } )

  // sendTokenResponse( user, 200, res )
} )

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler( async ( req, res, next ) => {
  const { email, password } = req.body

  // Check if email & password exist 
  if ( !email || !password ) {
    return next( new ErrorResponse( 'Please provide an email and password', 400 ) )
  }

  // Check for user - select the password as well in order to validate it for login
  const user = await User.findOne( { email } ).select( '+password' )

  if ( !user ) {
    return next( new ErrorResponse( "User not found.", 401 ) )
  }

  // Check if password matches
  const isMatch = await user.matchPassword( password )

  if ( !isMatch ) {
    return next( new ErrorResponse( 'Wrong password.', 401 ) )
  }

  sendTokenResponse( user, 200, res )
} )

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler( async ( req, res, next ) => {
  res.cookie( 'token', 'none', { // set token to none
    // expires in 10 scnds
    expires: new Date( Date.now() + 10 * 1000 ),
    httpOnly: true
  } )

  res.status( 200 ).json( {
    success: true,
    data: {}
  } )
} )

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler( async ( req, res, next ) => {
  const user = await User.findById( req.user.id )

  res.status( 200 ).json( {
    success: true,
    data: user
  } )
} )
// Get token from th model, create cookie and send response
const sendTokenResponse = ( user, statusCode, res ) => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    // set cookie expiration - same as token expiration 
    expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
    httpOnly: true
  }

  if ( process.env.NODE_ENV === 'production' ) {
    options.secure = true
  }

  res
    .status( statusCode )
    .cookie( 'token', token, options )   // (cookie name - value - options)
    .json( {
      success: true,
      token
    } )
}


