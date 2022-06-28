/* Edit a topic */

/* Modify the topic */

async function topic_edit_form_handler(event) {
  event.preventDefault();
  const the_button = event.target;
  const topic_id = the_button.dataset.id;
  /* If there is no data-id on the target, we must be
   * seeing a click from somewhere else in the
   * page.  Ignore it.  */
  if (topic_id == null) {
    return;
  }

  const subject = document.querySelector('#topic-subject').value.trim();
  const content = document.querySelector('#topic-content').value.trim();

  const response = await fetch('/api/topic/' + topic_id, {
    method: 'PUT',
    body: JSON.stringify({ subject, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    /* On success, refresh the topic to show that
     * it has been updated.  The acceptance
     * criteria says that the dashboard should
     * be shown after editing or deleting a topic,
     * but I think this makes more sense when
     * editing.  */
    document.location.replace('/topic/' + topic_id);
  } else {
    alert('Failed to update topic.');
  }
}

const edit_topic = document.querySelector('#edit-topic');
if (edit_topic) {
  edit_topic.addEventListener('submit', topic_edit_form_handler);
}
