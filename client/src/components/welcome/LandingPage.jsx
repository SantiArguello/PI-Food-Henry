import React from "react";
import { Link } from "react-router-dom";
import s from "./landingPage.module.css" 


export function Landing(props) {
  return (
    <div className={s.landingBackground} >
      <div className={s.landingContainer}>
          <h1 className={s.titleLanding} >Welcome to Henry Foods</h1>
          <Link  to="/home">
            <button className={s.buttonLanding} >Enter</button>{" "}
        </Link>
        </div>
        </div>
  );
}
