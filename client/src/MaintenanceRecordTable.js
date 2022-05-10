import React from "react";
import MaintenanceRecordRow from "./MaintenanceRecordRow";

function MaintenanceRecordTable({ maintenance_records, currentVehicle }) {

    if (!currentVehicle) {
        return (
            <div>
                <h2>Maintenance Records</h2>
                <div>The Vehicle you selected has no Maintenance Records</div>
            </div>
        )
    }

    if (maintenance_records.length === 0) {
        return (
            <div>
                <h2>Maintenance Records</h2>
                <div>The Vehicle you selected has no Maintenance Records</div>
            </div>
        )
    }

    return (
        <div>
            <h2>Maintenance Records</h2>
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
                    {maintenance_records.map((mr) => (<MaintenanceRecordRow key={mr.id} mr={mr} />))}
                </tbody>
            </table>
        </div>
    )
}

export default MaintenanceRecordTable;
