const plantSearchForm = document.querySelector('#plant-search-form');

const searchFormHandler = (event) => {
  event.preventDefault();

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

  console.log(hardiness, habit, lifeCycle, sunExposure, seasonOfInterest);
};

plantSearchForm.addEventListener('submit', searchFormHandler);