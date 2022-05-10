import React, { useEffect, useState } from "react";
import VehiclesTable from "./VehiclesTable";
import VehicleForm from "./VehicleForm";
import MaintenanceRecordTable from "./MaintenanceRecordTable";
import MaintenanceRecordForm from "./MaintenanceRecordForm";

function Home({user}) {
    const [vehicles, setVehicles] = useState([]);
    const [maintenance_records, setMaintenanceRecords] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState(undefined);

    function handleLogout() {
        setMaintenanceRecords("");
        setCurrentVehicle(undefined);
      }

    // Fetch Vehicles
    useEffect(() => {
        fetch(`users/${user.id}/vehicles`).then((r) => {
            if (r.ok) {
                r.json().then((vehicles) => setVehicles(vehicles));
            }
        });
    }, [user]);

    return (
        <div>
            <VehiclesTable vehicles={vehicles} setMaintenanceRecords={setMaintenanceRecords} setVehicles={setVehicles} setCurrentVehicle={setCurrentVehicle} user={user} />
            <VehicleForm user={user} vehicles={vehicles} setVehicles={setVehicles} setCurrentVehicle={setCurrentVehicle} />
            <MaintenanceRecordTable maintenance_records={maintenance_records} currentVehicle={currentVehicle} />
            <MaintenanceRecordForm user={user} currentVehicle={currentVehicle} maintenance_records={maintenance_records} setMaintenanceRecords={setMaintenanceRecords} />
        </div>
    )
}

export default Home;