import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../Redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    try {
      dispatch(getRecipesByName(input));
    } catch (error) {
      return error;
    }

    setInput("");
  }

  return (
    <div >
      <input
        type="text"
        
        placeholder="Search recipe by name"
        value={input}
        onChange={(e) => handleChange(e)}
      />
      <button
        
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
