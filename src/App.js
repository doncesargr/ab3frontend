import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete.js";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "./public/assets/AnyCLogo.png";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import "./App.css";
import { HideImageOutlined } from "@mui/icons-material";

const style = {
  top: "50%",
  left: "25%",
  width: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [valuePower, setValuePower] = useState(50);
  const [valueTemp, setValueTemp] = useState(20);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePowerChange = (event, newValue) => {
    setValuePower(newValue);
  };

  const handleTempChange = (event, newValue) => {
    setValueTemp(newValue);
  };

  function postMessage() {
    var endpoint = "https://0gjkyqhhw2.execute-api.us-east-1.amazonaws.com/dev";

    var queryString = `?power=${valuePower}&temp=${valueTemp}`;
    var url = endpoint + queryString;

    console.log(queryString);
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((m) => {
        console.log(m.payload);
        handleOpen();
      });

    return;
  }

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
    <>
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
              <TextField
                id="standard-basic"
                label="Energía"
                variant="standard"
              />
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

          <div className="btn_normal">
            <Button variant="contained" size="large" onClick={postMessage}>
              Desplegar Actualización
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} disableScrollLock={true}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cambios Aplicados
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}

export default App;

/*
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cambios Aplicados
          </Typography>
        </Box>
*/
