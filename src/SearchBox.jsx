import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css"
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';

export function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "6731e251e68fb73764ecb93a7d91ce6a";

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonRes = await response.json();
        
        let result = {
            city : jsonRes.name,
            temp : jsonRes.main.temp,
            feelsLike : jsonRes.main.feels_like,
            humidity : jsonRes.main.humidity,
            weather : jsonRes.weather[0].description,
            wind : jsonRes.wind.speed,
        };
        return(result);
        } catch(err){
            throw err;
        }
    }
    
    
    let handleCity = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        try{
            event.preventDefault();
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        } catch(err){
            setError(true);
        }
    }

    useEffect(function errorChange(){
        setError(false);
    },[city]);

    return(
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="standard" required value={city} onChange={handleCity}/>
                <br/><br/><br/>
                <Button variant="contained" type="submit">SEARCH</Button>
                {error && <Alert severity="error">No such place exists!</Alert>}
            </form>
        </div>
    )
}