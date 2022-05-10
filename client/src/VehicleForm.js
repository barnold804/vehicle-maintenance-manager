import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';

function VehicleForm({ user, vehicles, setVehicles, setCurrentVehicle }) {

  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [mileage, setMileage] = useState("")
  const [errors, setErrors] = useState([]);
  const [vehicleMakeList, setVehicleMakeList] = useState([]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  function clearForm() {
      setYear("")
      setMake("")
      setModel("")
      setMileage("")
      setErrors([])
  }

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
          setCurrentVehicle(vehicle)
          clearForm()
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json").then((r) => {
      if (r.ok) {
        r.json().then((responseBodyJSON) => {
          let theResults = responseBodyJSON["Results"]
          // console.log(theResults)
          // console.log(responseBodyJSON)
          let resultArray = theResults.map(vm => ({value: vm.Make_Name, label: vm.Make_Name}))
          // console.log(resultArray)
          setVehicleMakeList(resultArray)
        });
      }
    });
  }, []);

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
          <Select 
            value={vehicleMakeList}
            options={vehicleMakeList}/>
          <input type="text" name="make" value={make} onChange={(e) => setMake(e.target.value)}/>
        </label>
        <label>
          Model:
          <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)}/>
        </label>
        <label>
          Mileage:
          <input type="text" name="mileage" pattern="[0-9]*" value={mileage} onChange={(e) =>
            setMileage((v) => (e.target.validity.valid ? e.target.value : v))
          } />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* <button onClick={getVehicleMakeList}>Get All Vehicle Makes</button> */}
    </div>
  )
}

export default VehicleForm;
