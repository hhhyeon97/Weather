import React from 'react';

const weatherBox = ({ weather }) => {
  console.log('weather?', weather);

  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
    </div>
  );
};

export default weatherBox;
