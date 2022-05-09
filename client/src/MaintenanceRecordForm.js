import React, { useState } from "react";

function MaintenanceRecordForm({ user, vehicle, maintenance_records, setMaintenanceRecords, currentVehicle }) {

  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [comment, setComment] = useState("")
  const [date, setDate] = useState("")
  const [mileage, setMilage] = useState("");
  const [address, setAddress] = useState("");
  const [cost, setCost] = useState("");
  const [errors, setErrors] = useState([]);

  function handleCreateMaintenanceRecord(e) {
    e.preventDefault();
    console.log(user)
    console.log(vehicle)
    console.log(maintenance_records)
    fetch(`users/${user.id}/vehicles/${vehicle.id}/maintenance_records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        description,
        comment,
        date,
        mileage,
        address,
        cost,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((maintenance_record) => {
            maintenance_records.push(maintenance_record)
          setMaintenanceRecords([...maintenance_records])
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
      <form onSubmit={handleCreateMaintenanceRecord}>
        <label>
            <h3>Add a Maintenance Record: {{currentVehicle}}</h3>
        <label>
          Category:
          <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </label>
        <label>
          Comment:
          <input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
        </label>
        <label>
          Date:
          <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        </label>
        <label>
          Mileage:
          <input type="text" name="mileage" pattern="[0-9]*" value={mileage} onChange={(e) =>
            setMilage((v) => (e.target.validity.valid ? e.target.value : v))
          } />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </label>
        <label>
          Cost:
          <input type="text" name="cost" value={cost} onChange={(e) => setCost(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  )
}

export default MaintenanceRecordForm;
