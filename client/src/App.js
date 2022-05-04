import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Vehicles from "./Vehicles"
import MaintenanceRecords from "./MaintenanceRecords"

function App() {
  const [user, setUser] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);

  // Fetch User
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  // // Fetch Vehicles
  // useEffect(() => {
  //   fetch("/vehicles").then((r) => {
  //     if (r.ok) {
  //       r.json().then((vehicles) => setVehicles(vehicles));
  //     }
  //   });
  // }, []);
  
  // // Fetch Maintenance Records
  // useEffect(() => {
  //   fetch("/maintenance_records").then((r) => {
  //     if (r.ok) {
  //       r.json().then((maintenanceRecords) => setMaintenanceRecords(maintenanceRecords));
  //     }
  //   });
  // }, []);

  function handleLogout() {
    setUser("");
  }

  if (!user) {
    return (
      <div>
        <div style={{ paddingBottom: 60 }}>
          <Header user={user} onLogout={handleLogout} />
          <Login onLogin={setUser} />
          <Vehicles />
          <MaintenanceRecords />
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
      <Route exact path="/login" element={<Login />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
