const { Router } = require('express');
const diets = require('./midlewares/dietRouter');
const recipes = require('./midlewares/recipeRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes)
router.use("/diets", diets )


module.exports = router;
