/* Show a topic.  */

/* Delete the topic */

async function topic_delete_handler(event) {
  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (topic_id == null) {
    return;
  }

  const response = await fetch('/api/topic/' + topic_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    /* On success, return to the  dashboard to show that the topic
     * is no longer present.  */
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete topic.');
  }
}

const topic_delete = document.querySelector('#topic-delete');
if (topic_delete) {
  topic_delete.addEventListener('click', topic_delete_handler);
}

/* Edit the topic */

function topic_edit_handler(event) {
  event.preventDefault();
  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  /* If there is no data-id on the target
   * we must be seeing a click
   * from somewhere else in the page.  Ignore it.
   */
  if (topic_id == null) {
    return;
  }

  /* Use a different page to perform the edit.  */
  document.location.replace('/api/topic/edit/' + topic_id);
}

const topic_edit = document.querySelector('#topic-edit');
if (topic_edit) {
  topic_edit.addEventListener('click', topic_edit_handler);
}

/* Create a response.  */

const response_create_form_handler = async (event) => {
  event.preventDefault();

  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  /* If there is no data-id on the target
   * we must be seeing a click
   * from somewhere else in the page.  Ignore it.
   */
  if (topic_id == null) {
    return;
  }
  const subject = document.querySelector('#response-subject').value.trim();
  const content = document.querySelector('#response-content').value.trim();

  if (subject && content) {
    const response = await fetch('/api/response', {
      method: 'POST',
      body: JSON.stringify({ subject, content, topic_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      /* On success, refresh the topic to show the new response.  */
      document.location.replace('/topic/' + topic_id);
    } else {
      alert('Failed to create response.');
    }
  }
};

const response_create_form = document.querySelector('#response-create-form');
if (response_create_form) {
  response_create_form.addEventListener('submit', response_create_form_handler);
}

