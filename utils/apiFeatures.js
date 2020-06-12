class APIFeatures {
  constructor( qr, reqQuery ) {
    this.qr = qr
    this.reqQuery = reqQuery
  }

  // 1A) FILTERING
  filter () {
    const queryObj = { ...this.reqQuery }
    const excludedFields = [ 'page', 'sort', 'limit', 'fields' ]
    excludedFields.forEach( el => delete queryObj[ el ] )
    // console.log( queryObj )

    // 1B) ADVANCED FILTERING
    /// replace 'gte' with '$gte' using reqular expression
    let qstr = JSON.stringify( queryObj )
    qstr = qstr.replace( /\b(gte|gt|lte|lt)\b/g, match => `$${ match }` )

    // let qr = Tour.find( JSON.parse( reqQuery ) )
    this.qr.find( JSON.parse( qstr ) )

    return this
  }

  // 2) SORTING
  sort () {
    if ( this.reqQuery.sort ) {
      const sortBy = this.reqQuery.sort.split( ',' ).join( ' ' )
      // console.log( sortBy )
      // qr = qr.sort( req.query.sort )
      this.qr = this.qr.sort( sortBy )
    } else {
      // set default sort: newst tours apear first
      this.qr = this.qr.sort( '-createdAt' )
    }

    return this
  }

  // 3) FIELD LIMITING - lesson 17
  limitFields () {
    if ( this.reqQuery.fields ) {
      const fields = this.reqQuery.fields.split( ',' ).join( ' ' )
      this.qr = this.qr.select( fields )
    } else {
      // default case: if user doesn't specify fields
      this.qr = this.qr.select( '-__v' )   // exclude '__v' 
    }
    return this
  }

  // 4) PAGINATION - lesson 18
  paginate () {
    // if ( req.query.limit || req.query.page ) {
    const page = this.reqQuery.page * 1 || 1
    const limit = this.reqQuery.limit * 1 || 100
    const skip = ( page - 1 ) * limit

    this.qr = this.qr.skip( skip ).limit( limit )
    // handle if page doesn't exist
    // const toursNum = await Tour.countDocuments()
    // if ( skip >= toursNum ) throw new Error( 'Page does not exist!' )
    // }
    return this
  }
}


module.exports = APIFeatures