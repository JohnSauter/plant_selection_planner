/* Edit a response */

/* Modify the response */

async function response_edit_form_handler(event) {
  event.preventDefault();
  const the_button = event.target;
  const response_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (response_id == null) {
    return;
  }

  const subject = document.querySelector('#response-subject').value.trim();
  const content = document.querySelector('#response-content').value.trim();

  const response = await fetch('/api/response/' + response_id, {
    method: 'PUT',
    body: JSON.stringify({ subject, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    /* On success, refresh the responnse to show that
     * it has been updated.  */
    document.location.replace('/response/' + response_id);
  } else {
    alert('Failed to update response.');
  }
}

const edit_response = document.querySelector('#edit-response');
if (edit_response) {
  edit_response.addEventListener('click', response_edit_form_handler);
}
