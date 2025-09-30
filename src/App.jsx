import { Grid, Typography } from "@mui/material";
import SearchBox from "./components/SearchBox";
import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weatherData, setWeatherData] = useState("");

  console.log("weatherData : ", weatherData);

  return (
    <Grid container spacing={2} size={12}>
      <Grid size={12}>
        <Typography
          variant="h3"
          fontWeight={"500"}
          gutterBottom
          textAlign={"center"}>
          Weather App
        </Typography>
      </Grid>

      <Grid size={12}>
        <SearchBox setWeatherData={setWeatherData} />
      </Grid>

      {weatherData && (
        <Grid size={12}>
          <WeatherCard weatherData={weatherData} />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
