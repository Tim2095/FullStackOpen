const NewPerson = ({addPersonHandler, newName, onAddName, newNumber, onAddNumber}) => {
  return (
    <form onSubmit={addPersonHandler}>
      <div>
        name: <input value={newName} onChange={onAddName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onAddNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewPerson;
