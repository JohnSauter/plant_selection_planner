// Existing Elements
const plantSearchForm = document.querySelector('#plant-search-form');
const resultsHeading = document.querySelector('#results-heading');
const resultsContainer = document.querySelector('#results-container');
let addPlant;

// Global Variables
let searchCriteria;

// Form/Button Handlers
const searchFormHandler = (event) => {
  event.preventDefault();

  // Collect values from search form
  const hardiness = document.querySelector('#hardiness-zone').value;
  const habit = document.querySelector('#habit').value;
  const lifeCycle = document.querySelector('#life-cycle').value;
  const sunExposure = {
    fullSun: document.querySelector('#full-sun').checked,
    partSun: document.querySelector('#part-sun').checked,
    partShade: document.querySelector('#part-shade').checked,
    fullShade: document.querySelector('#full-shade').checked
  };
  const seasonOfInterest = {
    earlySpring: document.querySelector('#early-spring').checked,
    midSpring: document.querySelector('#mid-spring').checked,
    lateSpring: document.querySelector('#late-spring').checked,
    earlySummer: document.querySelector('#early-summer').checked,
    midSummer: document.querySelector('#mid-summer').checked,
    lateSummer: document.querySelector('#late-summer').checked,
    fall: document.querySelector('#fall').checked,
    winter: document.querySelector('#winter').checked
    
  }

  // Consolidate search values into a single object
  searchCriteria = {
    hardiness,
    habit,
    lifeCycle,
    sunExposure,
    seasonOfInterest
  };

  // Send form data to server for server to query database and render results on page
  findPlants(searchCriteria);
};

//const addPlantHandler = (event) => {
//function to add plant to gardener's collection if they are logged in/take them to their home page or the signup page
//}

// Fetch function within form handler
const findPlants = async (criteria) => {
  if (criteria) {
    const response = await fetch('/search/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ criteria }),
    });
    
    if (response.ok) {
      const data = await response.json();
    

      renderResults(data);
    } else {
      console.log("No data")
    }
  }
};

// Function to dynamically display search results on page
const renderResults = (data) => {
  resultsHeading.innerText = "Results";

  let results = "";

  if (data) {
    data.forEach(plant => {
      // Gather sun exposure and season of interest for each plant into arrays for later display
      const sunExposureArray = ["full_sun", "part_sun", "part_shade", "full_shade"];
      let sunExposureTrues = []
      const seasonOfInterestArray = ["early_spring", "mid_spring", "late_spring", "early_summer", "mid_summer", "late_summer", "fall", "winter"];
      let seasonOfInterestTrues = []

      sunExposureArray.forEach(item => {
        console.log(item)
        console.log(plant)
        console.log(plant.item)
        console.log(plant.full_sun)
        if (plant.item) {
          console.log(plant.item)
          sunExposureTrues.push(item)
        };
      });

      seasonOfInterestArray.forEach(item => {
        if (plant.item) {
          seasonOfInterestTrues.push(item)
        };
      });    

      results += `
      <div class="cell columns small-12 large-3 plant-card">
        <div class="card plant-card">
          <div class="card-section plant-card">
            <div class="card-divider">
              <h4>${plant.plant_name}</h4>
            </div>
            <p>${plant.description}</p>
            <p>Life cycle: ${plant.life_cycle}</p>
            <p>Habit: ${plant.habit}</p>
            <p>Hardiness zone: ${plant.hardiness_zone_lower}-${plant.hardiness_zone_upper}</p>
            <p>Sun Exposure: ${sunExposureTrues[0]} - ${sunExposureTrues.slice(-1)[0]}</p>
            <p>Sun Exposure: ${seasonOfInterestTrues[0]} - ${seasonOfInterestTrues.slice(-1)[0]}</p>
            <button class='button' id='add-plant'>Add to collection</button>
          </div>
        </div>
      </div>
      `
    });

    resultsContainer.innerHTML = results;
    addPlant = document.querySelector("#add-plant");
  } else {
    resultsHeading.innerText = "Results";
    resultsContainer.innerText = "No plants found matching those criteria";
  };
};

// Event listeners
plantSearchForm.addEventListener('submit', searchFormHandler);
addPlant.addEventListener('click', addPlantHandler);
