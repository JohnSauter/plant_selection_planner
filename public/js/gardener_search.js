const plantSearchForm = document.querySelector('#plant-search-form');

const searchFormHandler = (event) => {
  event.preventDefault();

  const hardiness = document.querySelector('#hardiness-zone').value;
  const habit = document.querySelector('#habit').value;
  const lifeCycle = document.querySelector('#life-cycle').value;
  const sunExposure = document.querySelector('#sun-exposure').value;
  const seasonOfInterest = document.querySelector('#season-of-interest').value;
  console.log(hardiness, habit, lifeCycle, sunExposure, seasonOfInterest);
};

plantSearchForm.addEventListener('submit', searchFormHandler);