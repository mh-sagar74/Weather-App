import { useState } from "react";
import {InfoBox} from "./InfoBox";
import {SearchBox} from "./SearchBox";

export function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city : "Khulna",
        temp : 14.92,
        feelsLike : 14.35,
        humidity : 72,
        weather : "scattered clouds",
        wind : 2.82,
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return(
        <div style={{textAlign : "center"}}>
            <h1>Weather App</h1>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}