const AddPersonForm = ({handleAddName, onChangeName, onChangeNumber}) => {
  return (
    <form onSubmit={handleAddName}>
      <div>
        name: <input onChange={onChangeName} />
      </div>
      <div>
        number: <input onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
