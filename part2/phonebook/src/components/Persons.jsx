import PersonsServices from "../services/PersonsServices";

const Persons = ({ setPersons, persons, search , setErrorMessage, errorMessage}) => {

  const delObjet = (persons, id) => {
    const newPersons = [...persons];
    const keys = Object.keys(newPersons);
    const keyToRemove = keys.find((key) => newPersons[key].id === id);
    if (keyToRemove) {
      console.log('antes  ', newPersons);
      console.log(keyToRemove);
      delete newPersons[keyToRemove];
      const persontArray = Object.values(newPersons);
      return persontArray;
    }
  }

  const handleDellete = (event) => {
    event.preventDefault();
    const id = event.target.value
    PersonsServices
      .delPerson(id)
      .then(
        response => {
          console.log('Eliminado ', response);
          const persontArray = delObjet(persons, response.id)

          if (persontArray) {
            console.log('despues ', persontArray);
            setPersons(persontArray);
            console.log('todos ', persons);

            const newMensaje = { mensaje: "Delted " + response.name, estado: 'exito' }
            setErrorMessage(newMensaje);
            console.log('en el Form', errorMessage);
            setTimeout(() => {
              setErrorMessage({ mensaje: null, estado: null })
            }, 5000)
          }

        }
      )
      .catch(error => {
        setErrorMessage(
          `Note '${persons.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }
  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>
          {person.name} - {person.number} <button onClick={handleDellete} value={person.id}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;