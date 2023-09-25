import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: black;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
`;

const Temperature = styled.h1`
  color: #FF0000;
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

const WeatherInfo = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

const Weather = () => {
  const [data, setData] = useState(null);

  const apiKey = "d8a49fc75d214edf71e3b73e729daf99";
  const city = "Sao Paulo,BR";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [apiKey, city]);

  return (
    <Card>
      {data && (
        <>
          <Temperature>Temperatura atual: {data.main.temp}°C</Temperature>
          <WeatherInfo>
            <h2>Umidade atual: {data.main.humidity}%</h2>
            <h3>Sensação térmica atual: {data.main.feels_like}°C</h3>
            <h4>Vento atual: {data.wind.speed} km/h</h4>
            <h5>Previsão para as próximas horas:</h5>
            <ul>
              {data.weather.map((weather, index) => (
                <li key={index}>
                  <img
                    src={`https://openweathermap.org/img/w/${weather.icon}.png`}
                    alt={weather.main}
                  />
                  {weather.main}
                </li>
              ))}
            </ul>
          </WeatherInfo>
        </>
      )}
    </Card>
  );
};

export default Weather;