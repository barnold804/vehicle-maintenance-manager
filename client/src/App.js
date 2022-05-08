import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import VehiclesTable from "./VehiclesTable"
import VehicleForm from "./VehicleForm";
import MaintenanceRecordTable from "./MaintenanceRecordTable";

function App() {
  const [user, setUser] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [maintenance_records, setMaintenanceRecords] = useState([]);

  // Fetch User // This should depend on a session existing
  useEffect(() => {
    fetch("/me").then((r) => { 
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  // Fetch Vehicles
  useEffect(() => {
    fetch(`users/${user.id}/vehicles`).then((r) => {
      if (r.ok) {
        r.json().then((vehicles) => setVehicles(vehicles));
      }
    });
  }, [user]);

  function handleLogout() {
    setUser("");
    setMaintenanceRecords("");
  }

  if (!user) {
    return (
      <div>
        <div style={{ paddingBottom: 60 }}>
          <Header user={user} onLogout={handleLogout} />
          <Login onLogin={setUser} />
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <VehicleForm user={user} vehicles={vehicles} setVehicles={setVehicles} />
      <VehiclesTable vehicles={vehicles} setMaintenanceRecords={setMaintenanceRecords} setVehicles={setVehicles} onLogout={handleLogout} user={user} />
      {maintenance_records.length === 0 ? <></> : <MaintenanceRecordTable maintenance_records={maintenance_records} onLogout={handleLogout}/> }
      <Routes>
      <Route exact path="/login" element={<Login />} />
      </Routes>    
      <Footer></Footer>
    </div>
  );
}

export default App;
