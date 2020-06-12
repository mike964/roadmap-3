const asyncHandler = require( './async.mdlwr' )
const ErrorResponse = require( '../utils/errorResponse' )
const User = require( '../models/User' )
const Project = require( '../models/Project' )
const Step = require( '../models/Step' )

// ================================================================================================

exports.setUser = asyncHandler( async ( req, res, next ) => {

  // for (GET requset)
  if ( req.user ) {   // req.user comes from protect mdlwr
    if ( req.method === 'GET' ) {
      req.query = { ...req.query, user: req.user }
      return next()


    } else {
      // for (POST, Update, Delete, ...)
      req.body.user = req.user.id
      return next()
    }

  }

} )

exports.setProject = asyncHandler( async ( req, res, next ) => {

  let project

  if ( req.params.projectId ) {
    req.params.id = req.params.projectId
  }

  project = await Project.findById( req.params.id )

  console.log( project )


  if ( req.method === 'GET' ) {
    req.query = { ...req.query, project: req.params.projectId }

    console.log( req.params.projectId )
    return next()


  } else {
    // for (POST, Update, Delete, ...)
    req.body.project = req.params.id
    return next()
  }

} )

exports.checkProjectUser = asyncHandler( async ( req, res, next ) => {
  // Check if project belongs to current logged in user
  // Prevent a user to get access to another user project, except 'admin'
  if ( req.user.role === 'admin' ) {
    return next()

  } else {

    let project

    if ( req.params.projectId ) {
      req.params.id = req.params.projectId
    }

    project = await Project.findById( req.params.id )

    if ( !project ) {
      return next( new ErrorResponse( `No doc found with id of ${ req.params.id }`, 404 ) )
    }

    if ( project.user.toString() === req.user._id.toString() ) {
      // console.log( req.params )
      return next()

    } else {
      // console.log( project.user )
      // console.log( req.user )
      return next(
        new ErrorResponse( `User ${ req.user._id } is not authorized to access this route`, 403 )
      )
    }
  }
} )

exports.checkStepUser = asyncHandler( async ( req, res, next ) => {
  // Check if a step belongs to a project  


  let step

  if ( req.params.stepId ) {
    req.params.id = req.params.stepId
  }

  step = await Step.findById( req.params.id ).populate( 'project' )

  console.log( step )

  if ( !step ) {
    return next( new ErrorResponse( `No doc found with id of ${ req.params.id }`, 404 ) )
  }

  if ( step.project.user.toString() === req.user._id.toString() || req.user.role === 'admin' ) {
    // console.log( req.params )
    return next()

  } else {
    // console.log( project.user )
    // console.log( req.user )
    return next(
      new ErrorResponse( `User ${ req.user._id } is not authorized to access this route`, 403 )
    )
  }
} )