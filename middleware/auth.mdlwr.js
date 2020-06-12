// const jwt = require( 'jsonwebtoken' );
const asyncHandler = require( './async.mdlwr' );
const ErrorResponse = require( '../utils/errorResponse' );
const User = require( '../models/User' );

// Protect routes
exports.protect = asyncHandler( async ( req, res, next ) => {
  let token

  // console.log( req.cookies )

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith( 'Bearer' )
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split( ' ' )[ 1 ];
    // Set token from cookie
  } else if ( req.cookies.token ) {
    // Always can load token with every request from cookie - req.cookies is set when user login
    token = req.cookies.token
  } else {
    return next( new ErrorResponse( 'No Token!', 401 ) )
  }

  // Make sure token exists
  if ( !token ) {
    return next( new ErrorResponse( 'No Token!', 401 ) )
  }

  // console.log( token )   // output: Bearer 5ee0e50fa350c44dd0daa385

  try {
    // Verify token if exist  {userid , issuedat, expiration}
    // const decoded = jwt.verify( token, process.env.JWT_SECRET )

    // console.log( decoded )   // output: { id: '5edbf8e44ae9a940185278d9', iat: 1591521162, exp: 1594113162 }


    // req.user = await User.findById( decoded.id )
    req.user = await User.findById( token )

    next()
  } catch ( err ) {
    return next( new ErrorResponse( 'Not authorized to access this route', 401 ) );
  }
} )

// Grant access to specific user roles - this is same as restrictedTo in Jonas project 
exports.restrictedTo = ( ...roles ) => {  // (publisher, admin, ..) will get passed in
  return ( req, res, next ) => {
    if ( !roles.includes( req.user.role ) ) {
      return next(
        new ErrorResponse( `User ${ req.user.id } is not authorized to access this route`, 403 )
      )
    }

    next()
  }
}
