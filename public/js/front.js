/* the dashboard page */

/* Create a topic  */
const topic_create_form_handler = async (event) => {
  event.preventDefault();

  const subject = document.querySelector('#topic_subject').value.trim();
  const content = document.querySelector('#topic_content').value.trim();

  if (subject && content) {
    const response = await fetch('/api/topic', {
      method: 'POST',
      body: JSON.stringify({ subject, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      /* On success, refresh the dashboard to show the new topic.  */
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create topic.');
    }
  }
};

const topic_create_form = document.querySelector('#topic_create_form');
if (topic_create_form) {
  topic_create_form.addEventListener('submit', topic_create_form_handler);
}
