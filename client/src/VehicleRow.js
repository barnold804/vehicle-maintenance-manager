import React, { useState } from "react";

function VehicleRow({ vehicle, handleDeleteVehicle }) {

    return (
        <tr key={vehicle.id}>
            <td>{vehicle.id}</td>
            <td>{vehicle.year}</td>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.mileage}</td>
            <td>
                <button onClick={(event) => handleDeleteVehicle(event, vehicle)}>Remove Vehicle</button>
            </td>
        </tr>
    )
}

export default VehicleRow;
