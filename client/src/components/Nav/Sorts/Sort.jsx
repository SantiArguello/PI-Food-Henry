import React, { useState, useEffect } from "react";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import s from "../nav.module.css";

export const Sort = () => {
  const dispatch = useDispatch();

  const [orderOption, setOrderOption] = useState("");

  const handleOrderChange = (e) => {
    setOrderOption(e.target.value);
  };

  useEffect(() => {
    if (orderOption === "max" || orderOption === "desc") {
      dispatch(actions.orderByHs(orderOption));
    } else if (orderOption === "A-Z" || orderOption === "Z-A") {
      dispatch(actions.orderByLetter(orderOption));
    } else {
      dispatch(actions.getRecipes());
    }
    dispatch(actions.change_page(1));
  }, [orderOption, dispatch]);

  return (
    <div>
      <select className={s.selectNav} value={orderOption} onChange={handleOrderChange}>
        <option disabled selected>Order by</option>
        <option value="max">Health Score: Max to min</option>
        <option value="desc">Health Score: Min to Max</option>
        <option value="A-Z">Name: A to Z</option>
        <option value="Z-A">Name: Z to A</option>
      </select>
    </div>
  );
};