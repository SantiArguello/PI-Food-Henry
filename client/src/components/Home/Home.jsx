import React from "react";
import { Recipe } from "../Recipe/Recipe";
import { Header } from "../Header/Header.jsx";
import { FilterBar } from "../FilterNav/FilterBar";
import { Nav } from "../Nav/Nav";
import s from "./home.module.css"


export const Home = (props) => {
  return (
    <div className={s.homeBackground} >
      <div className={s.homeConteiner} >
        <Header />
        <div className={s.mainHeader}>
        <Nav />{/* este componente ordena */}
        <FilterBar />{/* este componente filtra */}
        </div>
        <div >
          <Recipe />{/* este componente muestra las recetas paginadas */}
        </div>
      </div>
      </div>
  );
};
