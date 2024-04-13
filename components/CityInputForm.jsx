'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'


const CityInputForm = ({onWeatherData, setCity}) => {
  const [inputCity, setInputCity] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/weather/city?city="${inputCity}"`)
    const weatherData = await response.json()
    onWeatherData(weatherData);
    setCity(inputCity);
  }

  return (
    <div className="flex items-cente mt-10">
    <form onSubmit={handleSubmit} className="flex justify-between gap-x-2">
      <Input className=""
      type="text"
      value={inputCity}
      onChange={(e)=> setInputCity(e.target.value)}
      placeholder="Enter City Name"
      />
     
      <Button
      type="submit"
      >
        Get weather info
      </Button>
    </form>

    </div>
      
    
  )
}

export default CityInputForm