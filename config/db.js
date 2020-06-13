const mongoose = require( 'mongoose' )
require( 'dotenv' ).config()

// const mongoURI = process.env.MONGO_URI
const mongoURI = "mongodb+srv://mike:mike1234@cluster0-gpzsv.mongodb.net/roadmap-db?retryWrites=true&w=majority"
// const mongoURI = "mongodb://localhost/moslm-roadmap"


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