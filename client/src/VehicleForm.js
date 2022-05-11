import React, {useEffect, useState} from "react";
import Select from 'react-select';

function VehicleForm({user, vehicles, setVehicles, setCurrentVehicle}) {
  function range(start, end) {
    return Array.from(Array(end - start + 2).keys()).map((v) => v + start)
  }

  const CURRENT_YEAR = new Date().getFullYear();
  const AUTOMOBILE_YEARS = range(1888, CURRENT_YEAR)
    .map((year) => {
      return {value: year, label: year}
    })

  // Years!
  const [selectedYear, setSelectedYear] = useState("")
  const [searchYear, setSearchYear] = useState("")
  // Might not need?
  const [year, setYear] = useState("")

  // Makes!
  const [allVehicleMakes, setAllVehicleMakes] = useState([])
  const [filteredVehicleMakes, setFilteredVehicleMakes] = useState([])
  const [searchMake, setSearchMake] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  // Models!
  const [allVehicleModels, setAllVehicleModels] = useState([])
  const [filteredVehicleModels, setFilteredVehicleModels] = useState([])
  const [searchModel, setSearchModel] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  // Might not need?
  const [make, setMake] = useState("")
  // TBD
  const [model, setModel] = useState("")
  const [mileage, setMileage] = useState("")
  const [errors, setErrors] = useState([]);

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
        year,   // this may break
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

  function translateMakeToOption(make) {
    return {value: make.Make_ID, label: make.Make_Name}
  }

  function translateModelToOption(model) {
    return {value: model.Model_ID, label: model.Model_Name}
  }

  // Fetch Makes
  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json")
      .then(response => {
        if(response.ok) {
          response.json().then((json) => {
            let results = json['Results'];
            let makes = results.map(translateMakeToOption);
            setAllVehicleMakes(makes)
            setFilteredVehicleMakes(makes.slice(0, 20))
          })  
        } else {
          console.log("Fetch came back with non-200 status")
        }
      })
  }, []);

  // Fetch Models
  useEffect(() => {
    // if(selectedMake("")) {
    //   console.log("Models not fetched because no make has been selected")
    // } else 
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`)
      .then(response => {
        if(response.ok) {
          response.json().then((json) => {
            let results = json['Results'];
            let models = results.map(translateModelToOption);
            setAllVehicleModels(models)
            setFilteredVehicleMakes(models.slice(0, 20))
          })  
        } else {
          console.log("Fetch came back with non-200 status")
          console.log(response)
        }
      })
  }, [selectedMake]);
  
  function onMakeSearchInputChange(searchTerm) {
    setSearchMake(searchTerm)
    let filteredMakes = allVehicleMakes.filter(make => {
      return make.label.toLowerCase().includes(searchTerm.toLowerCase())
    }).slice(0, 25)
    setFilteredVehicleMakes(filteredMakes)
  }

  function onModelSearchInputChange(searchTerm) {
    setSearchModel(searchTerm)
    let filteredModels = allVehicleModels.filter(model => {
      return model.label.toLowerCase().includes(searchTerm.toLowerCase())
    }).slice(0, 25)
    setFilteredVehicleModels(filteredModels)
  }

  return (
    (
      allVehicleMakes.length === 0 ?
        <div>Loading data...</div>
        :
        <div>
          {errors.map((err) => (
            <h3
              key={err}
              style={{display: "block", margin: "auto", marginTop: 10}}
            >
              {err}
            </h3>
          ))}
          <h3>Add a Vehicle:</h3>
          <form onSubmit={handleCreateVehicle}>
            <label>
              Year:
              <Select name="year"
                      options={AUTOMOBILE_YEARS}
                      value={selectedYear}
                      onChange={setSelectedYear}
                      inputValue={searchYear}
                      onInputChange={setSearchYear}/>
            </label>
            <label>
              Make:
              <Select name="make"
                      options={filteredVehicleMakes}
                      value={selectedMake}
                      onChange={setSelectedMake}
                      inputValue={searchMake}
                      onInputChange={onMakeSearchInputChange}
              />
            </label>
            <label>
              Model:
              <Select name="model"
                      options={filteredVehicleModels}
                      value={selectedModel}
                      onChange={setSelectedModel}
                      inputValue={searchModel}
                      onInputChange={onModelSearchInputChange}
              />
            </label>
            <label>
              Mileage:
              <input type="text" name="mileage" pattern="[0-9]*" value={mileage} onChange={(e) =>
                  setMileage((v) => (e.target.validity.valid ? e.target.value : v)) }
              />
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
    )
  )
}

export default VehicleForm;