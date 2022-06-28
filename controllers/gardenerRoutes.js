const router = require('express').Router();
const { Topic, Response, User } = require('../models');
const withAuth = require('../utils/auth');

// get one topic
router.get('/:id', async (req, res) => {
  // find a single topic by its `id`
  // be sure to include its associated User data
  try {
    const topic_id = req.params.id;
    const express_topic_data = await Topic.findByPk(topic_id, {
      include: [{ model: User }, { model: Response, include: [User] }],
    });
    if (express_topic_data === null) {
      res.status(404).end();
    } else {
      const topic_data = express_topic_data.get({ plain: true });

      res.render('show_topic', {
        topic: topic_data,
        logged_in: req.session.logged_in,
        page_title: 'Topic',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
