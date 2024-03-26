import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox.js';
import WeatherBtn from './component/WeatherBtn.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = '74283380a215dbfef8e3232bcff5db70';
function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  // 현재 위치 구하기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log('현재 위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  // 현재 위치 날씨 구하기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log('날씨 데이터', data);

    // 일출과 일몰 시간 가져오기
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    // 현재 시간 가져오기
    const currentTime = new Date();

    // 현재 시간이 일출과 일몰 사이에 있는지 확인하여 배경 이미지 설정
    if (currentTime > sunrise && currentTime < sunset) {
      setBackgroundImage(
        'https://i.pinimg.com/564x/5f/ae/ff/5faeffd0d801766699bd4ea4c8f1fd92.jpg',
      );
    } else {
      setBackgroundImage(
        'https://i.pinimg.com/564x/86/20/ee/8620ee1d43949ac559a1f33a3cbd2dfb.jpg',
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <WeatherBox />
      <WeatherBtn />
    </div>
  );
}

export default App;
