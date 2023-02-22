import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import s from "./dietas.module.css"


export const Dietas = (props) => {
  // lista de checkboxes  para que pueda seleccionar las dietas por las que quiere filtrar las recetas
  const dietas = useSelector((state) => state.dietas);
  const dispatch = useDispatch();
  // Al seleccionar o deseleccionar un checkbox, se ejecuta una función que se le pasa como props

  useEffect(() => {
    dispatch(actions.getDiets());
  }, []);
  console.log(props);

  return (
    <div className={s.dietsContainer} >
      {dietas?.map((diet) => {
        return (
          <div  key={diet.name}>
            <input
              
              type="checkbox"
              id={diet.id}
              value={diet.name}
              onChange={props.handleChange2}
              className={s.checkbox}
              
            />
            <label className={s.label} htmlFor={diet.id} >
              {diet.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};
