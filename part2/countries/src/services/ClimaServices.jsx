import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/find?q=';
const api_key = import.meta.env.VITE_SOME_KEY

const getAllByCity = city => {
    return (
        axios.get(`${baseUrl}${city}&appid=${api_key}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating data:', error);
                throw error;
            })
    ) 
}


export default {getAllByCity} 