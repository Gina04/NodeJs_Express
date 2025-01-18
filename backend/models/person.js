const mongoose = require('mongoose');
require('dotenv').config();

/*const password = process.env.MONGODB_URI;*/
//process.argv[2];

/* DO NOT SAVE YOUR PASSWORD TO GITHUB!!*/
const url = process.env.MONGODB_URI
  //`mongodb+srv://fullstack:${password}@cluster0.eugas.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3, 
    required: true
  },
  number: Number,
})

const Person = mongoose.model('Person', personSchema);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema);