const { createDiet } = require("../controllers/dietsControllers");
const router = require("express").Router();


///GET trae todas las dietas
router.get("/", async (req, res) => {
  try {
    const allDiets = await createDiet();
    res.status(200).send(allDiets);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;