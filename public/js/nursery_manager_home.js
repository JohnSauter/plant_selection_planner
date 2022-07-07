// Elements
const plantPageBtn = document.querySelector("#add-plant-page");
const editPageForm = document.querySelector("#edit-plant-page");
const viewCustomerForm = document.querySelector("#view-customer-page");

const goToAddPlant = () => {
  window.location.replace("/nursery_manager/add_plant")
};

const goToEditPlant = (event) => {
  event.preventDefault();
  const plantID = document.querySelector("#plant-id").value;
  window.location.replace(`/nursery_manager/edit_plant/${plantID}`)
};

const goToCustomer = (event) => {
  event.preventDefault();
  const customerName = document.querySelector("#customer").value.trim();
  window.location.replace(`/nursery_manager/customer/${customerName}`);
}

// Event Listeners
plantPageBtn.addEventListener("click", goToAddPlant);
editPageForm.addEventListener("submit", goToEditPlant);
viewCustomerForm.addEventListener("submit", goToCustomer);

// /* the seed button */
// const seed_database = async () => {
//   /* Tell the back end to initialize the database. */
//   try {
//     const response = await fetch('/nursery_manager/api/seed', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       alert('Failed to seed database');
//       return;
//     }
//     window.location.replace('/');
//   } catch (err) {
//     alert('seed function failed');
//     console.log(err);
//   }
// };

// const seed_database_btn = document.querySelector('#seed-database');
// if (seed_database_btn) {
//   seed_database_btn.addEventListener('click', seed_database);
// }
