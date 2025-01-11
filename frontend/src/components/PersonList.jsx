import Person from './Person'
const PersonList = ({persons,handleDelete })=>{
    console.log()
    return(
        <>
          <ul>
            {persons.map(person =>
              <Person 
                key={person.name} 
                person={person}
                deleteTheBookPhone={() =>handleDelete(person.id)}/>
            )

            }

          </ul>
  
     </>
    )
} 

export default PersonList;