/* Show a response.  */

/* Delete the response */

async function response_delete_handler(event) {
  const the_button = event.target;
  const response_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (response_id == null) {
    return;
  }
  const topic_id = the_button.dataset.topicId;

  const response = await fetch('/api/response/' + response_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    /* On success, return to the topic page
     * to show that the response is no longer present.
     */
    document.location.replace('/topic/' + topic_id);
  } else {
    alert('Failed to delete response.');
  }
}

const response_delete = document.querySelector('#response-delete');
if (response_delete) {
  response_delete.addEventListener('click', response_delete_handler);
}

/* Edit the response */

function response_edit_handler(event) {
  event.preventDefault();
  const the_button = event.target;
  const response_id = the_button.dataset.id;
  /* If there is no data-id on the target
   * we must be seeing a click
   * from somewhere else in the page.  Ignore it.
   */
  if (response_id == null) {
    return;
  }

  /* Use a different page to perform the edit.  */
  document.location.replace('/api/response/edit/' + response_id);
}

const response_edit = document.querySelector('#response-edit');
if (response_edit) {
  response_edit.addEventListener('click', response_edit_handler);
}
