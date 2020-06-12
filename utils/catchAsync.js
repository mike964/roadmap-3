// lsn 9.7

// We run this to prevent writing trycatch in every asyn function
const catchAsync = fn => {
  return ( req, res, next ) => {
    fn( req, res, next ).catch( next )
  }
}

module.exports = catchAsync