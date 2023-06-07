import { useState, useEffect } from "react";
import "./App.scss";
import Chart from "./Chart";
import readXlsxFile from "read-excel-file";
function App() {
  const initialState = [];
  const [datosTemporales, setDatosTemporales] = useState({});
  const [chartState, setChartState] = useState(false);
  const [somato, setSomato] = useState([]);
  const [variablesXY, setVariablesXY] = useState([]);
  const [file, setFile] = useState(initialState);
  const [renderDatos, setRenderDatos] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      readXlsxFile(e.target.files[0]).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        setFile(rows);
      });
      setRenderDatos(true);
    }
  };

  var data = [
    { x: variablesXY[0], y: variablesXY[1] }, // cuadrante Superior Medio Derecho
    // {"x":52,"y":-13},   // cuadrante Inferior Medio Derecho
    // {"x":25,"y":-33},   // cuadrante Inferior Bajo Derecho
    // {"x":-25,"y":-33},  // cuadrante Inferior Bajo Izquierdo
    // {"x":-42,"y":-14},  // cuadrante Inferior Medio Izquierdo
  ];
  const calculateEndomorphy = (Var14, Var16, Var17, Var3) => {
    let Endomorphy = 0;
    let Z = Var14 + Var16 + Var17;
    let PC = (Z * 170.18) / Var3;
    Endomorphy =
      -0.7182 +
      0.1451 * PC +
      -0.00068 * Math.pow(PC, 2) +
      0.0000014 * Math.pow(PC, 3);
    setSomato(somato.push(Endomorphy));
  };
  const calculateMesomorphy = (
    Var5,
    Var14,
    Var8,
    Var19,
    Var12,
    Var13,
    Var3
  ) => {
    let Mesomorphy = 0;
    let B = Var5 - Var14 / 10;
    let P = Var8 - Var19 / 10;
    Mesomorphy =
      0.858 * Var12 +
      0.601 * Var13 +
      0.188 * B +
      0.161 * P -
      Var3 * 0.131 +
      4.5;

    setSomato(somato.push(Mesomorphy));
  };

  const calculateEctomorfia = (Var3, Var1) => {
    let IP = Var3 / Math.pow(Var1, 1 / 3);
    let Ectomorphy = 0;

    if (IP >= 40.75) {
      Ectomorphy = 0.732 * IP - 28.58;
    } else if (IP > 38.25) {
      Ectomorphy = 0.463 * IP - 17.63;
    } else if (IP <= 38.25) {
      Ectomorphy = 0.1;
    } else {
      Ectomorphy = "NA";
    }

    setSomato(somato.push(Ectomorphy));
  };

  const calculateXY = (somato) => {
    let x = somato[2] - somato[0];
    let y = somato[1] * 2 - (somato[0] + somato[2]);

    let array = [];

    array.push(x);
    array.push(y);

    setVariablesXY(array);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEndomorphy(
      datosTemporales["Var14"],
      datosTemporales["Var16"],
      datosTemporales["Var17"],
      datosTemporales["Var3"]
    );

    calculateMesomorphy(
      datosTemporales["Var5"],
      datosTemporales["Var14"],
      datosTemporales["Var8"],
      datosTemporales["Var19"],
      datosTemporales["Var12"],
      datosTemporales["Var13"],
      datosTemporales["Var3"]
    );

    calculateEctomorfia(datosTemporales["Var3"], datosTemporales["Var1"]);

    calculateXY(somato);

    console.log(somato, "valores somatotipo");

    setSomato([]);

    setChartState(true);
  };

  return (
    <div className="App">
      <div className="logo-box">
        <a
          href="https://github.com/electron-vite/electron-vite-react"
          target="_blank"
        >
          <img
            src="./vite.svg"
            className="logo vite"
            alt="Electron + Vite logo"
          />
          <img
            src="./electron.svg"
            className="logo electron"
            alt="Electron + Vite logo"
          />
        </a>
      </div>
      <h1>SomatoChart v2</h1>
      <h2>Carga de datos</h2>
      <h3>Datos personales</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Apellidos</label>
        <input type="text" /> Anónimo
        <input type="checkbox" name="" id="" />
        <br />
        <label htmlFor="">Nombres</label>
        <input type="text" />
        <br />
        <label htmlFor="">Sexo</label>
        <select name="" id="">
          <option value="">Femenino</option> <option value="">Masculino</option>
        </select>
        <h3>Datos antropométricos</h3>
        <input type="file" onChange={handleFileChange} /> <br />
        {renderDatos ? (
          <>
            <label htmlFor="">Peso (kg) </label>
   <select>{file[0].map(e =><option>{e}</option>)}</select>

          </>
        ) : (
          <>
            <label htmlFor="">Peso (kg) </label>
            <input
              type="number"
              name="Var1"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var1: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Talla (cm) </label>
            <input
              type="number"
              name="Var3"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var3: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Perímetro brazo (cm) </label>
            <input
              type="number"
              name="Var5"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var5: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Perímetro de pierna (cm)</label>
            <input
              type="number"
              name="Var8"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var8: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Diámetro humeral (cm) </label>
            <input
              type="number"
              name="Var12"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var12: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Diámetro femoral (cm) </label>
            <input
              type="number"
              name="Var13"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var13: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue tricipital (mm) </label>
            <input
              type="number"
              name="Var14"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var14: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue subescapular (mm)</label>
            <input
              type="number"
              name="Var16"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var16: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue suprailíaco (mm)</label>
            <input
              type="number"
              name="Var17"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var17: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue de pierna (mm) </label>
            <input
              type="number"
              name="Var19"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var19: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <br />
            <button type="submit">Calcular</button>{" "}
          </>
        )}
      </form>
      {chartState && <Chart data={data} />}
      {file && `${file[0]}`}
      <h3>Datos de actividad fisica</h3>
      <label htmlFor="">Deporte</label>
      <input type="text" />
      <br />
      <label htmlFor="">Horas semanales</label>
      <input type="number" />
      <br />
    </div>
  );
}

export default App;
