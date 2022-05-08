import React from "react";
import MaintenanceRecordRow from "./MaintenanceRecordRow";

function MaintenanceRecordTable({ user, vehicles, maintenance_records, setMaintenanceRecords }) {

  return (
    <div>
      Maintenance Records
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Category</th>
            <th>Description</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Mileage</th>
            <th>Address</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {maintenance_records.map((mr, v) => (
            <MaintenanceRecordRow key={mr.id} vehicle={v} mr={mr} setMaintenanceRecords={setMaintenanceRecords} />
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default MaintenanceRecordTable;
