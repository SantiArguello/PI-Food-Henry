import React from "react";

let prevId = 1;

export default function Recipe(recipe) {
  return (
    <div>
      <div>
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div>
        <h2>{recipe.name}</h2>
      </div>
          <div >
              <h4>diets types:</h4>
              <ul>
                {recipe.diets?.map(e => {
                    return (
                        <li key={prevId++}>{e}</li>
                    )
                })} 
                </ul>  
            </div>
    </div>
  );
}
