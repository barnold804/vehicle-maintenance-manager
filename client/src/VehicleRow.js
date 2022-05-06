import React, { useState } from "react";

function VehicleRow({ id, year, make, model, mileage }) {

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{year}</td>
            <td>{make}</td>
            <td>{model}</td>
            <td>{mileage}</td>
        </tr>
    )
}

export default VehicleRow;