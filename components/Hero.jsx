'use client'
import React, { useState } from 'react';
import CityInputForm from './CityInputForm';

const Hero = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <section>
      <h1>Weather App</h1>
      <CityInputForm onWeatherData={handleWeatherData} />
      {weatherData && (
        <div>
          <h2>Weather Data</h2>
          <p>Temperature: {weatherData.current.temp}°C</p>
          <p>Conditions: {weatherData.current.weather[0].description}</p>
          {/* Add more weather details as needed */}
        </div>
      )}
    </section>
  );
};

export default Hero;