import React, { useEffect, useState } from "react";
import Select from 'react-select';

function VehicleForm({ user, vehicles, setVehicles, setCurrentVehicle }) {
  function range(start, end) {
    return Array.from(Array(end - start + 2).keys()).map((v) => v + start)
  }

  const CURRENT_YEAR = new Date().getFullYear();
  const AUTOMOBILE_YEARS = range(1888, CURRENT_YEAR)
    .map((year) => {
      return { value: year, label: year }
    })

  // Years
  const [selectedYear, setSelectedYear] = useState("")
  const [searchYear, setSearchYear] = useState("")
  // Makes
  const [allVehicleMakes, setAllVehicleMakes] = useState([])
  const [filteredVehicleMakes, setFilteredVehicleMakes] = useState([])
  const [searchMake, setSearchMake] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  // Models
  const [allVehicleModels, setAllVehicleModels] = useState([])
  const [filteredVehicleModels, setFilteredVehicleModels] = useState([])
  const [searchModel, setSearchModel] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  // Submission variables
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
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

  function translateMakeToOption(make) {
    return { value: make.Make_ID, label: make.Make_Name }
  }

  function translateModelToOption(model) {
    return { value: model.Model_ID, label: model.Model_Name }
  }

  // Fetch Makes
  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json")
      .then(response => {
        if (response.ok) {
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
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${selectedMake.value}/modelyear/${selectedYear.value}?format=json`)
      .then(response => {
        console.log(response)
        if (response.ok) {
          response.json().then((json) => {
            console.log(json)
            let results = json['Results'];
            let models = results.map(translateModelToOption);
            setAllVehicleModels(models)
            setFilteredVehicleModels(models.slice(0, 20))
          })
        } else {
          console.log("Fetch came back with non-200 status")
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

  function handleYearOnChange(selected) {
    setSelectedYear(selected)
    setYear(selected.value)
  }
  
  function handleMakeOnChange(selected) {
    setSelectedMake(selected)
    setMake(selected.label)
  }

  function handleModelOnChange(selected) {
    setSelectedModel(selected)
    setModel(selected.label)
  }

  return (
    (
      allVehicleMakes.length === 0 ?
        <div>Loading data...</div>
        :
        <div id="vehicle-form">
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
              <Select name="year"
                options={AUTOMOBILE_YEARS}
                value={selectedYear}
                onChange={handleYearOnChange}
                inputValue={searchYear}
                onInputChange={setSearchYear} />
            </label>
            {selectedYear &&
              <React.Fragment>
                <label>
                  Make:
                  <Select name="make"
                    options={filteredVehicleMakes}
                    value={selectedMake}
                    onChange={handleMakeOnChange}
                    inputValue={searchMake}
                    onInputChange={onMakeSearchInputChange}
                  />
                </label>
                {selectedMake &&
                  <React.Fragment>
                    <label>
                      Model:
                      <Select name="model"
                        options={filteredVehicleModels}
                        value={selectedModel}
                        onChange={handleModelOnChange}
                        inputValue={searchModel}
                        onInputChange={onModelSearchInputChange}
                      />
                    </label>
                    {selectedModel &&
                      <React.Fragment>
                        <label>
                          Mileage:
                          <input type="text" name="mileage" pattern="[0-9]*" value={mileage} onChange={(e) =>
                            setMileage((v) => (e.target.validity.valid ? e.target.value : v))}
                          />
                        </label>
                      </React.Fragment>
                    }
                    <input type="submit" value="Submit" />
                  </React.Fragment>
                }
              </React.Fragment>
            }
          </form>
        </div>
    )
  )
}

export default VehicleForm;