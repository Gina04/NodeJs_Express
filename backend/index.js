const http = require('http');
const repl = require('node:repl');
var morgan = require('morgan');
const cors = require('cors');

const express = require('express');
const app = express();


// Crear un token personalizado para registrar el cuerpo de las solicitudes POST
morgan.token('body', (req, res) => {
  // Verificar si la solicitud tiene un cuerpo y es JSON
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
  
});

app.use(cors());// Habilitar CORS para todas las solicitudes
// Configurar Morgan con el formato 'tiny' y el token 'body'
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)


// Middleware para procesar JSON
app.use(express.json());

app.use(morgan('tiny'));

let persons =[
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

app.get('/api/persons', (request, response)=>{
    response.json(persons);

})


app.get('/info', (request, response) =>{
    const currentTime = new Date();
    const numberOfEntries = persons.length;
    response.send(`
        <p>Phonebook has info for ${numberOfEntries} people</p>
        <p>${currentTime}</p>`)

});

app.get('/api/persons/:id',(request, response)=>{
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person =>person.id === id) 
   console.log(person)

  if(person){
    response.json(person);
  }else{
    response.status(404).end()
  }  
})

app.delete('/api/persons/:id', (request, response)=>{
  const id= Number(request.params.id);
  persons= persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () =>{
  const maxId = persons.length > 0
  ? Math.random(...persons.map(p=> p.id))
  : 0
  return maxId + 1;
}

app.post('/api/persons', (request, response) =>{
  console.log('Body received in POST:', request.body); // Depuración
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

})


  const PORT = 3002
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)