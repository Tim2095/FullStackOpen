import React from "react";

const Persons = ({persons, filteredPersons, onDeletePerson}) => {

  const deletePerson = (id) => {
    onDeletePerson(id)
  }

  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.length !== 0 &&
        filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      {filteredPersons.length === 0 &&
        persons.map((person) => (
          <div key={person.name}>
            <li>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id.toString())}>delete</button>
            </li>
          </div>
        ))}
    </div>
  );
};

export default Persons;
