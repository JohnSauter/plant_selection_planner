/* The two sign up buttons that are displayed
on the front page.  */

const sign_up_as_gardener = () => {
  document.location.replace('/user/sign_up_as_gardener');
};

const sign_up_as_gardener_btn = document.querySelector('#signup-gardener');
if (sign_up_as_gardener_btn) {
  sign_up_as_gardener_btn.addEventListener('click', sign_up_as_gardener);
}

const sign_up_as_nursery_manager = () => {
  document.location.replace('/user/sign_up_as_nursery_manager');
};

const sign_up_as_nursery_manager_btn = document.querySelector(
  '#signup-nursery_manager'
);
if (sign_up_as_nursery_manager_btn) {
  sign_up_as_nursery_manager_btn.addEventListener(
    'click',
    sign_up_as_nursery_manager
  );
}

// Perform same as search.js but redirect to /search
const plantSearchFormFront = document.querySelector('#plant-search-form');
let searchCriteriaFront;

const searchFormHandlerFront = (event) => {
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

  localStorage.setItem("userSearch", JSON.stringify(searchCriteria));
  location.replace('/search');
};

plantSearchFormFront.addEventListener('submit', searchFormHandlerFront);
