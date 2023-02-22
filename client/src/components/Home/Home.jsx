import React from "react";
import { Recipe } from "../Recipe/Recipe";
import { Header } from "../Header/Header.jsx";
import { SideBar } from "../Side/SideBar";
import { Nav } from "../Nav/Nav";
import s from "./home.module.css"


export const Home = (props) => {
  return (
    <div className={s.homeBackground} >
      <div className={s.homeConteiner} >
        <Header />
        <div className={s.mainHeader}>
        <Nav />
        <SideBar />
        </div>
        <div >
          <Recipe />
        </div>
      </div>
      </div>
  );
};
