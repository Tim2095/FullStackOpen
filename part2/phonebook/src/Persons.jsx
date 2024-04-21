import PersonItem from "./PersonItem";

const Persons = ({ persons, onDelete }) => {
  const handleDelete = (id) => {
    onDelete(id)
  }

  return (
    <div>
      {persons.map((person) => (
        <PersonItem
          key={person.name}
          name={person.name}
          number={person.number}
          onClick={() => handleDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
