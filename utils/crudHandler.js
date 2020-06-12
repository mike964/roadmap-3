const queryFunction = require( './queryFunction' )
// const catchAsync = require( './catchAsync' )
// const AppError = require( './appError' )
const APIFeatures = require( './apiFeatures' )
const ErrorResponse = require( './errorResponse' )

// We run this to prevent writing trycatch in every asyn function
const catchAsync = fn => {
  return ( req, res, next ) => {
    fn( req, res, next ).catch( next )
  }
}

// lsn 11.15
exports.deleteOne = Model => catchAsync( async ( req, res, next ) => {

  const doc = await Model.findById( req.params.id )

  if ( !doc ) {
    return next( new ErrorResponse( `No doc with the id of ${ req.params.id }` ), 404 )
  }

  const documentId = req.params.id

  doc.remove()

  res.status( 200 ).json( {
    success: true,
    data: {},
    msg: `Doc ${ documentId } deleted!`
  } )
} )

exports.updateOne = Model =>
  catchAsync( async ( req, res, next ) => {
    const doc = await Model.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
      runValidators: true
    } )

    if ( !doc ) {
      return next( new ErrorResponse( `No doc found with id of ${ req.params.id }`, 404 ) )
    }

    res.status( 200 ).json( {
      success: true,
      msg: `${ req.params.id } updated!`,
      data: doc
    } )
  } )

exports.createOne = Model =>
  catchAsync( async ( req, res, next ) => {
    const doc = await Model.create( req.body )

    res.status( 201 ).json( {
      status: 'success',
      data: doc
    } )
  } )

// lsn 11.17
exports.getOne = ( Model, populateOptions ) =>
  catchAsync( async ( req, res, next ) => {

    let query = Model.findById( req.params.id )

    if ( populateOptions ) {
      if ( typeof populateOptions === 'object' ) {
        query = query.populate( ...populateOptions )
      } else {
        query = query.populate( populateOptions )
      }
    }

    const doc = await query

    if ( !doc ) {
      return next( new ErrorResponse( 'No document found with that ID', 404 ) )
    }

    res.status( 200 ).json( {
      status: 'success',
      nResults: 1,
      data: doc
    } )
  } )

exports.getAll = ( Model, populateOptions ) =>
  catchAsync( async ( req, res, next ) => {

    console.log( req.query )

    // lsn 11.21
    // const docs = await features.qr
    // const doc = await features.qr.explain()   // this is for motherfukers 😎

    // Execute query - find bootcamps in db
    const x = await queryFunction( req.query, Model, populateOptions )
    const { docs, pagination } = x



    // SEND RESPONSE 

    res.status( 200 ).json( {
      success: true,
      nResults: docs.length,
      data: docs,
      pagination
    } )


  } )




