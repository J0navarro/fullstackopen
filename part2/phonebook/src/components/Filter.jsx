
const Filter = ({ setPersons, persons, search , setFilter }) => {
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

 
  return (
    <div>
      <input value={search} onChange={handleFilterChange} />
      
        {
          
          persons
          .filter((person) =>
            person.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((person, index) => (

            <p key={index}>
              {person.name} - {person.number}
            </p>
          ))
        }
      
    </div>
  );
};
export default Filter;