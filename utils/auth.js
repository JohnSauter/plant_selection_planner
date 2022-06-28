const withAuth = (req, res, next) => {
  /* If the user has not logged in, send his browser
   * to the login page; otherwise let the route proceed.
   */
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
