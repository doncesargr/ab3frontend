import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete.js";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "./public/assets/AnyCLogo.png";

import "./App.css";
import { HideImageOutlined } from "@mui/icons-material";

var newPower;
var newTemp;

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 5,
    label: "5°C",
  },
  {
    value: 10,
    label: "10°C",
  },
  {
    value: 15,
    label: "15°C",
  },
  {
    value: 20,
    label: "20°C",
  },
];

function temptext(value: number) {
  newTemp = parseInt(value);
  return `${value}°C`;
}

function powertext(value: number) {
  newPower = parseInt(value);
  return `${value}%`;
}

function Welcome(props) {
  return <h1>{props.name}</h1>;
}

function MyButton(props) {
  function postMessage() {
    var endpoint = "https://0gjkyqhhw2.execute-api.us-east-1.amazonaws.com/dev";

    var queryString = `?power=${props.power}&temp=${props.temp}`;
    var url = endpoint + queryString;
    console.log(props);
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((m) => console.log(m.payload));
    return;
  }

  return (
    <div className="btn_normal">
      <Button variant="contained" size="large" onClick={postMessage}>
        Desplegar Actualización
      </Button>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [valuePower, setValuePower] = useState(50);
  const [valueTemp, setValueTemp] = useState(20);

  const handlePowerChange = (event, newValue) => {
    setValuePower(newValue);
  };

  const handleTempChange = (event, newValue) => {
    setValueTemp(newValue);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  var powerText;

  return (
    <div className="App">
      <div>
        <div className="crop">
          <Box
            component="img"
            sx={{
              height: 233,
              width: 250,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            src={logo}
          />
        </div>

        <div className="sliderbox">
          <Box sx={{ width: 300, border: "1px solid grey" }}>
            <TextField
              id="standard-basic"
              label="Ajuste de Temperatura"
              variant="standard"
            />
            <Slider
              aria-label="Temperature"
              value={valueTemp}
              getAriaValueText={temptext}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={20}
              marks={marks}
              onChange={handleTempChange}
            />
          </Box>
          <Box sx={{ width: 300, border: "1px solid grey" }}>
            <TextField id="standard-basic" label="Energía" variant="standard" />
            <Slider
              value={valuePower}
              step={1}
              min={0}
              max={100}
              getAriaValueText={powertext}
              valueLabelDisplay="auto"
              onChange={handlePowerChange}
            />
          </Box>
        </div>
        <MyButton title="Normal" power={valuePower} temp={valueTemp} />
      </div>
    </div>
  );
}

export default App;
