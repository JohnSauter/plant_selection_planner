/* Format a date as just the time.  */
const format_time = (date) => {
  return date.toLocaleTimeString();
};

/* Format a date as mm/dd/yyyy.  */
const format_date = (date) => {
  const the_date = date;
  const the_month = the_date.getMonth();
  const the_mday = the_date.getDate();
  const the_year = the_date.getFullYear();
 
  const result = String(the_month+1) + "/" +
  String(the_mday) + "/" + String(the_year);
return result;
};

// convert snake case to sentence case
const snakeToSentence = (snake) => snake.split("_").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");

const convertToRange = (array) => {
  array.forEach(plant => {
    plant.plant_type.sunExposureRange = "";
    plant.plant_type.seasonOfInterestRange = "";
    // Gather sun exposure and season of interest for each plant into arrays for later display
    const sunExposureArray = ["full_sun", "part_sun", "part_shade", "full_shade"];
    let sunExposureTrues = []
    const seasonOfInterestArray = ["early_spring", "mid_spring", "late_spring", "early_summer", "mid_summer", "late_summer", "fall", "winter"];
    let seasonOfInterestTrues = []
    sunExposureArray.forEach(item => {
      if (plant.plant_type[item]) {
        sunExposureTrues.push(snakeToSentence(item))
      };
    });
    seasonOfInterestArray.forEach(item => {
      if (plant.plant_type[item]) {
        seasonOfInterestTrues.push(snakeToSentence(item))
      };
    });

    // Capture sun exposure and season of interest ranges depending on whether there are 1 or more
    if (sunExposureTrues.length > 1) {
      plant.plant_type.sunExposureRange = sunExposureTrues[0] + " to " + sunExposureTrues.slice(-1)[0];
    } else {
      plant.plant_type.sunExposureRange = sunExposureTrues[0];
    };
    if (seasonOfInterestTrues.length > 1) {
      plant.plant_type.seasonOfInterestRange = seasonOfInterestTrues[0] + " to " + seasonOfInterestTrues.slice(-1)[0];
    } else {
      plant.plant_type.seasonOfInterestRange = seasonOfInterestTrues[0];
    };
  });
};

module.exports = {format_time, format_date, snakeToSentence, convertToRange };