import React, { useState } from "react";
import VehicleRow from "./VehicleRow";

function VehiclesTable({ user, vehicles, setVehicles }) {

  function handleDeleteVehicle(event, vehicle) {
    fetch(`users/${user.id}/vehicles/${vehicle.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setVehicles(vehicles.filter(v => v.id !== vehicle.id))
        console.log("Delete was successful")
      } else {
        console.log("Delete was not successful")
      }
    })
  }

  return (
    <div>
      Vehicles
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Year</th>
            <th>Make</th>
            <th>Model</th>
            <th>Mileage</th>
            <th>Remove Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <VehicleRow key={v.id} vehicle={v} handleDeleteVehicle={handleDeleteVehicle} />
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default VehiclesTable;
