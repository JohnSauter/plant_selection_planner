// Elements
const removePlantBtns = document.querySelectorAll(".remove-plant-btn");
const removeAllPlantsBtn = document.querySelector("#remove-all-plants-btn");

// REMOVE PLANT(s) FROM COLLECTION
// Button Handler
const removePlantHandler = (event) => {
  event.preventDefault();
  // Identify the plant id of the button clicked
  plantID = event.target.attributes['data-plant-id'].value;
  const removedCheck = removePlantFromCollection(plantID)
  if (removedCheck) {
    event.target.classList.add("added-plant-button");
    event.target.innerText = "Removed!";
  }
};

//function to remove plant to gardener's collection
const removePlantFromCollection = async (plantID) => {
  if (plantID) {
    const requestBody = {"plantID": plantID};
    console.log(requestBody);
    const response = await fetch('/gardener/api/clear/one', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      console.log("Plant successfully removed from collection");
      return true
    } else {
      return false
    }
  }
};

const removeAllHandler = (event) => {
  event.preventDefault();
  const removedCheck = removeAllFromCollection()
  if (removedCheck) {
    event.target.classList.add("added-plant-button");
    event.target.innerText = "Removed!";
  }
};

//function to remove all plants from a collection
const removeAllFromCollection = async () => {
  const response = await fetch('/gardener/api/clear/all', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
  });
  if (response.ok) {
    console.log("Plants successfully removed from collection");
    return true
  } else {
    return false
  }
};

// event listener
removePlantBtns.forEach(button => {
  button.addEventListener('click', removePlantHandler);
});
removeAllPlantsBtn.addEventListener('click', removeAllHandler);

/* the email button */
const send_email = async () => {
  /* Tell the back end to email the selections to the
   * nursery manager.  */
  try {
    const response = await fetch('/gardener/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    /* Extract the message from the response.  */
    const the_message = await response.json();
    let message_text = the_message.message;
    const err = the_message.err;
    /* If the back end gets an error that it did not anticipate,
     * include diagnostic information.  */
    if (err) {
      const err_text = JSON.stringify(err, null, 4);
      message_text = message_text + err_text;
    }
    const text_loc = document.getElementById('email-response-message');
    text_loc.innerHTML = message_text;

    $('#email-response').foundation('open');
  } catch (err) {
    alert('email function failed');
  }
};

const send_email_btn = document.querySelector('#send-email');
if (send_email_btn) {
  send_email_btn.addEventListener('click', send_email);
}

