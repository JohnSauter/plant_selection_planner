/* Paths /user/api....  */

const router = require('express').Router();

const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* Sign up as a gardener.  */
router.post('/signup_as_gardener', async (req, res) => {
  try {
    /* Do some validation of the signup information.  */
    const password = req.body.password;
    if (password.length < 8) {
      res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long.' });
      return;
    }
    const email = req.body.email;
    if (!email) {
      res.status(400).json({ error: 'Email address is required.' });
      return;
    }
    const email_validator_1 = new RegExp('^\\S+@\\S+\\.\\S+$', 'u');
    if (!email_validator_1.test(email)) {
      res.status(400).json({ error: 'Email address must have @ and .' });
      return;
    }
    const email_validator_2 = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');
    if (!email_validator_2.test(email)) {
      res.status(400).json({ error: 'Email address must have only one @' });
      return;
    }
    const email_validator_3 =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email_validator_3.test(email)) {
      res
        .status(400)
        .json({
          error:
            'Email address must have at least two characters' +
            ' after the last dot.',
        });
      return;
    }
    const name = req.body.name;
    if (!name) {
      res.status(400).json({ error: 'Name may not be empty.' });
      return;
    }
    const name_validator = new RegExp('^\\p{L}[\\p{L}\\p{Nd}_ ]*$', 'u');
    if (!name_validator.test(name)) {
      res
        .status(400)
        .json({
          error:
            'Name must start with a letter' +
            ' and contain only letters, digits, underscores and spaces.',
        });
      return;
    }
    const other_user = await User.findAll({
      where: {name: name}
    });
    if (other_user.length > 0) {
      res
        .status(400)
        .json({
          error:
            'There is already somebody signed up' +
            ' under the name ' +
            name +
            '.',
        });
      return;
    }

    /* Since he is signing up, log him out if he was previously
     * logged in. */
    req.session.logged_in = false;

    const userData = await User.create({
      name: name,
      email: email,
      password: password,
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
    res.status(400).json({ error: 'Signup failed.', err: err });
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
