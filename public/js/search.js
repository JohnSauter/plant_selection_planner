// Existing Elements
const plantSearchForm = document.querySelector('#plant-search-form');
const resultsHeading = document.querySelector('#results-heading');
const resultsContainer = document.querySelector('#results-container');
let addPlantBtns;

// Global Variables
let searchCriteria;


// SEARCH FORM/RESULTS DISPLAY
// Form Handler
const searchFormHandler = (event) => {
  event.preventDefault();
// Collect values from search form
  const hardiness = document.querySelector('#hardiness-zone').value;
  const habit = document.querySelector('#habit').value;
  const lifeCycle = document.querySelector('#life-cycle').value;
  const sunExposure = {
    full_sun: document.querySelector('#full-sun').checked,
    part_sun: document.querySelector('#part-sun').checked,
    part_shade: document.querySelector('#part-shade').checked,
    full_shade: document.querySelector('#full-shade').checked
  };
  const seasonOfInterest = {
    early_spring: document.querySelector('#early-spring').checked,
    mid_spring: document.querySelector('#mid-spring').checked,
    late_spring: document.querySelector('#late-spring').checked,
    early_summer: document.querySelector('#early-summer').checked,
    mid_summer: document.querySelector('#mid-summer').checked,
    late_summer: document.querySelector('#late-summer').checked,
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
  console.log(searchCriteria)
  // Send form data to server for server to query database and render results on page
  findPlants(searchCriteria);
};

// Functions within form handler
// Fetch function to find plants based on search criteria
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

const snakeToSentence = (snake) => snake.split("_").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");

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
        if (plant[item]) {
          sunExposureTrues.push(snakeToSentence(item))
        };
      });
      seasonOfInterestArray.forEach(item => {
        if (plant[item]) {
          seasonOfInterestTrues.push(snakeToSentence(item))
        };
      });

      // Capture sun exposure and season of interest ranges depending on whether there are 1 or more
      let sunExposureRange = "";
      let seasonOfInterestRange = "";
      if (sunExposureTrues.length > 1) {
        sunExposureRange = sunExposureTrues[0] + " to " + sunExposureTrues.slice(-1)[0];
      } else {
        sunExposureRange = sunExposureTrues[0];
      };
      if (seasonOfInterestTrues.length > 1) {
        seasonOfInterestRange = seasonOfInterestTrues[0] + " to " + seasonOfInterestTrues.slice(-1)[0];
      } else {
        seasonOfInterestRange = seasonOfInterestTrues[0];
      };
      //add new card to results
      results += `
      <div class="cell columns small-12 large-4 plant-card">
        <div class="card plant-card">
          <div class="card-section plant-card">
            <div class="card-divider">
              <h4>${plant.plant_name}</h4>
            </div>
            <p>${plant.description}</p>
            <p>Life cycle: ${snakeToSentence(plant.life_cycle)}</p>
            <p>Habit: ${snakeToSentence(plant.habit)}</p>
            <p>Hardiness zone: ${plant.hardiness_zone_lower}-${plant.hardiness_zone_upper}</p>
            <p>Sun Exposure: ${sunExposureRange}</p>
            <p>Season of Interest: ${seasonOfInterestRange}</p>
            <button class='button add-plant' data-plant-id="${plant.id}">Add to collection</button>
          </div>
        </div>
      </div>
      `
    });
    //display resultts in resultsContainer
    resultsContainer.innerHTML = results;
    //grab the add plant buttons
    addPlantBtns = document.querySelectorAll(".add-plant");
    //add event listener to the add plant buttons
    addPlantBtns.forEach(button => {
      button.addEventListener('click', addPlantHandler);
    });
  } else {
    resultsHeading.innerText = "Results";
    resultsContainer.innerText = "No plants found matching those criteria";
  };
};

// Event listener
plantSearchForm.addEventListener('submit', searchFormHandler);


// ADD PLANT TO COLLECTION
// Button Handler
const addPlantHandler = (event) => {
  event.preventDefault();
  // Identify the plant id of the button clicked
  plantID = event.target.attributes['data-plant-id'].value;
  const addedCheck = addPlantToCollection(plantID)
  if (addedCheck) {
    event.target.classList.add("added-plant-button");
    event.target.innerText = "Added!"
  }
}

//function to add plant to gardener's collection if they are logged in/prompt them to sign up if they are not
const addPlantToCollection = async (plantID) => {
  if (plantID) {
    const requestBody = {"plantID": plantID};
    console.log(requestBody);
    const response = await fetch('/gardener/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      console.log("Plant successfully added to collection");
      return true
    } else {
      window.alert("Please login or sign up to add plants to your collection!")
      console.log("Plant not added");
      return false
    }
  }
};

// Check if coming from front page
if (localStorage.getItem("userSearch")) {
  searchCriteria = JSON.parse(localStorage.getItem("userSearch"));
  console.log(searchCriteria);
  localStorage.removeItem("userSearch");
  findPlants(searchCriteria);
};
