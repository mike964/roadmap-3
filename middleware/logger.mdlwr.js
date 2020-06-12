var colors = require( 'colors' );

// Logger Middlwr Example
const logger = ( req, res, next ) => {
  req.hello = 'Hello World'
  // console.log( 'Middleware ran' )   // This will show in the Terminal   // FOR TEST
  console.log(
    // `${ req.method } ${ req.protocol } :// ${ req.get( 'host' ) } ${ req.originalUrl }`
    `${ req.method } request made to => ${ req.get( 'host' ) } ${ req.originalUrl }`.magenta
  )
  next()
}


module.exports = logger