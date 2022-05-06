import React, { useState } from "react";

function MaintenanceRecords({ maintenanceRecords }) {

return (
    <div>
      Maintenance Records
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
          {maintenanceRecords.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.year}</td>
              <td>{v.make}</td>
              <td>{v.model}</td>
              <td>{v.mileage}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default MaintenanceRecords;
