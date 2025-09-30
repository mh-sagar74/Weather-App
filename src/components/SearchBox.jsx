import {
  Alert,
  Button,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useState } from "react";

function SearchBox({ setWeatherData }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchValue, setSearchValue] = useState("");
  const [isSearchError, setIsSearchError] = useState({
    isError: false,
    searchErrorMessage: "",
  });
  const [formValidation, setFormValidation] = useState({
    hasError: false,
    errorMessage: "Insert at least 2 characters.",
  });
  const API_KEY = "6731e251e68fb73764ecb93a7d91ce6a";

  const handleSearchButton = (e) => {
    e.preventDefault();

    if (searchValue && searchValue.length < 2) {
      setFormValidation((pre) => {
        return { ...pre, hasError: true };
      });
    } else {
      setFormValidation((pre) => {
        return { ...pre, hasError: false };
      });

      const fetchedData = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}&units=metric`
          );

          if (!res.ok) {
            setWeatherData("");
            setIsSearchError({
              isError: true,
              searchErrorMessage:
                "Oops! We couldn't find any matches. Please try another keyword.",
            });
            return;
          }

          const data = await res.json();
          setWeatherData(data);
          setIsSearchError({ isError: false, searchErrorMessage: "" });
        } catch (err) {
          console.log("Fetch bata has some error : ", err);
          setIsSearchError({ isError: true, searchErrorMessage: err.message });
        }
      };

      fetchedData();
    }
  };

  return (
    <>
      <Grid container direction={"column"} size={12} justifyContent={"center"}>
        <Grid
          component={"form"}
          onSubmit={handleSearchButton}
          container
          gap={2}
          size={12}
          justifyContent={"center"}
          alignItems={"center"}>
          <Grid>
            <TextField
              variant="filled"
              label="Search City"
              error={formValidation.hasError}
              helperText={
                formValidation.hasError ? formValidation.errorMessage : ""
              }
              sx={{
                width: "40vw",
                input: {
                  color: "#9163cb",
                },
                "& .MuiInputLabel-filled": {
                  color: "#9163cb",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#9163cb",
                },
                "& .MuiFilledInput-root": {
                  "&:before": {
                    borderBottom: "1px solid #9163cb",
                  },
                  "&:hover:before": {
                    borderBottom: "2px solid #9163cb",
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #9163cb",
                  },
                  "&.Mui-focused:after": {
                    borderBottom: "2px solid #9163cb",
                  },
                },
              }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </Grid>

          <Grid>
            {isSmallScreen ? (
              <IconButton
                sx={{
                  bgcolor: "#9163cb",
                  color: "white",
                  "&:hover": { bgcolor: "#824fc1ff" },
                }}>
                <TravelExploreIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                sx={{ bgcolor: "#9163cb", "&:hover": { bgcolor: "#824fc1ff" } }}
                type="submit"
                endIcon={<TravelExploreIcon />}>
                search
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      {isSearchError.isError && (
        <Alert
          variant="filled"
          severity="error"
          sx={{
            marginY: 3,
            width: "50vw",
            display: "flex",
            justifySelf: "center",
          }}>
          {isSearchError.searchErrorMessage}
        </Alert>
      )}
    </>
  );
}

export default SearchBox;
