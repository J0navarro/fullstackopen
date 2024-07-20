import PersonsServices from "../services/PersonsServices";

const Form = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber, setErrorMessage, errorMessage }) => {

  const addPerson = (event) => {
    event.preventDefault();
    console.log('Persons array', persons);

    let maxId = 0;

    console.log(persons.length);
    if (persons.length > 0) {

      maxId = Math.max(...persons.map(person => parseInt(person.id)));
    }

    if (newName.trim() !== '' && !persons.some((person) => person.name === newName)) {

      const newObject = {
        name: newName,
        number: newNumber,
        id: (maxId + 1).toString()
      }
      console.log('Paso2');
      PersonsServices
        .create(newObject)
        .then(response => {
          console.log('Paso3');
          setPersons(persons.concat(newObject));

          const newMensaje = { mensaje: "Added " + newName, estado: 'exito' }
          setErrorMessage(newMensaje);
          console.log('en el Form', errorMessage);
          setTimeout(() => {
            setErrorMessage({ mensaje: null, estado: null })
          }, 5000)

        })
        .catch(error => {
          setErrorMessage(
           {mensaje: `${newName} was already removed from server`, estado: 'error'}
          )
          setPersons(persons);
          setTimeout(() => {
            setErrorMessage({ mensaje: null, estado: null })
          }, 5000)
        })

    } else {
      alert(`${newName} ya existe en la agenda`);

      if (window.confirm(`Desea Modificar el numero de ${newName}`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        console.log(person);
        console.log(changedPerson);

        const id = person.id;
        PersonsServices
          .update(id, changedPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id !== id ? person : response))

            const newMensaje = { mensaje: `Modify '${newName}'`, estado: 'exito' };
            setErrorMessage(newMensaje)
            console.log('en el Form', errorMessage);
            setTimeout(() => {
              setErrorMessage({ mensaje: null, estado: 'exito' })
            }, 5000)
          }
          )
          .catch(error => {
            const newMensaje = { mensaje: `'${newName}' was already removed from server`, estado: 'error' };
            setErrorMessage(newMensaje)
            setTimeout(() => {
              setErrorMessage({ mensaje: null, estado: null })
            }, 5000)
          })
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (<form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default Form;