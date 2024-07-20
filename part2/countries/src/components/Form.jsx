const Form = ({country, setCountry}) => {

  const  handleCountry = (event) =>{
    console.log(country);
    setCountry(event.target.value)
  }
 


    return (
        
            <div>
                Pais: <input value={country} onChange={handleCountry} />                
            </div>
            
    )
}

export default Form