// Meteo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Meteo.css";
import MeteoCard from './MeteoCard';

const Meteo = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityNames = ['Paris', 'London', 'New York', 'Tokyo', 'Sydney']; // Ajoutez ici les noms des villes souhaitées
        const citiesData = await getWeatherDataForCities(cityNames);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherDataForCities = async (cityNames) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const promises = cityNames.map(cityName => getCityWeather(cityName, apiKey));
    const citiesData = await Promise.all(promises);
    return citiesData.filter(cityData => cityData !== null);
  };

  const getCityWeather = async (cityName, apiKey) => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      const { name, sys, main, wind } = response.data;
      console.log(response.data);
      const cityData = {
        name,
        postalCode: sys.country,
        temperature: main.temp,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        windSpeed: wind.speed
      };
      return cityData;
    } catch (error) {
      console.error('Error fetching weather data for', cityName, ':', error);
      return null;
    }
  };

  return (
    <div className="meteo-container">
      <h1>Weather App</h1>
      <h2>Choose a city:</h2>
      <div className="card-container">
        {cities.map(city => (
          <MeteoCard key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Meteo;
