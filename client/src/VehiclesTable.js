import React from "react";
import VehicleRow from "./VehicleRow";

function VehiclesTable({ user, vehicles, setVehicles, setCurrentVehicle, currentVehicle, setMaintenanceRecords }) {

  function handleDeleteVehicle(event, vehicle) {
    fetch(`users/${user.id}/vehicles/${vehicle.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setVehicles(vehicles.filter(v => v.id !== vehicle.id))
        setCurrentVehicle(undefined)
        console.log("Delete was successful")
      } else {
        console.log("Delete was not successful")
      }
    })
  }

  return (
    <div>
      <h2>Vehicles</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Year</th>
            <th>Make</th>
            <th>Model</th>
            <th>Mileage</th>
            {/* <th>Remove Vehicle</th> */}
            {/* <th>Maintenance Records</th> */}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <VehicleRow key={v.id} vehicle={v} user={user} handleDeleteVehicle={handleDeleteVehicle} setCurrentVehicle={setCurrentVehicle} setMaintenanceRecords={setMaintenanceRecords} />
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default VehiclesTable;
