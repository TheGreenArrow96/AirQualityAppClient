import './App.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const ENDPOINT = "https://app-air-quality.herokuapp.com";

function App() {
  const [measurements, setMeasurements] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("New Measurement", airQualitySensor => {
      console.log(airQualitySensor);
      setMeasurements(prevMeasurements => [...prevMeasurements, airQualitySensor.measurement]);
      setDates(prevDates => [...prevDates, airQualitySensor.date]);
      console.log(dates);
    });
  }, []);

  return (
    <div className='container '>
      <div className='row justify-content-center pt-5'>
        <span className="col-md-4 badge bg-info ">
          <span className='text-white'> <span className='text-success'>GREEN:</span> the quality of the air is good  </span> <br></br>
          <span className='text-white'> <span className='text-warning'>YELLOW:</span> the quality of the air could be better </span> <br></br>
          <span className='text-white'> <span className='text-danger'>RED:</span> the quality of the air is bad </span>
          <h1 className="pt-3 pb-3">Actual CO2:{" "}
            <span className={measurements[measurements.length - 1] <= 1000 ? 'text-success' : measurements[measurements.length - 1] > 2000 ? 'text-danger' : 'text-warning'}>
              {measurements[measurements.length - 1]}
            </span>
          </h1>
        </span>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-2 col-auto'>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">History CO2</th>
              </tr>
            </thead>
            <tbody className="text-white" >
              {measurements.map(measurement =>
                <tr className={measurement <= 1000 ? 'bg-success' : measurement > 2000 ? 'bg-danger' : 'bg-warning'}>
                  <td>{measurement}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className='col-md-2 col-auto'>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody className="text-white" >
              {dates.map(date =>
                <tr className="bg-dark">
                  <td>{date}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default App;
