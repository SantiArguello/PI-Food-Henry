import React from "react";
import { Link } from "react-router-dom";
import { Loading } from "../Empty/Loading";
import s from "./recipeModel.module.css"

export const RecipeModel = (props) => {
  return props.name ? (
    <div className={s.recipeCard}>
  <img src={props.image} alt="imagen" />
  <h2>{props.name}</h2>
  <div key={props.id}>
    <p>{props.healthScore}</p>
    <ul>
      {props.diets?.map((element, index) => (
        <ol key={index}>{element}</ol>
      ))}
    </ul>
    <Link to={"/detail/" + props.id}>
      <button>More Details</button>
    </Link>{" "}
  </div>
</div>
  ) : (
    <Loading />
  );
};
