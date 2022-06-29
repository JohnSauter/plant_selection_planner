/* Paths /user/api....  */

const router = require('express').Router();

const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../Models');
const withAuth = require('../../utils/auth');

/* Sign up as a gardener.  */
router.post('/signup_as_gardener', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      user_type: 'Gardener',
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.gardener = true;
      req.session.nursery_manager = false;

      res.status(201).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* Sign up as a nursery manager.  */
router.post('/signup_as_nursery_manager', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      user_type: 'Nursery',
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.gardener = false;
      req.session.nursery_manager = true;

      res.status(201).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* Log in a user */
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { name: req.body.name },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    /* The session keeps track of whether this is a gardener
     * or a nursery manager.  */
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      if (userData.user_type == 'Gardener') {
        req.session.gardener = true;
      } else {
        req.session.gardener = false;
      }

      if (userData.user_type == 'Nursery') {
        req.session.nursery_manager = true;
      } else {
        req.session.nursery_manager = false;
      }

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Log out a user.  By destroyinng his session
 * we erase the loggedIn variable.  */
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
