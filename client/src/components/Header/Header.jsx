import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar.jsx";
import s from "./header.module.css"


export const Header = (props) => {
  return (
    <div >
      <div >
          <h1 className={s.titleHeader} >Henry Foods</h1>
          <Link to="/create" >
            <button className={s.buttonCreate}  >Create new recipe</button>
          </Link>
          <SearchBar />
        <div >

        </div>
        <div>
        </div>
      </div>
    </div>
  );
};
