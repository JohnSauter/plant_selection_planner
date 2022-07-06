/* the home button */

// Plant Selection Planner button brings user to front page regardless of login status. My Collection/My Nursery button will bring user to their user page depending on user type.

const home = async () => {
  document.location.replace('/');
};

const home_btn = document.querySelector('#home');
if (home_btn) {
  home_btn.addEventListener('click', home);
};

/* the my collection button */
// if the user is logged in, this button is displayed and will take them to their user page
const myCollectionBtn = document.querySelector('#my-collection');

const myCollectionPage = async () => {
  document.location.replace('/user/home');
}

if (myCollectionBtn) {
  myCollectionBtn.addEventListener('click', myCollectionPage)
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

/* Make sure the Foundation JavaScript is running.  */
$(document).foundation();