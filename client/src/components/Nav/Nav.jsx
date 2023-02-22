import React from "react";
import { HealthScore } from "./Sorts/HealthScore";
import { OrderByName } from "./Sorts/OrderByName";
import s from './nav.module.css'


export const Nav = (props) => {
  return (
    <div className={s.navContainer} >
        <h1 className={s.titleSort} >Sort by</h1>
        <HealthScore />
        <OrderByName />
    </div>
  );
};
