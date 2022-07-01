const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/user/api/signup_as_gardener', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/gardener/home');
    } else {
      /* Extract the error message from the response.  */
      let the_string = '';
      let utf8decoder = new TextDecoder();
      const reader = response.body.getReader();
      for await (const chunk of readChunks(reader)) {
        const string_chunk = utf8decoder.decode(chunk);
        the_string = the_string + string_chunk;
      }
      const the_message = JSON.parse(the_string);
      let message_text = the_message.error;
      const err = the_message.err;
      if (err) {
        const err_text = JSON.stringify(err, null, 4);
        message_text = message_text + err_text;
      }
      const text_loc = document.getElementById('signup-failure-message');
      text_loc.innerHTML = message_text;

      $('#signup-failure').foundation('open');
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);

// readChunks() reads from the provided reader and yields the results into an async iterable
function readChunks(reader) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield readResult.value;
        readResult = await reader.read();
      }
    },
  };
}
