import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox.js';
import WeatherBtn from './component/WeatherBtn.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [apiError, setAPIError] = useState('');
  const cities = ['sweden', 'new york', 'tokyo', 'seattle', 'seoul'];
  // 현재 위치 구하기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log('현재 위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // 도시별 날씨 구하기
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      // console.log('도시별 날씨 data', data);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  /*
  useEffect(() => {
    // console.log('city?', city);
    getWeatherByCity();
  }, [city]); // city상태 주시하자는 의미!
*/

  // 현재 위치 날씨 구하기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      //console.log('날씨 데이터', data);
      setWeather(data);
      setLoading(false);

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
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  /* 검색 기능 */
  const search = async (e) => {
    if (e.key === 'Enter') {
      if (query.trim() !== '') {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`,
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error('올바른 도시명을 입력해주세요.');
            }
            return res.json();
          })
          .then((result) => {
            setWeather(result);
            setAPIError(null); // 에러 초기화
            setQuery(''); // 검색 성공 후 검색어 초기화
          })
          .catch((error) => {
            //console.error('Error fetching data:', error);
            setAPIError(error.message);
          });
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <div className="search-area">
        <input
          id="inputCity"
          type="text"
          placeholder="도시명을 영어로 검색해주세요 : )"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {loading ? (
        <div className="container">
          <ClipLoader color="white" loading={loading} size={50} />
        </div>
      ) : !apiError ? (
        <div className="weather-area">
          <ClipLoader color="white" loading={loading} size={50} />
          <WeatherBox weather={weather} /> {/*함수도 props로 보내줄 수 있음!*/}
          <WeatherBtn cities={cities} setCity={setCity} selectedCity={city} />
        </div>
      ) : (
        <div className="container">
          <h4>{apiError}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
