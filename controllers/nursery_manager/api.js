const Plant_type = require("../../models/Plant_type");
const router = require('express').Router();


const dataToBeSeeded = require("../../seeds/plant_typeData.json")

router.put("/plant_type/:plant_type_id", async (req, res) => {
    const updated_plant_type = await Plant_type.update(req.body,{
        id: req.params.plant_type_id
    })

    if (!updated_plant_type) {
        res.status(404).end();
        return;
    }

     res.status(200).end();
});

router.post('/plant_type', async (req, res) => {
    const created_plant_type = await Plant_type.create(req.body)

    if (!created_plant_type) {
        res.status(500).end();
        return;
    }

    res.status(200).json(created_plant_type);
});



router.post('/seed',async (req,res) => {

    const seed_data = await Plant_type.bulkCreate(dataToBeSeeded);

    if (!seed_data) {
        res.status(500).end();
        return;
    }

    res.status(200).json(seed_data);
    
})

module.exports = router;