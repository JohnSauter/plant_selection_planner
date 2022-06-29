/* The two sign up buttons that are displayed
on the front page.  */

const sign_up_as_gardener = () => {
  document.location.replace('/user/sign_up_as_gardener');
};

const sign_up_as_gardener_btn = document.querySelector('#signup-gardener');
if (sign_up_as_gardener_btn) {
  sign_up_as_gardener_btn.addEventListener('click', sign_up_as_gardener);
}

const sign_up_as_nursery_manager = () => {
  document.location.replace('/user/sign_up_as_nursery_manager');
};

const sign_up_as_nursery_manager_btn = document.querySelector(
  '#signup-nursery_manager'
);
if (sign_up_as_nursery_manager_btn) {
  sign_up_as_nursery_manager_btn.addEventListener(
    'click',
    sign_up_as_nursery_manager
  );
}
