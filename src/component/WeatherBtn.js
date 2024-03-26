import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherBtn = () => {
  return (
    <div className="btn-area row">
      <Button variant="light">current location</Button>
      <Button variant="light">seoul</Button>
      <Button variant="light">paris</Button>
      <Button variant="light">seattle</Button>
      <Button variant="light">tokyo</Button>
    </div>
  );
};

export default WeatherBtn;
