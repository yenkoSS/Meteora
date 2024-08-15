//https://api.weatherapi.com/v1/forecast.json?key=38c3d0784865490ba4d140655241101&q=Bucuresti&days=3&aqi=no&alerts=no//

import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [firstDay, setFirstDay] = useState({});
  const [secondDay, setSecondDay] = useState({});
  const [thirdDay, setThirdDay] = useState({});
  const [currentDay, setCurrentDay] = useState({});
  const [query, setQuery] = useState("Romania");

  function setStates(firstDayData, secondDayData, thirdDayData) {
    setFirstDay(firstDayData);
    setSecondDay(secondDayData);
    setThirdDay(thirdDayData);
    setCurrentDay(firstDayData);
  }

  function handleSubmit(e) {
    const value = e.target[0].value;
    if (!value) {
      return;
    }

    setQuery(e.target[0].value);
    e.preventDefault();
  }

  useEffect(
    function () {
      async function fetchData() {
        console.log(query);
        const res = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=38c3d0784865490ba4d140655241101&q=${query}&days=3&aqi=no&alerts=no`
        );
        const data = await res.json();
        const firstDayData = {
          location: data.location.name,
          localDate: data.forecast.forecastday[0].date,
          localDay: data.forecast.forecastday[0].date,
          conditionText: data.forecast.forecastday[0].day.condition.text,
          conditionIcon: data.forecast.forecastday[0].day.condition.icon,
          tempCelsius: data.current.temp_c,
          minTemp: data.forecast.forecastday[0].day.mintemp_c,
          maxtemp: data.forecast.forecastday[0].day.maxtemp_c,
          avghumidity: data.forecast.forecastday[0].day.avghumidity,
          totalPrecipmm: data.forecast.forecastday[0].day.totalprecip_mm,
          wind: data.forecast.forecastday[0].day.maxwind_kph,
        };
        const secondDayData = {
          location: data.location.name,
          localDate: data.forecast.forecastday[1].date,
          localDay: data.forecast.forecastday[1].date,
          conditionText: data.forecast.forecastday[1].day.condition.text,
          conditionIcon: data.forecast.forecastday[1].day.condition.icon,
          tempCelsius: data.forecast.forecastday[1].day.avgtemp_c,
          minTemp: data.forecast.forecastday[1].day.mintemp_c,
          maxtemp: data.forecast.forecastday[1].day.maxtemp_c,
          avghumidity: data.forecast.forecastday[1].day.avghumidity,
          totalPrecipmm: data.forecast.forecastday[1].day.totalprecip_mm,
          wind: data.forecast.forecastday[1].day.maxwind_kph,
        };
        const thirdDayData = {
          location: data.location.name,
          localDate: data.forecast.forecastday[2].date,
          localDay: data.forecast.forecastday[2].date,
          conditionText: data.forecast.forecastday[2].day.condition.text,
          conditionIcon: data.forecast.forecastday[2].day.condition.icon,
          tempCelsius: data.forecast.forecastday[2].day.avgtemp_c,
          minTemp: data.forecast.forecastday[2].day.mintemp_c,
          maxtemp: data.forecast.forecastday[2].day.maxtemp_c,
          avghumidity: data.forecast.forecastday[2].day.avghumidity,
          totalPrecipmm: data.forecast.forecastday[2].day.totalprecip_mm,
          wind: data.forecast.forecastday[2].day.maxwind_kph,
        };

        setStates(firstDayData, secondDayData, thirdDayData);
      }

      fetchData();
    },
    [query]
  );

  return (
    <div className="container">
      <div className="app">
        <NavBar>
          <Logo />
          <Search
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />
        </NavBar>
        <Main>
          <Box>
            <LeftBox currentData={currentDay} />
            <RightBox currentData={currentDay} />
          </Box>
          <MoreDetailsBox currentData={currentDay} />
          <Box>
            <ForecastBox
              forecastData={firstDay}
              setCurrentDay={setCurrentDay}
            />
            <ForecastBox
              forecastData={secondDay}
              setCurrentDay={setCurrentDay}
            />
            <ForecastBox
              forecastData={thirdDay}
              setCurrentDay={setCurrentDay}
            />
          </Box>
        </Main>
        <Footer />
      </div>
    </div>
  );
}

function NavBar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

function Logo() {
  return (
    <div className="logo">
      <p className="text-logo">Meteora</p>
    </div>
  );
}

function Search({ query, setQuery, handleSubmit }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="search"
        type="text"
        placeholder="Enter city name..."
      ></input>
      <button type="submit" className="btn-submit">
        Search
      </button>
    </form>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function LeftBox({ currentData }) {
  return (
    <div className="left-box">
      <p className="text-today">
        {new Date(currentData.localDay).toLocaleDateString("en-EN", {
          weekday: "long",
        })}
      </p>
      <p className="text-current-date">{currentData.localDate}</p>
      <p className="text-location">{currentData.location}</p>
    </div>
  );
}

function RightBox({ currentData }) {
  return (
    <div className="right-box">
      <img className="weather-icon-big" src={currentData.conditionIcon}></img>
      <p className="text-temperature">
        {new Intl.NumberFormat("en-US", {
          style: "unit",
          unit: "celsius",
        }).format(currentData.tempCelsius)}
      </p>
      <p className="text-condition">{currentData.conditionText}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p className="text-footer">Copyright reserved to Stefan Petru-Cornel</p>
    </footer>
  );
}

function MoreDetailsBox({ currentData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="more-details-box">
      <button className="btn-details" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? "More" : "Less"}
      </button>
      {isOpen && (
        <div className="more-details">
          <div className="details-feature-box">
            <p className="text-details">Min temp:</p>
            <p className="text-details">
              {new Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "celsius",
              }).format(currentData.minTemp)}
            </p>
          </div>
          <div className="details-feature-box">
            <p className="text-details">Max temp:</p>
            <p className="text-details">
              {new Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "celsius",
              }).format(currentData.maxtemp)}
            </p>
          </div>
          <div className="details-feature-box">
            <p className="text-details">Humidity:</p>
            <p className="text-details">
              {new Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "percent",
              }).format(currentData.avghumidity)}
            </p>
          </div>
          <div className="details-feature-box">
            <p className="text-details">Precipitation:</p>
            <p className="text-details">
              {new Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "percent",
              }).format(currentData.totalPrecipmm)}
            </p>
          </div>
          <div className="details-feature-box">
            <p className="text-details">Wind:</p>
            <p className="text-details">
              {new Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "kilometer-per-hour",
              }).format(currentData.wind)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ForecastBox({ forecastData, setCurrentDay }) {
  return (
    <div className="forecast-box" onClick={() => setCurrentDay(forecastData)}>
      <img className="icon" src={forecastData.conditionIcon}></img>
      <p className="text-location">
        {new Date(forecastData.localDay).toLocaleDateString("en-EN", {
          weekday: "short",
        })}
      </p>
      <p className="text-current-date">
        {new Intl.NumberFormat("en-US", {
          style: "unit",
          unit: "celsius",
        }).format(forecastData.tempCelsius)}
      </p>
    </div>
  );
}
