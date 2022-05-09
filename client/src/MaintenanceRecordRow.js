import React from "react";

function MaintenanceRecordRow({ mr }) {

    return (
        <tr key={mr.id}>
            <td>{mr.id}</td>
            <td>{mr.category}</td>
            <td>{mr.description}</td>
            <td>{mr.comment}</td>
            <td>{mr.date}</td>
            <td>{mr.mileage}</td>
            <td>{mr.address}</td>
            <td>{mr.cost}</td>
        </tr>
    )
}

export default MaintenanceRecordRow;
