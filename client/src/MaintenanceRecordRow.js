import React from "react";

function MaintenanceRecordRow({ mr, maintenance_records, setMaintenanceRecords }) {

    return (
        <tr key={mr.id}>
            <td>{mr.id}</td>
            <td>{mr.description}</td>
            <td>{mr.comment}</td>
            <td>{mr.date}</td>
            <td>{mr.mileage}</td>
            <td>{mr.address}</td>
            <td>{mr.cost}</td>
            <td>
                <button onClick={(event) => setMaintenanceRecords(event, maintenance_records)}>View Maintenance Record</button>
            </td>
        </tr>
    )
}

export default MaintenanceRecordRow;
