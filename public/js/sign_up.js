const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();
  const user_type = document.getElementById('signup-form').dataset.userType;

  const response = await fetch('/user/api/signup/' + user_type, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/user/home');
  } else {
    /* Extract the error message from the response.  */
    const the_message = await response.json();
    let message_text = the_message.error;
    const err = the_message.err;
    /* If the back end gets an error that it did not anticipate, 
     * include diagnostic information.  */
    if (err) {
      const err_text = JSON.stringify(err, null, 4);
      message_text = message_text + err_text;
    }
    const text_loc = document.getElementById('signup-failure-message');
    text_loc.innerHTML = message_text;

    $('#signup-failure').foundation('open');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
