const PersonForm = ({
    newName,
    newPhone,
    onNameChange,
    onPhoneChange,
    onAddPhoneBook,
  }) => {
    return (
      <form onSubmit={onAddPhoneBook}>
        <div>
          name : <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={onPhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  