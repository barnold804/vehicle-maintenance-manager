import React, { useState } from "react";
import VehicleRow from "./VehicleRow";

function VehiclesTable({ vehicles }) {

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
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <VehicleRow key={v.id} id={v.id} year={v.year} make={v.make} model={v.model} mileage={v.mileage} />
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default VehiclesTable;
