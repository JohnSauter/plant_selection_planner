const router = require('express').Router();
const { Topic, Response, User } = require('../models');
const withAuth = require('../utils/auth');

// get one response
router.get('/:id', withAuth, async (req, res) => {
  // find a single response by its `id`
  // be sure to include its associated User data
  try {
    const response_id = req.params.id;
    const express_response_data = await Response.findByPk(response_id, {
      include: [{ model: User }, { model: Topic, include: [User] }],
    });
    if (express_response_data === null) {
      res.status(404).end();
    } else {
      const response_data = express_response_data.get({ plain: true });
      const topic_id = response_data.topic_id;

      res.render('show_response', {
        response: response_data,
        logged_in: req.session.logged_in,
        page_title: 'Response',
        page_topic_id: topic_id,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
