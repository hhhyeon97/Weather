import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherBtn = ({ cities, setCity }) => {
  //console.log('cities?', cities);
  return (
    <div className="btn-area row">
      <Button variant="light">현재 위치</Button>
      {/*js코드쓸때{}를쓰자!*/}
      {cities.map((item, index) => (
        <Button variant="light" key={index} onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherBtn;
