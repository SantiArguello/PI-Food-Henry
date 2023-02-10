const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../../db.js");
const { Op } = require("sequelize");

//`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${name}`

const getApiRecipes = async (name) => {
  const urlApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const infoApi = urlApi.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
      steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });
  return infoApi.filter((recipe) =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );
};

const getDbRecipes = async (name) => {
  return await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [{ model: Diet, attributes: ['name'] }],
  });
};

const getAllRecipes = async (name) => {
  const apiInfo = await getApiRecipes(name);
  const dbInfo = await getDbRecipes(name);
  return apiInfo.concat(dbInfo);
};

// por id

//`https://api.spoonacular.com/recipes/${id}/information?=apiKey=${API_KEY}`
const getApiById = async (id) => {
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
}

const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            atributes: ['name'],
            through: {
                atributes: [],
            }
        }
    });
}

module.exports = { getApiById,getDbById,getApiRecipes, getDbRecipes, getAllRecipes };