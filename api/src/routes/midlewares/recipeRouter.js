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
                    dietTypes: apiRecipesById.data.diets,
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

    //Se crea la receta
    const newRecipe = await Recipe.create({ name, summary, healthScore, steps, image });

    // Se divide el string en un array, se separa por comas, se eliminan los espacios y se crea la dieta
    const dietsArray = diets.split(',').map(diet => diet.trim());
    const dietCreate = await Diet.bulkCreate(// BulkCreate permite mandar un array con múltiples registros en la base de datos de una sola vez 
      dietsArray.map(diet => ({ name: diet }))
    );

    const dishTypesArray = dishTypes.split(',').map(dishType => dishType.trim());
    const dishTypeCreate = await DishType.bulkCreate(
      dishTypesArray.map(dishType => ({ name: dishType }))
    );

    //Se establecen las relaciones N:N
    await newRecipe.setDiets(dietCreate);
    await newRecipe.setDishTypes(dishTypeCreate);

    res.status(200).send({ recipe: newRecipe, diets: dietCreate, dishTypes: dishTypeCreate });
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
