const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet,DishType } = require("../../db.js");
const { Op } = require("sequelize");

//`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${name}`

// Por name


const getApiAllRecipes = async () => {
  const urlApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const infoApi = urlApi.data.results.map((recipe) => {
    const diets = recipe.diets.length > 0 ? recipe.diets : ["Ninguna"];
    return {
      id: recipe.id,
      name: recipe.title,
      healthScore: recipe.healthScore,
      image: recipe.image,
      diets: diets,
    };
  });
  return infoApi
};


const getApiRecipes = async (name) => {
  const urlApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const infoApi = urlApi.data.results.map((recipe) => {
    const diets = recipe.diets.length > 0 ? recipe.diets : ["Ninguna"];
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      diets: diets,
      dishTypes: recipe.dishTypes,
      steps: recipe.analyzedInstructions[0]?.steps.map(e =>e.number+") "+ e.step).join(" "),
    };
  });
  return infoApi.filter((recipe) =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );
};

const getDbRecipes = async (name) => {
  const recipes = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      { model: Diet, attributes: ['name'],through: {
        attributes: [],
      } },
      { model: DishType, attributes: ['name'],through: {
        attributes: [],
      } },
    ]
  });
 
  return recipes.map(recipe => {
    return {
      ...recipe.dataValues,
      diets: recipe.diets.map(diet => diet.name),
      DishTypes: recipe.DishTypes.map(dishType => dishType.name),
    };
  });
};

const getAllRecipes = async (name) => {
  const apiInfo = await getApiRecipes(name);
  const dbInfo = await getDbRecipes(name);
  return apiInfo.concat(dbInfo);
};



// Por id
const getApiById = async (id) => {
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
}

const getDbById = async (id) => {
  const recipe = await Recipe.findByPk(id, {
    include: [
      { model: Diet, attributes: ['name'],through: {
        attributes: [],
    } },
      { model: DishType, attributes: ['name'],through: {
        attributes: [],
    } }
    ]
  });
   return {
    ...recipe.dataValues,
    diets: recipe.diets.map(diet => diet.name),
    DishTypes: recipe.DishTypes.map(dishType => dishType.name),
  };
};

module.exports = { getApiById,getDbById,getApiRecipes, getDbRecipes, getAllRecipes, getApiAllRecipes };
