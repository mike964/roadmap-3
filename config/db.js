const mongoose = require( 'mongoose' )
require( 'dotenv' ).config()

// const mongoURI = process.env.MONGO_URI
const mongoURI = "mongodb+srv://mike:mike1234@cluster0-gpzsv.mongodb.net/roadmap-db?retryWrites=true&w=majority"
// const mongoURI = "mongodb://localhost/moslm-roadmap"


const connectDB = () => {
  mongoose.connect( uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  } )
    .then( () => console.log( 'Database Connected' ) )
    .catch( err => console.log( err ) )
}



module.exports = connectDB