import React from 'react';
import weatherDescKo from '../data/weatherDescKo';

const WeatherBox = ({ weather }) => {
  console.log('weather?', weather);
  const fahrenheit = ((weather?.main.temp * 9) / 5 + 32).toFixed(2);

  return (
    <div className="weather-box">
      <div className="city-name">{weather?.name}</div>
      <div className="weather-content">
        {weather?.main.temp} °C &nbsp; {fahrenheit} °F
        <br />
        <span className="humidity">
          <i className="fa-solid fa-droplet"></i> {weather?.main.humidity} %
        </span>
      </div>
      <div className="weather-desc">
        <i>
          <img
            className="icon-image"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
            alt=""
          />
        </i>
        {/*weather?.weather[0].description*/}
        {weatherDescKo[weather?.weather[0].id]}
      </div>
    </div>
  );
};

export default WeatherBox;
