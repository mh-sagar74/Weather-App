import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useEffect, useState } from "react";
import SunnyIcon from "@mui/icons-material/Sunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudySnowingIcon from "@mui/icons-material/CloudySnowing";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const mediaData = [
  {
    main: "Rain",
    icon: <BeachAccessIcon sx={{ height: 35, width: 35 }} />,
    image:
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    main: "Clouds",
    icon: <WbCloudyIcon sx={{ height: 35, width: 35 }} />,
    image:
      "https://images.unsplash.com/photo-1614959909713-128c622fad23?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    main: "Clear",
    icon: <SunnyIcon sx={{ height: 35, width: 35 }} />,
    image:
      "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    main: "Thunderstorm",
    icon: <ThunderstormIcon sx={{ height: 35, width: 35 }} />,
    image:
      "https://images.unsplash.com/photo-1584267385289-81fdaa6efe7a?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    main: "Drizzle",
    icon: <CloudySnowingIcon sx={{ height: 35, width: 35 }} />,
    image:
      "https://images.unsplash.com/photo-1630574232726-fc3ea90637b8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    main: "Snow",
    icon: <AcUnitIcon sx={{ height: 35, width: 35 }} />,
    image:
      "https://images.unsplash.com/photo-1457269449834-928af64c684d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function WeatherCard({ weatherData }) {
  const { weather, name, main, wind, sys } = weatherData;
  const [media, setMedia] = useState("");

  useEffect(() => {
    const appropiateMedia = mediaData.find(
      (data) => weather[0].main === data.main
    );
    setMedia(appropiateMedia);
  }, [weatherData]);

  return (
    <Card
      sx={{
        maxWidth: { xs: "100vw", sm: "50vw" },
        bgcolor: "#9163cb",
        color: "white",
        margin: "auto",
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={media.image}
          alt={weather[0].description}
        />
        <CardContent>
          <Typography gutterBottom>
            {name}, {sys.country}
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, marginY: 1 }}>
            <Typography
              variant="h4"
              component="div"
              fontWeight={"bold"}
              alignItems={"center"}>
              {Math.round(main.temp)}°
              <Typography component={"span"} fontWeight={"bold"}>
                C
              </Typography>
            </Typography>

            {media.icon}

            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "inline" },
              }}>{`(${weather[0].description})`}</Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              display: { sm: "none" },
            }}>{`(${weather[0].description})`}</Typography>

          <Typography variant="body2">
            Feels like : {Math.round(main.feels_like)}° C
          </Typography>

          <Typography variant="body2">
            Wind Speed : {wind.speed} km/h at {wind.deg}°
          </Typography>

          <Typography variant="body2">
            Sunrise : {new Date(sys.sunrise * 1000).toLocaleTimeString()}
          </Typography>

          <Typography variant="body2">
            Sunset : {new Date(sys.sunset * 1000).toLocaleTimeString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default WeatherCard;
