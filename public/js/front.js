/* the logout button */
const logout = async () => {
  /* Tell the back end to log out the user who is
   * on this session.  */
  const response = await fetch('/user/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    /* Display the front page.  */
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

const logout_btn = document.querySelector('#logout');
if (logout_btn) {
  logout_btn.addEventListener('click', logout);
}

/* The login button */
const login = () => {
  document.location.replace('/user/login');
};

const login_btn = document.querySelector('#login');
if (login_btn) {
  login_btn.addEventListener('click', login);
}

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
