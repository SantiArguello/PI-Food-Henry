const { Recipe, Diet } = require("../../db.js");
const { getAllRecipes, getDbById, getApiById } = require("../controllers/recipesControllers");
const recipeRouter = require("express").Router();

recipeRouter.get('/', async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ message: 'Name parameter is required' });
    }
    const allRecipes = await getAllRecipes(name);
    if (allRecipes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No recipes were found with the given name' });
    }
    return res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

recipeRouter.get('/:id', async (req, res, next) => {    
    const { id } = req.params  
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let dbRecipesById = await getDbById(id);            
             res.status(200).json(dbRecipesById)
        } else { 
            apiRecipesById = await getApiById(id)
            if (apiRecipesById.data.id) {
                let recipeDetails =  {                    
                  image: apiRecipesById.data.image,
                  name: apiRecipesById.data.title,
                    dishTypes: apiRecipesById.data.dishTypes,
                    dietTypes: apiRecipesById.data.diets,
                    summary: apiRecipesById.data.summary,
                    healthScore: apiRecipesById.data.healthScore,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                 res.status(200).send(recipeDetails); 
            }
        } 
    } catch {
         res.status(404).send('Recipe not found')
    }
});


recipeRouter.post('/', async (req, res) => {
  try {
      const { name, summary,healthScore,steps } = req.body;
      const newRecipe = await Recipe.create({ name, summary,healthScore,steps});
      res.status(200).send(newRecipe);
  } catch (error) {
      res.status(404).send(error.message);
  }
});


module.exports = recipeRouter;
