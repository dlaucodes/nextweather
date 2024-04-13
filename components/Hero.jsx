"use client";
import React, { useState, useEffect } from "react";
import CityInputForm from "./CityInputForm";
import { Button } from "./ui/button";
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherStormy,
  TiWeatherSnow,
} from "react-icons/ti";
import { Card } from "./ui/card";
import IconWiDayRain from "./ui/rain";
import IconWiStrongWind from "./ui/wind";

const Hero = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false); // State for temperature unit
  const [city, setCity] = useState("New York");

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://enigmatic-sands-37742-9e61dfac3608.herokuapp.com/weather/city?city=${city}`
      );
      const weatherData = await response.json();
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  const toggleUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const convertToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };

  const getWeatherIcon = (weather) => {
    // Map weather condition to corresponding icon
    switch (weather) {
      case "Clear":
        return <TiWeatherSunny />;
      case "Clouds":
        return <TiWeatherCloudy />;
      case "Drizzle":
        return <IconWiDayRain />;
      case "Rain":
        return <IconWiDayRain />;
      case "Thunderstorm":
        return <TiWeatherStormy />;
      case "Snow":
        return <TiWeatherSnow />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Fetch weather data for the default city when the component mounts
    fetchWeatherData(city);
  }, []);

  return (
    <section className="h-screen md:h-full flex flex-col items-center jsutify-center border dark:border-primary m-8 rounded-2xl">
      {weatherData && (
        <div className="items-center flex flex-col">
          {/* city search input bar */}
          <CityInputForm onWeatherData={handleWeatherData} setCity={setCity} />
           {/*current  city */}
          <div className="pb-2 pt-6 text-3xl">{city}</div>
          <div className="grid grid-cols-2">
            {/* temperature */}
            <div className="text-8xl flex items-center py-6">
              {isCelsius
                ? convertToCelsius(weatherData.current.temp).toFixed(0)
                : convertToFahrenheit(weatherData.current.temp).toFixed(0)}{" "}
              {isCelsius ? "°" : "°"}
            </div>
                 {/* weather icon */}
            <div className="flex justify-center flex-col px-8">
              <div className="flex">
                <span className="text-2xl flex">
                  {getWeatherIcon(weatherData.current.weather[0].main)}
                </span>
                <div className="flex items-center text-md">
                  {weatherData.current.weather[0].description}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl">
                  <IconWiStrongWind />
                </span>
                {weatherData.current.wind_speed.toFixed(0)} mph
              </div>
            </div>
          </div>
          <Button onClick={toggleUnit} type="submit">
            {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
          </Button>

          <div className="flex items-center md:w-full p-6 gap-6 justify-center flex-wrap">
            {weatherData.daily.slice(1, 6).map((day, index) => (
              <div key={index}>
                {/* 5-day forecast cards */}
                <Card className="flex flex-col justify-center items-center w-[150px] h-[150px]">
                  <span className="text-4xl drop-shadow-2xl">
                    {getWeatherIcon(day.weather[0].main)}
                  </span>
                  <p className="text-sm p-1">
                    {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <p>
                    {isCelsius
                      ? convertToCelsius(day.temp.day).toFixed(0)
                      : convertToFahrenheit(day.temp.day).toFixed(0)}{" "}
                    {isCelsius ? "°C" : "°F"}
                  </p>

                  <p className="text-sm p-2">{day.weather[0].description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
