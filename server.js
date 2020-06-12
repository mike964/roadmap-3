require( 'dotenv' ).config( { path: './config/config.env' } )
const express = require( 'express' )
const cookieParser = require( 'cookie-parser' )
const connectDB = require( './config/db' )
const logger = require( './middleware/logger.mdlwr' )
const errorHandler = require( './middleware/error.mdlwr' )

//=====================================================================
const app = express()
const port = process.env.PORT || 3500
connectDB()

// *** Using Middlewares *** 
// Request Body Parser
app.use( express.json() )
// Cookie parser
app.use( cookieParser() )
app.use( logger )
app.use( errorHandler )



// app.use( '/', ( req, res ) =>
app.all( '/', ( req, res ) =>
  res.send( `Hi Bitch! You made ${ req.method } request to '${ req.originalUrl }' ` )
)

// *** Mounting Routers ***
app.use( '/api/v1/auth', require( './routes/auth.route' ) )
// app.use( '/api/v1/my-projects', require( './routes/my-projects.route' ) )
app.use( '/api/v1/projects', require( './routes/projects.route' ) )
// app.use( '/api/v1/steps', require( './routes/steps.route' ) )
// app.use( '/api/v1/users', require( './routes/users.route.js' ) )
app.use( '/api/v1/admin', require( './routes/admin.route.js' ) )


app.listen( port, () => console.log( `App running on port ${ port }` ) )