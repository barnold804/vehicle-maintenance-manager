import React from "react";

function VehicleRow({ vehicle, user, handleDeleteVehicle, setCurrentVehicle, maintenance_records, setMaintenanceRecords }) {
    function handleMaintenanceRecordLoad(event, maintenance_record) {
        fetch(`users/${user.id}/vehicles/${vehicle.id}/maintenance_records`, {
        }).then((r) => {
            r.json().then((a) => {
                setCurrentVehicle(vehicle)
                setMaintenanceRecords(a)
            })
            // setMaintenanceRecords(r.filter(v => v.id !== maintenance_record.id))
        }).catch((err) => {
            console.log(`Error fetching matintenance record ${JSON.stringify(err)}`)
        })
    }

    return (
        <tr key={vehicle.id} id="v-row">
            {/* <td>{vehicle.id}</td> */}
            <td>{vehicle.year}</td>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.mileage}</td>
            <td>
                <button onClick={(event) => handleDeleteVehicle(event, vehicle)}>Remove Vehicle</button>
                <button onClick={(event) => handleMaintenanceRecordLoad(event, setCurrentVehicle, maintenance_records)}>View Maintenance Records</button>
            </td>
        </tr>
    )
}

export default VehicleRow;
