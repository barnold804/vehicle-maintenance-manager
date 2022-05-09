import React, { useState } from "react";

function VehicleForm({ user, vehicles, setVehicles, currentVehicle }) {

  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [mileage, setMilage] = useState("")
  const [errors, setErrors] = useState([]);

  function handleCreateVehicle(e) {
    e.preventDefault();
    fetch(`users/${user.id}/vehicles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year,
        make,
        model,
        mileage,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((vehicle) => {
          vehicles.push(vehicle)
          setVehicles([...vehicles])
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      {errors.map((err) => (
        <h3
          key={err}
          style={{ display: "block", margin: "auto", marginTop: 10 }}
        >
          {err}
        </h3>
      ))}
        <h3>Add a Vehicle:</h3>
      <form onSubmit={handleCreateVehicle}>
        <label>
          Year:
          <input type="text" name="year" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
          Make:
          <input type="text" name="make" value={make} onChange={(e) => setMake(e.target.value)}/>
        </label>
        <label>
          Model:
          <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)}/>
        </label>
        <label>
          Mileage:
          <input type="text" name="mileage" pattern="[0-9]*" value={mileage} onChange={(e) =>
            setMilage((v) => (e.target.validity.valid ? e.target.value : v))
          } />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default VehicleForm;
