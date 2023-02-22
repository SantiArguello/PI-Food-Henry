const router = require("express").Router();
const { Recipe, Diets } = require("../../db.js");
const { rece, getByID, postRecipe } = require("../controllers/recipesControllers");

///GET que acepta un parámetro opcional de consulta "name" y devuelve todas las recetas o una receta específica si se proporciona el parámetro de consulta.
router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const devolver = await rece(name);
      res.status(200).json(devolver);
    } else {
      const todas = await rece();
      res.status(200).json(todas);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

///POST que acepta un cuerpo de solicitud y crea una nueva receta en la base de datos.
router.post("/", async (req, res) => {
  try {
    const objRecipe = req.body;
    if (!objRecipe) res.status(404).send("Missing info");
    const newRecipe = await postRecipe(objRecipe);

    res.status(201).send(newRecipe);
  } catch (error) {
    res.status(404).send(error);
  }
});

/// GET que acepta un parámetro de ruta "idReceta" y devuelve una receta específica de la base de datos por su ID.
router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;
  try {
    const IdRec = await getByID(idReceta);
    res.status(200).json(IdRec);
  } catch (err) {
    res.status(400).send(err);
  }
});

/*
{
    "name": "Fideos con pasta de Brocoli",
    "healthScore": 100,
    "summary": "Un delicioso plato para comer cuando estas apurado",
    "steps": "1) Hierve el brócoli y la pasta por separado. 2) Rehoga cebolla, morron y zanahoria. 3) Procesa el brocoli hervido y agregale la verdura rehogada. 4) Salpimentar a gusto y agregar la pasta. 5) Servir",
    "image": "https://elmundoenrecetas.s3.amazonaws.com/uploads/recipe/picture/634/pasta_con_brocoli_2.webp",
    "diets": "Vegan, Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Pescetarian, Paleo, Primal, Low FODMAP, Whole30",
    "dishTypes": "Dinner, Lunch"
  }

*/

module.exports = router;
