const mongoose = require('mongoose')
require('dotenv').config()

/*const password = process.env.MONGODB_URI;*/
//process.argv[2]

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
  number:{
    type: String,
    validate: {
      validator: function(v) {
        // Expresión regular para validar los formatos de número de teléfono válidos
        return /^(\d{2,3})-(\d{6,})$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)