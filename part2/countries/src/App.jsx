import { useState, useEffect } from 'react'
import Form from './components/Form'
import Search from './components/Search';
import CountryServices from './services/CountyServices'


function App() {
  const [country, setCountry] = useState('')
  const [dataShow, setDataShow] = useState('')
  const [dataAllCountrys, setDataAllCountrys] = useState([])



  useEffect(() => {
    const extractCountryData = (countries) => {

      return countries.map(countryDat => ({
        name: countryDat.name?.common || 'N/A',
        area: countryDat.area || 0,
        flag: countryDat.flag || 'N/A',
        flags: countryDat.flags || { png: 'N/A', svg: 'N/A' },
        capital: (countryDat.capital && countryDat.capital.length > 0) ? countryDat.capital[0] : 'N/A',
        languages: countryDat.languages ? Object.values(countryDat.languages) : []
      }));
    }

   
    console.log('effect run, currency is now');
    CountryServices.getAll()
      .then(response => {
        const countryData = extractCountryData(response);        
        // console.log(countryData);
        setDataAllCountrys(countryData);
        setDataShow('')
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje de error al usuario
      });
  }, [country]);



  return (
    <>
      <Form country={country} setCountry={setCountry} />

      <Search dataAllCountrys={dataAllCountrys} dataShow={dataShow} setDataShow={setDataShow} country={country} />
    </>
  )
}

export default App
