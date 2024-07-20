import { useState, useEffect } from 'react';
import personsServices from './services/PersonsServices'
import  Persons  from './components/Persons';
import  Filter  from './components/Filter';
import  Form  from './components/Form';
import Notificacion from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState({ mensaje: null, estado: null });

  useEffect(() => {
    personsServices
      .getAll()
      .then(response => {
        console.log(response);
        setPersons(response)
  })
}, [])



  return (
    <div>

      <h2>Phonebook</h2>
      <Filter setPersons={setPersons} persons={persons} search={search} setFilter={setFilter} />
      <Notificacion errorMessage={errorMessage} />
      <Form setPersons={setPersons}  setErrorMessage={setErrorMessage} errorMessage={errorMessage} persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={null} setPersons={setPersons} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
    </div>
  );
};


export default App;
