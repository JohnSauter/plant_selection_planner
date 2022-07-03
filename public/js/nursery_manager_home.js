/* the seed button */
const seed_database = async () => {
  /* Tell the back end to initialize the database. */
  try {
    const response = await fetch('/nursery_manager/api/seed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      alert('Failed to seed database');
      return;
    }
    window.location.replace('/');
  } catch (err) {
    alert('seed function failed');
    console.log(err);
  }
};

const seed_database_btn = document.querySelector('#seed-database');
if (seed_database_btn) {
  seed_database_btn.addEventListener('click', seed_database);
}
