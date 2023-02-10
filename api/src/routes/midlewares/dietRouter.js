const { dietTypesDb } = require("../controllers/dietType");
const { Diet } = require("../../db.js");
const dietRouter = require("express").Router();


dietRouter.get('/', async (req, res, next) => {
    
    try {
        dietTypesDb.forEach(e => {
            Diet.findOrCreate({
                where: { name: e}
            })
        });
        const dietTypes = await Diet.findAll();
        res.send(dietTypes)
    } catch (error) {
        next(error)
    }
})

module.exports = dietRouter;
