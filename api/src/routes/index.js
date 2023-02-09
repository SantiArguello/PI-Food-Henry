const { Router } = require('express');
const dietRouter = require('./midlewares/dietRouter');
const recipeRouter = require('./midlewares/recipeRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipeRouter)
router.use("/diet", dietRouter )


module.exports = router;
