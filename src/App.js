import React, { useState } from "react";
import axios from "axios";

/**
 * 
 * @author Cabrini Verren
 * for educational purpose only.
 */

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [click, isClicked] = useState("");

  const apiKey = "(insert your API KEY here)";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setCity("");
    }
  };
  // check season to determine outfit recommendation
  function checkSeason(data) {
    let season = "";
    //const weather = JSON.parse(data);

    // the temperature degree
    const degree = data.main ? data.main.temp : null;

    // degree threshold from autumn to winter
    const autumnWinter = 9;

    // degree threshold from summer to autumn
    const summerAutumn = 19;

    if (degree < autumnWinter) {
      season = "Winter";
    } else if (degree > summerAutumn) {
      season = "Summer";
    } else if (degree >= autumnWinter || degree <= autumnWinter) {
      season = "Autumn/Spring";
    }
    return season;
  }

  const handleClickWinter = () => {
    window.open(
      "https://www.instagram.com/explore/tags/winteroutfit/",
      "_blank"
    );
  };

  const handleClickAutumn = () => {
    window.open(
      "https://www.instagram.com/explore/tags/autumnoutfit/",
      "_blank"
    );
  };

  const handleClickSpring = () => {
    window.open(
      "https://www.instagram.com/explore/tags/springoutfit/",
      "_blank"
    );
  };

  const handleClickSummer = () => {
    window.open(
      "https://www.instagram.com/explore/tags/summeroutfit/",
      "_blank"
    );
  };

  return (
    <div className="App">
      <div className="search">
        <div className="header">
          <h1>Weather App</h1>
        </div>
        <input
          className="searchBox"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={searchCity}
          placeholder="Enter City"
          type="text"
        />
      </div>
      <div className="container">
        <div className="body">
          <div className="cityName">
            <h1>{data.name}</h1>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="humidity">
              <p className="bold">humidity</p>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>
            <div className="feelsLike">
              <p className="bold">feels like </p>
              {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
            </div>
            <div className="desc">
              {data.weather ? (
                <p className="bold">{data.weather[0].description}</p>
              ) : null}
            </div>
          </div>
        )}
        {data.name != undefined && (
          <div className="season">
            {checkSeason(data) == "Winter" && (
              <div className="outfitRec">
                <p>It's Winter!</p>
                <button className="btn" onClick={handleClickWinter}>
                  Click here to see Winter Outfit recommendation
                </button>
              </div>
            )}
            {checkSeason(data) == "Autumn/Spring" && (
              <div className="outfitRec">
                <p>It's quite freezing!</p>
                <button className="btn" onClick={handleClickAutumn}>
                  Click here to see Autumn Outfit recommendation
                </button>
                <button className="btn" onClick={handleClickSpring}>
                  Click here to see Spring Outfit recommendation
                </button>
              </div>
            )}

            {checkSeason(data) == "Summer" && (
              <div className="outfitRec">
                <p className="bold">It's Summer!</p>
                <button className="btn" onClick={handleClickSummer}>
                  Click here to see Summer Outfit recommendation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
