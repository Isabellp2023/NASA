import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './assets/apolo.png';
import Figure from './Components/Figure';
import './App.css';

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [apod, setApod] = useState({});
  const [date, setDate] = useState(today);
  const NASA_URL = "https://api.nasa.gov/";
  const NASA_API_KEY = "uKwuyAr0D2jqNdU0DEWPqOj8FficucpVKqpFYq1T";

  useEffect(() => {
    const getApod = async () => {
      const data = await axios.get(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      );
      setApod(data.data);
    };
    getApod();
  }, [date]);
  

  const handleInput = (ev) => {
    setDate(ev.target.value);
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="NASA LOGO" />
      </div>
      <h2 className="title">NASA API</h2>
      <div className="foto">
        <h1>Imagen Astronómica del Día</h1>
      </div>
      <div className="fecha">
        <h3>Por favor elige una Fecha anterior</h3>
      </div>
      <input type="date" id="photo-date" value={date} onChange={handleInput} />
      {date > today ? (
        <Figure data={apod} />
      ) : (
        <div className="standard-dialog center">
          <h4 className="dialog-text">
            <a href="https://api.nasa.gov/">Ir a la página de la NASA</a>
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;
