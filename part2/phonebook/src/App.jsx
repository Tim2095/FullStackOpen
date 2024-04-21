import { useState } from "react";
import SearchPeople from "./SearchPeople";
import AddPersonForm from "./AddPersonForm";
import Persons from "./Persons";
import { useEffect } from "react";

import peopleService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState("");

  const messageAction = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleFiterInput = (e) => {
    const inputValue = e.target.value.toLowerCase();

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(inputValue)
    );

    setFilteredPersons(filtered);
  };

  const handleAddName = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const alredyExist = persons.find(
      (person) => person.name === newPerson.name
    );

    const allPersons = [...persons];

    allPersons.map((person) => {
      if (person.name === newPerson.name) {
        const replace = confirm(
          `${newPerson.name} is already added in the phonebook, replace old number with new?`
        );
        if (replace) {
          const updatedPersons = persons.map((person) =>
            person.id === alredyExist.id
              ? { ...person, number: newNumber }
              : person
          );
          peopleService
            .updatePerson({ ...alredyExist, number: newNumber })
            .then(() => setPersons(updatedPersons)).catch(err => {
              messageAction({
                status: "fail",
                message: `Information of ${alredyExist.name} has been removed from the server`,
              })
              return err.message
            })
        }
      }
      messageAction({
        status: "success",
        message: `Number of ${person.name} is changed`,
      });
    });

    if (!alredyExist) {
      peopleService
        .createPerson(newPerson)
        .then((person) => setPersons(persons.concat(person)));
      setMessage(`Added${newPerson.name}`);
      messageAction({
        status: "success",
        message: `Added ${newPerson.name}`,
      });
    }
  };

  const handleDeletePerson = (id) => {
    peopleService
      .deletePerson(id)
      .then((data) => {
        const allPersons = persons.filter((person) => person.id !== data.id);
        setPersons(allPersons);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    peopleService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <h3
        className={
          message.status === "success"
            ? "message-success"
            : message.status === "fail"
            ? "message-fail"
            : undefined
        }
      >
        {message.message}
      </h3>
      <SearchPeople onSearch={handleFiterInput} />
      <AddPersonForm
        handleAddName={handleAddName}
        onChangeName={(e) => setNewName(e.target.value)}
        onChangeNumber={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          persons={filteredPersons.length === 0 ? persons : filteredPersons}
          onDelete={handleDeletePerson}
        />
      </div>
    </div>
  );
};

export default App;
