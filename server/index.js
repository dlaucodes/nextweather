// require('dotenv').config();
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
app.use(cors());

// constants
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BY_CITY_URL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_KEY}`;

// helpers

//takes lat, lon and creates the url
const buildWeatherByCityURL = (lat, lon) => {
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`;
};

//takes city to request for geolocation data to be broken down into lat lon
const buildGeolocationURL = (
  cityName,
  stateCode = "",
  countryCode = "",
  limit = 1
) => {
  if (!cityName) {
    throw new Error("City must be included");
  }
  return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`;
};
//used for getting lat, lon from city
const makeGeoLocationRequest = async (city) => {
  const geoLocationURL = buildGeolocationURL(city);
  const geoLocationResp = await fetch(geoLocationURL);
  const geoLocationData = await geoLocationResp.json();
  return geoLocationData;
};
//processing deconstucted lat, lon from makeGeoLocationRequest
const makeWeatherRequest = async (lat, lon) => {
  const weatherURL = buildWeatherByCityURL(lat, lon);
  const weatherResp = await fetch(weatherURL);
  const weatherData = await weatherResp.json();
  return weatherData;
};

app.get("/weather/city", async (req, res) => {
  //get lat and lon from city input via a request
  const city = req.query.city;

  if (!city) {
    throw new Error("City Must be passed in!");
  }

  //build URL and make a request get lat and lon
  const geoLocationData = await makeGeoLocationRequest(city);

  //check data length is valid
  if (geoLocationData.length < 1) {
    throw new Error("No locations were found for this city");
  }

  //pull out first item in data array since it returns an array of objects
  const cityData = geoLocationData[0];
  //deconstructed and saved into cityData
  const { lat, lon } = cityData;


  const weatherData = await makeWeatherRequest(lat, lon);

  res.json(weatherData);
});

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
