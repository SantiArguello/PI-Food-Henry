const { Recipe,Diet,DishType } = require("../../db.js");
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
                  summary: apiRecipesById.data.summary,
                  healthScore: apiRecipesById.data.healthScore,
                  image:apiRecipesById.data.image,
                    dishTypes: apiRecipesById.data.dishTypes,
                    diets: apiRecipesById.data.diets,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e =>e.number+") "+ e.step).join(" ")
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
    const { name, summary, healthScore, steps, image, diets, dishTypes } = req.body;

    //Crear la receta
    const newRecipe = await Recipe.create({ name, summary, healthScore, steps, image });

    // Crear las dietas
    const dietsArray = diets.split(',').map(diet => diet.trim());
    const dietCreate = await Diet.bulkCreate(
      dietsArray.map(diet => ({ name: diet }))
    );

    // Crear los tipos de plato
    const dishTypesArray = dishTypes.split(',').map(dishType => dishType.trim());
    const dishTypeCreate = await DishType.bulkCreate(
      dishTypesArray.map(dishType => ({ name: dishType }))
    );

    // Establecer las relaciones N:N
    await newRecipe.setDiets(dietCreate);
    await newRecipe.setDishTypes(dishTypeCreate);

    const result = {
      id: newRecipe.id,
      name: newRecipe.name,
      summary: newRecipe.summary,
      healthScore: newRecipe.healthScore,
      image: newRecipe.image,
      diets: dietsArray,
      dishTypes: dishTypesArray,
      steps: newRecipe.steps
    };

    res.status(200).send([result]);
  } catch (error) {
    res.status(404).send({ error: error.message });
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

module.exports = recipeRouter;
