import React, { useState } from "react";

function VehicleRow({ user, id, year, make, model, mileage }) {

    function handleDeleteClick() {
        fetch(`users/${user.id}/vehicles/${id}`, {
          method: "DELETE",
        })
        //   .then((r) => r.json())
          .then(() => console.log("vehicle deleted!"));
      }

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{year}</td>
            <td>{make}</td>
            <td>{model}</td>
            <td>{mileage}</td>
            <td>
                <button
                    onClick={handleDeleteClick}
                >
                    Remove Vehicle
                </button>
            </td>
        </tr>
    )
}

export default VehicleRow;