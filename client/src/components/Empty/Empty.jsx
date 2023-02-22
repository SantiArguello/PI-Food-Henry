import React from "react";
const handleClick = () => {
  window.location.reload();
};
export const Empty = () => {
  return (
    <div >
      <h2 >
      No recipes found
      </h2>
      <button  onClick={(event) => handleClick(event)}>
        <p>Reset</p>
      </button>
    </div>
  );
};
