const router = require('express').Router();
const { Topic, User } = require('../../models');
const withAuth = require('../../utils/auth');

/* Post to /api/topic creates a new topic.  */
router.post('/', withAuth, async (req, res) => {
  try {
    const newTopic = await Topic.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newTopic);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Delete to /api/topic/<id> deletes topic <id>.  */
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const topic_id = req.params.id;
    const the_express_topic = await Topic.findByPk(topic_id);
    if (!the_express_topic) {
      res.status(404).json({ message: 'No topic found with this id!' });
      return;
    }
    const the_topic = the_express_topic.get({plain: true});

    const topicData = await Topic.destroy({
      where: {
        id: topic_id,
        user_id: req.session.user_id,
      },
    });

    if (!topicData) {
      res.status(404).json({ message: 'No topic found with this id!' });
      return;
    }

    res.status(200).json(topicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get to /api/topic/edit/<id> loads the edit page
 * for topic <id>.  */
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const topic_id = req.params.id;
    const express_topic_data = await Topic.findByPk(topic_id);
    if (!express_topic_data) {
      res.status(404).end();
    }
    const topic_data = express_topic_data.get({ plain: true });

    const user_id = req.session.user_id;
    if (user_id === null) {
      res.status(404).end();
    }
    const express_user_data = await User.findByPk(user_id, {
      include: [Topic],
      attributes: { exclude: ['password'] },
    });
    if (express_user_data === null) {
      res.status(404).end();
    }
    const user_data = express_user_data.get({ plain: true });
    res.render('edit_topic', {
      user: user_data,
      topic: topic_data,
      logged_in: req.session.logged_in,
      page_title: 'Modify Topic',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Put to /api/topic/<id> updates topic <id>.  */

router.put('/:id', withAuth, async (req, res) => {
  try {
    const topic_id = req.params.id;
    const express_topic_data = await Topic.findByPk(topic_id);
    if (!express_topic_data) {
      res.status(404).end();
    }
    const topic_data = express_topic_data.get({ plain: true });

    const subject = req.body.subject;
    const content = req.body.content;

    const user_id = req.session.user_id;
    if (user_id === null) {
      res.status(404).end();
    }
    const express_user_data = await User.findByPk(user_id, {
      include: [Topic],
      attributes: { exclude: ['password'] },
    });
    if (express_user_data === null) {
      res.status(404).end();
    }
    const user_data = express_user_data.get({ plain: true });

    const result = await Topic.update(
      { subject: subject, content: content, user_id: user_id },
      { where: { id: topic_id } }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
