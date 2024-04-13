'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'


const CityInputForm = ({onWeatherData, setCity}) => {
  const [inputCity, setInputCity] = useState('')
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputCity) {
      setError('Please enter a city name.');
      return;
    }
    try {
      const response = await fetch(`https://nextweather-mu.vercel.app/weather/city?city=${inputCity}`);
      if (!response.ok) {
        throw new Error('City not found.');
      }
      const weatherData = await response.json();
      onWeatherData(weatherData);
      setCity(inputCity);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
    <form onSubmit={handleSubmit} className="flex justify-between gap-x-2">
      <Input className=""
      type="text"
      value={inputCity}
      onChange={(e)=> setInputCity(e.target.value)}
      placeholder="Enter City Name"
      required
      />
     
      <Button
      type="submit"
      >
        Get weather info
      </Button>
    </form>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
      
  


    
  )
}

export default CityInputForm