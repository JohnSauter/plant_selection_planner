const router = require('express').Router();
const { User, Garden_zone, Plant_type, Plant_instance } = require('../../Models');
const withAuth = require('../../utils/auth');

/* Routes go here, then the API routes when we have them.
*/

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

router.get('/home', (req, res) => {
    res.render("nursery_manager_home");
})





module.exports = router;
