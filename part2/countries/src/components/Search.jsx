import React, { useEffect, useState } from 'react';
import ClimaServices from '../services/ClimaServices';

const DetallePais = ({ filteredCountries, cityData }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Flag</th>
            <th>Area</th>
            <th>Language</th>
            <th>Clima</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{filteredCountries[0].name || 'N/A'}</td>
            <td>{filteredCountries[0].capital || 'N/A'}</td>
            <td>
              <img
                src={filteredCountries[0].flags?.png || 'N/A'}
                alt={`Flag of ${filteredCountries[0].name?.common || 'N/A'}`}
              />
            </td>
            <td>{filteredCountries[0].area || 0}</td>
            <td>
              {filteredCountries[0].languages
                ? Object.values(filteredCountries[0].languages).join(', ')
                : 'N/A'}
            </td>
            <td>{cityData ? cityData[0]?.description : 'Cargando...'}</td>
            <td>
              <img src={cityData ?  `https://openweathermap.org/img/wn/${cityData[0]?.icon}@2x.png` : 'Cargando...'} alt="" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const Search = ({ country, dataAllCountrys, setDataShow, dataShow }) => {
  const [cityData, setCityData] = useState(null);

  const handleShow = (event) => {
    const value = event.target.value;
    setDataShow(value);
    console.log(dataShow);
  };

  if (!dataAllCountrys || !country) {
    return null;
  }

  const valor = dataShow ? dataShow : country;
  const campo = dataShow ? 'flag' : 'name';

  console.log(valor);
  const filteredCountries = dataAllCountrys.filter((filterCountry) =>
    filterCountry[campo]?.toLowerCase().includes(valor.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      ClimaServices.getAllByCity(filteredCountries[0].capital)
        .then((response) => {
          setCityData(response.list[0].weather); // Ajusta según la estructura de respuesta
        })
        .catch((error) => {
          console.error('Error fetching city data:', error);
        });
    } else {
      setCityData(null); // Reinicia cityData si hay más de un país
    }
  }, [filteredCountries]);

  if (filteredCountries.length === 1) {
    return <DetallePais filteredCountries={filteredCountries} cityData={cityData} />;
  }

  if (filteredCountries.length > 10) {
    return <p>Por favor, realice una consulta más específica</p>;
  }

  if (filteredCountries.length === 0) {
    return <p>No hay coincidencias</p>;
  } else if (filteredCountries.length > 1) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((filterCountry, index) => (
              <tr key={index}>
                <td>{filterCountry.name || 'N/A'}</td>
                <td>
                  <button value={filterCountry.flag || 'N/A'} onClick={handleShow}>
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Search;
