// Existing Elements
const newPlantForm = document.querySelector('#new-plant-form');

// NEW PLANT FORM
// Form Handler
const newPlantFormHandler = (event) => {
  event.preventDefault();
// Collect values from search form
  const plant_name = document.querySelector('#plant-name').value.trim();
  const description = document.querySelector('#plant-desc').value.trim();
  const hardiness_zone_lower = document.querySelector('#hardiness-zone-lower').value;
  const hardiness_zone_upper = document.querySelector('#hardiness-zone-upper').value;
  const habit = document.querySelector('#habit').value;
  const life_cycle = document.querySelector('#life-cycle').value;
  const full_sun = document.querySelector('#full-sun').checked;
  const part_sun = document.querySelector('#part-sun').checked;
  const part_shade = document.querySelector('#part-shade').checked;
  const full_shade = document.querySelector('#full-shade').checked;
  const early_spring = document.querySelector('#early-spring').checked;
  const mid_spring = document.querySelector('#mid-spring').checked;
  const late_spring = document.querySelector('#late-spring').checked;
  const early_summer = document.querySelector('#early-summer').checked;
  const mid_summer = document.querySelector('#mid-summer').checked;
  const late_summer = document.querySelector('#late-summer').checked;
  const fall = document.querySelector('#fall').checked;
  const winter = document.querySelector('#winter').checked;
  // Consolidate search values into a single object
  const plantCriteria = {
    plant_name,
    description,
    hardiness_zone_lower,
    hardiness_zone_upper,
    habit,
    life_cycle,
    full_sun,
    part_sun,
    part_shade,
    full_shade,
    early_spring,
    mid_spring,
    late_spring,
    early_summer,
    mid_summer,
    late_summer,
    fall,
    winter
  };

  // Send form data to server for server to query database and render results on page
  newPlant(plantCriteria);
};

// Functions within form handler
// Fetch function to find plants based on search criteria
const newPlant = async (criteria) => {
  if (criteria) {
    const response = await fetch('/nursery_manager/api/plant_type', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ criteria }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("No data")
    }
  }
};

// Event listener
newPlantForm.addEventListener('submit', newPlantFormHandler);