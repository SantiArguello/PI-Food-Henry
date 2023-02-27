import React from "react";
import { Sort } from "./Sorts/Sort";
import s from './nav.module.css'


export const Nav = (props) => {
  return (
    <div className={s.navContainer} >
        <h1 className={s.titleSort} >Sort by</h1>
        <Sort></Sort>
    </div>
  );
};
