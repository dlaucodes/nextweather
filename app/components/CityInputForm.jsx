import React from 'react'
import { useState } from 'react'

const CityInputForm = ({onWeatherData}) => {
  const [city, setCity] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/weather/city?city="${city}"`)
    const weatherData = await response.json()
    onWeatherData(weatherData)
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="text-black"
      type="text"
      value={city}
      onChange={(e)=> setCity(e.target.value)}
      placeholder="Enter City Name"
      >
      </input>
      <button
      type="submit"
      >
        Get weather info
      </button>
    </form>
      
    
  )
}

export default CityInputForm