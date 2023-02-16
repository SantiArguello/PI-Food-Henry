import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import {
  alphabeticalSort,
  dietTypeFilter,
  getRecipes,
  scoreSort,
} from "../Redux/actions";
import Pagination from "./Pagination";

let prevId = 1;

export default function Home(props) {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);

  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(alphabeticalSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div>
      <div>
        <h1>Henry Foods</h1>
      </div>
      <div>
        <button className="refreshButton" onClick={handleClick}>
          Refresh recipes
        </button>
      </div>
      <div>
        <SearchBar />
      </div>

      <label className="filters">Diets Types:</label>
      <select
        className="select"
        name="diets"
        onChange={(e) => handleDietTypeFilter(e)}
      >
        <option disabled selected>
          Select...
        </option>
        <option value="gluten free">Gluten Free</option>
        <option value="ketogenic">Keto</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="lacto vegetarian">Lacto-Vegetarian</option>
        <option value="ovo vegetarian">Ovo-Vegetarian</option>
        <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescetarian">Pescetarian</option>
        <option value="paleolithic">Paleo</option>
        <option value="primal">Primal</option>
        <option value="low fodmap">Low FODMAP</option>
        <option value="whole 30">Whole30</option>
        <option value="dairy free">Dairy Free</option>
      </select>
      <div>
        <label>Sort:</label>
        <select
          className="select"
          name="alphabetical"
          onChange={(e) => handleAlphabeticalSort(e)}
        >
          <option disabled selected>
            Alphabetical
          </option>
          <option value="atoz">A to Z</option>
          <option value="ztoa">Z to A</option>
        </select>
        <select
          className="select"
          name="numerical"
          onChange={(e) => handleScoreSort(e)}
        >
          <option disabled selected>
            Score
          </option>
          <option value="asc">From Min to Max</option>
          <option value="desc">From Max to Min</option>
        </select>
      </div>
      <div>
        <div>
          <Link to="/addRecipe">
            <button className="addButton">Add new recipe</button>
          </Link>
        </div>

        <div className="allrecipes">
          {showRecipesPage?.map((e) => {
            return (
              <div className="eachRecipe" key={prevId++}>
                <Link className="linkRecetas" to={`home/${e.id}`}>
                  <Recipe image={e.image} name={e.name} diets={e.diets} />
                </Link>
              </div>
            );
          })}
        </div>

        <Pagination
          recipesPage={recipesPage}
          allRecipes={allRecipes.length}
          paged={paged}
        />
      </div>
    </div>
  );
}
