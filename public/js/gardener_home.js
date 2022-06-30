/* the email button */
const send_email = async () => {
  /* Tell the back end to email the selections to the
   * nursery manager.  */
  const response = await fetch('/gardener/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert ('email sent')
  } else {
    alert('Failed to send email');
  }
};

const send_email_btn = document.querySelector('#send-email');
if (send_email_btn) {
  send_email_btn.addEventListener('click', send_email);
}
