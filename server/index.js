// require('dotenv').config();
import fetch from "node-fetch";
import express from "express";
import cors  from "cors";

const app = express();
const PORT = 8080;
const API_KEY = "d2c5063765dcb7d0bdd46e8c3ce52011"
// const API_KEY = process.env.WEATHER_KEY
const WEATHER_BY_CITY_URL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_KEY}`

const buildWeatherByCityURL = (lat, lon) => {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`
}

const buildGeolocationURL = (cityName, stateCode='', countryCode='', limit=1)=> {
    if(!cityName){
        throw new Error('City must be included')
    }
    return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`
}

app.use(cors());

app.get('/weather/city', async (req, res)=> {
    //get lat and lon from city input via a request
    const city = req.query.city

    if(!city){
        throw new Error('City Must be passed in!')
    }

    //build URL and make a request get lat and lon
    const geoLocationURL = buildGeolocationURL(city)
    const geoLocationResp = await fetch(geoLocationURL)
    const geoLocationData = await geoLocationResp.json()

    //check data length is valid
    if (geoLocationData.length < 1){
        throw new Error('No locations were found for this city')
    }

    //pull out first item in data arary since it reurns an array of objects
    const cityData = geoLocationData[0]

    const {lat, lon} = cityData

    const weatherURL = buildWeatherByCityURL(lat, lon)
    const weatherResp = await fetch(weatherURL)
    const weatherData = await weatherResp.json()

    console.log(weatherURL)
    res.json(
       weatherData
    )
});




app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`);
});
