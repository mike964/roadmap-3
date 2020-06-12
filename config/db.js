const mongoose = require( 'mongoose' )
require( 'dotenv' ).config()

let mongoURI

if ( process.env.LOCAL_DB === true ) {
  mongoURI = process.env.LOCAL_MONGO_URI
} else {
  mongoURI = process.env.ATLAS_MONGO_URI
}
// mongodb+srv://moslmiraqi:<password>@cluster0-lxfar.mongodb.net/<dbname>?retryWrites=true&w=majority


const connectDB = async () => {
  try {
    const conn = await mongoose.connect( mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    } )
    console.log( 'MongoDB Connected ...' )

  } catch ( err ) {
    console.error( err.message )
    process.exit( 1 )
  }
}

module.exports = connectDB