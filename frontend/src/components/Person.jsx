
const Person = ({person, deleteTheBookPhone}) => {
    return (
      <>
        <p>
          {person.name} {person.number}
        </p>

        <button onClick={deleteTheBookPhone}>Delete</button>
      </>
    );
  };

export default Person;