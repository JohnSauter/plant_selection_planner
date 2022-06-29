/* the home button */

/* If the user is logged in, take him to his home page.
 * If not, take him to the front page.  */

const home = async () => {
  document.location.replace('/user/home');
};

const home_btn = document.querySelector('#home');
if (home_btn) {
  home_btn.addEventListener('click', home);
};

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
