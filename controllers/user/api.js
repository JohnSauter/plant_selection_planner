/* Paths of the form /user/api/...  */

const router = require('express').Router();

const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* Sign up as a gardener or nursery manager.  */
router.post('/signup/:userType', async (req, res) => {
  try {
    const user_type = req.params.userType;

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
      res.status(400).json({
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
      res.status(400).json({
        error:
          'Name must start with a letter' +
          ' and contain only letters, digits, underscores and spaces.',
      });
      return;
    }
    const other_user = await User.findAll({
      where: { name: name },
    });
    if (other_user.length > 0) {
      res.status(400).json({
        error:
          'There is already somebody signed up' +
          ' under the name ' +
          name +
          '.',
      });
      return;
    }

    const sequelize_user_data = await User.create({
      name: name,
      email: email,
      password: password,
      user_type: user_type,
    });

    const user_data = sequelize_user_data.get({ plain: true });
    req.session.user_id = user_data.id;
    req.session.username = user_data.name;
    req.session.logged_in = true;
    if (user_type == 'Gardener') {
      req.session.gardener = true;
      req.session.nursery_manager = false;
    }
    if (user_type == 'Nursery') {
      req.session.gardener = false;
      req.session.nursery_manager = true;
    }
    req.session.save();
    res.status(201).end();
  } catch (err) {
    req.session.logged_in = false;
    res.status(400).json({ error: 'Signup failed.', err: err });
  }
});

/* Log in a user */
router.post('/login', async (req, res) => {
  try {
    const sequelize_user_data = await User.findOne({
      where: { name: req.body.name },
    });

    if (!sequelize_user_data) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await sequelize_user_data.checkPassword(
      req.body.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const user_data = sequelize_user_data.get({ plain: true });

    /* Update the session.  */
    req.session.user_id = user_data.id;
    req.session.username = user_data.name;
    if (user_data.user_type == 'Gardener') {
      req.session.gardener = true;
      req.session.nursery_manager = false;
    }
    if (user_data.user_type == 'Nursery') {
      req.session.gardener = false;
      req.session.nursery_manager = true;
    }
    req.session.logged_in = true;
    req.session.save();
    res.status(200).end();
  } catch (err) {
    res.status(400).json({ message: 'login failure', err: err });
  }
});

/* Log out a user.  */
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.logged_in = false;
    req.session.gardener = false;
    req.session.nursery_manager = false;
    req.session.username = '';
    req.session.save();
    res.status(204).end();
    return;
  }
  res.status(404).end();
});

module.exports = router;
