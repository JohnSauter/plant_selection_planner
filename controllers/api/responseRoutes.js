const router = require('express').Router();
const { Response, User, Topic } = require('../../models');
const withAuth = require('../../utils/auth');

/* Create a new response.  */
router.post('/', withAuth, async (req, res) => {
  try {
    const newResponse = await Response.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Delete a response.  */
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const response_id = req.params.id;
    const the_express_response = await Response.findByPk(response_id);
    if (!the_express_response) {
      res.status(404).json({ message: 'No response found with this id!' });
      return;
    }
    const the_response = the_express_response.get({plain: true});

    const topic_id = the_response.topic_id;
    if (!topic_id) {
      res.status(404).json({ message: 'No topic found for this response!' });
      return;
    }

    const responseData = await Response.destroy({
      where: {
        id: response_id,
        user_id: req.session.user_id
      },
    });

    if (!responseData) {
      res.status(404).json({ message: 'No response found with this id!' });
      return;
    }

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* edit a response */

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const response_id = req.params.id;
    const express_response_data = await Response.findByPk(response_id);
    if (!express_response_data) {
      res.status(404).end();
    }
    const response_data = express_response_data.get({ plain: true });

    const topic_id = response_data.topic_id;
    const express_topic_data = await Topic.findByPk(topic_id);
    const topic_data = express_topic_data.get({ plain: true });

    const user_id = req.session.user_id;
    if (user_id === null) {
      res.status(404).end();
    }
    const express_user_data = await User.findByPk(user_id, {
      include: [Response],
      attributes: { exclude: ['password'] },
    });
    if (express_user_data === null) {
      res.status(404).end();
    }
    const user_data = express_user_data.get({ plain: true });
    res.render('edit_response', {
      user: user_data,
      topic: topic_data,
      response: response_data,
      logged_in: req.session.logged_in,
      page_title: 'Modify Response',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Put to /api/response/<id> updates response <id>.  */

router.put('/:id', withAuth, async (req, res) => {
  try {
    const response_id = req.params.id;
    const express_response_data = await Response.findByPk(response_id);
    if (!express_response_data) {
      res.status(404).end();
    }
    const response_data = express_response_data.get({ plain: true });

    const subject = req.body.subject;
    const content = req.body.content;

    const user_id = req.session.user_id;
    if (user_id === null) {
      res.status(404).end();
    }
    const express_user_data = await User.findByPk(user_id, {
      include: [Response],
      attributes: { exclude: ['password'] },
    });
    if (express_user_data === null) {
      res.status(404).end();
    }
    const user_data = express_user_data.get({ plain: true });

    const result = await Response.update(
      { subject: subject, content: content, user_id: user_id },
      { where: { id: response_id } }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
