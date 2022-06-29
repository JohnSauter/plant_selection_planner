const loginFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    const response = await fetch('/user/api/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      /* Take the browser to either the gardener or the
       * nursery manager home page, depending on the
       * type of the user.  */
      document.location.replace('/user/home');
    } else {
      alert('Failed to log in.');
    }
  }
};


document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);


