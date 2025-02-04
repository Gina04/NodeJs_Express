const mongoose = require('mongoose')
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()

// Configuración de conexión a MongoDB
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Middlewares
morgan.token('body', (req) => {
  // Verificar si la solicitud tiene un cuerpo y es JSON
  return req.method === 'POST' ? JSON.stringify(req.body) : ''

})

app.use(cors())// Habilitar CORS para todas las solicitudes
// Configurar Morgan con el formato 'tiny' y el token 'body'
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)


// Middleware para procesar JSON
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    'default-src \'self\'; font-src \'self\' https://fonts.googleapis.com; style-src \'self\' https://fonts.googleapis.com \'unsafe-inline\';'
  )
  next()
})

// Definición de rutas

/*let persons =[
        {
          id: 1,
          name: "Arto Hellas",
          number: "040-123456"
        },
        {
          id: 2,
          name: "Ada Lovelace",
          number: "39-44-5323523"
        },
        {
          id: 3,
          name: "Dan Abramov",
          number: "12-43-234345"
        },
        {
          id: 4,
          name: "Mary Poppendieck",
          number: "39-23-6423122"
        }
]
*/


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })

})


/*app.get('/info', (request, response) => {
  const currentTime = new Date()
  const numberOfEntries = persons.length
  response.send(`
        <p>Phonebook has info for ${numberOfEntries} people</p>
        <p>${currentTime}</p>`)

})*/

app.get('/api/persons/:id',(request,response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    }else{
      response.status(400).end()
    }
  })
    .catch(error => next(error))
})

/*app.get('/api/persons/:id',(request, response)=>{
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person =>person.id === id)
   console.log(person)

  if(person){
    response.json(person);
  }else{
    response.status(404).end()
  }
})*/

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
  /*const id= Number(request.params.id);
  persons= persons.filter(person => person.id !== id)
  response.status(204).end()*/
})

/*const generateId = () => {
  const maxId = persons.length > 0
    ? Math.random(...persons.map(p => p.id))
    : 0
  return maxId + 1
}*/

/*app.post('/api/persons', (request, response) =>{

  const body = request.body;
  if(!body.name || !body.number || persons.find(person => person.name === body.name)){

    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person)
  response.json(person)

})*/

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name,
    number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => {
    //response.status(500).json({ error: 'saving person failed' });
    if(error.name === 'ValidationError'){
      response.status(400).json({ error: error.message })
    }else{
      next(error)
    }

  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  // Buscar a la persona por su ID y actualizar el número
  Person.findByIdAndUpdate(request.params.id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        // Si se encontró la persona y se actualizó correctamente
        response.json(updatedPerson)
      } else {
        // Si no se encuentra la persona con ese ID
        response.status(404).json({ error: 'Persona no encontrada' })
      }
    })
    .catch(error => next(error))
})



// Middleware para manejo de errores
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error:error.message })
  }

  next(error)
}


// Este debe ser el último middleware cargado
app.use(errorHandler)

// Middleware para manejar rutas no encontradas

const PORT =process.env.PORT || 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

