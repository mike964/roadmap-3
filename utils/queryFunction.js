
const queryFunction = async ( reqQuery, model, populateOptions ) => {

  // console.log( reqQuery ) 

  const reqQueryy = { ...reqQuery }

  // Fields to exclude - delete them from reqQuery
  const removeFields = [ 'select', 'sort', 'page', 'limit' ]
  removeFields.forEach( param => delete reqQueryy[ param ] )

  // Create query string
  let qrString = JSON.stringify( reqQueryy )

  // Add $ to the query to create mongoose operator like "$lte"
  qrString = qrString.replace( /\b(gt|gte|lt|lte|in)\b/g, match => `$${ match }` )

  // Findig Resource
  let qr = model.find( JSON.parse( qrString ) )
  // console.log( qr )        

  // console.log( populateOptions )
  // Check if user populateOptions has Field Selection or not
  if ( populateOptions ) {
    if ( typeof populateOptions === 'object' ) {
      qr = qr.populate( ...populateOptions )
    } else {
      qr = qr.populate( populateOptions )
    }
  }

  // console.log( req.query )   // { averageCost: { lte: '10000' } }
  // console.log( reqQuery )   // { averageCost: { lte: '10000' } }
  // console.log( qrString )   // {"averageCost":{"$lte":"10000"}}

  // Select fields - lsn 6.4
  if ( reqQuery.select ) {
    // console.log( req.query.select )   // befor building this function
    // console.log( reqQuery.select )       // after building this function :)
    const fields = reqQuery.select.split( ',' ).join( ' ' )
    qr = qr.select( fields )
  }

  // Sort - lsn 6.4
  if ( reqQuery.sort ) {
    const sortBy = reqQuery.sort.split( ',' ).join( ' ' )
    qr = qr.sort( sortBy )
  } else {
    qr = qr.sort( '-createdAt' )   // sort descendig by 'createdAt' filed
  }



  // Pagination - lsn 6.5
  const page = parseInt( reqQuery.page, 10 ) || 1
  const limit = parseInt( reqQuery.limit, 10 ) || 25
  const startIndex = ( page - 1 ) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  qr = qr.skip( startIndex ).limit( limit )
  // Executing query
  const docs = await qr   // doesn't work wihtout wait

  // console.log( '**===========================================' )
  // console.log( qr )

  // Pagination result
  const pagination = {}

  if ( endIndex < total ) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if ( startIndex > 0 ) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  // Output
  // return qr
  return { docs, pagination }
}

module.exports = queryFunction