import React from 'react';

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
      <div className="weather-desc">{weather?.weather[0].description}</div>
    </div>
  );
};

export default WeatherBox;
