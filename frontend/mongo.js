import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.env.MONGODB_PASSWORD;
if (!password) {
  console.error('Password not found in environment variables');
  process.exit(1);
}


const url = `mongodb+srv://fullstack:${password}@cluster0.eugas.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3, 
    required: true
  },
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // Listar todas las entradas
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Agregar una nueva entrada
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}


//https://cloud.mongodb.com/v2/6785a4a07092067c82a0c3b5#/metrics/replicaSet/6785a617b7150128e59523eb/explorer/sample_mflix/sessions/find