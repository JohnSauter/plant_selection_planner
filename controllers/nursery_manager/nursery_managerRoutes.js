const router = require('express').Router();
const {
  User,
  Garden_zone,
  Plant_type,
  Plant_instance,
} = require('../../models');
const withAuth = require('../../utils/auth');

/* Routes go here, then the API routes when we have them.
*/

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

router.get('/home', (req, res) => {
    res.render("nursery_manager_home");

})

router.get('/customer/:customer_id', (req, res) => {
    res.render("nursery_manager_customer");

})

router.get('/add_plant', (req, res) => {
    res.render("nursery_manager_add_plant");

})

router.get('/edit_plant/:plant_type_id', (req, res) => {
    res.render("nursery_manager_edit_plant");

})

module.exports = router;
