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
