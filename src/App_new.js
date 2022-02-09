import './App.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import AirQualitySensor from './AirQualitySensor';
import AirQualitySensorMeasurements from './AirQualitySensorMeasurements';
const ENDPOINT = "http://localhost:4001";

function App() {
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    console.log('Entrata metodo');
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
    <header className="app-header">
      React Measurements
    </header>
    { socket ? (
      <div className="chat-container">
        <AirQualitySensorMeasurements socket={socket} />
      </div>
    ) : (
      <div>Not Connected</div>
    )}
  </div>
  );
}

export default App;
