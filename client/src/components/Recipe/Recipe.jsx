import React from "react";
import { RecipeModel } from "./RecipeModel";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Pagination from "../Pagination/Pagination.jsx";
import { useState } from "react";
import { Empty } from "../Empty/Empty";
import { Loading } from "../Empty/Loading";
import s from "./recipe.module.css"

export const Recipe = (props) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [loading, setLoading] = useState(true);


  React.useEffect(() => {
    dispatch(actions.getRecipes());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const currentPage = useSelector((state) => state.currentPage);

  const recipesPage = 9;
  const lastIndex = currentPage * recipesPage;
  const firstIndex = lastIndex - recipesPage;
  const showRecipes = recipes.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(recipes?.length / recipesPage);

  // se calculan los índices de inicio y fin de la lista de recetas que se deben mostrar en la página actual. Para hacer esto, se multiplica el número de página actual por recipesPage para obtener el índice del último elemento que se debe mostrar en la página, y se resta recipesPage al índice del último elemento para obtener el índice del primer elemento.

  //agarra el indice del primero y del ultimo pj


  return (
    <div >
      {!loading ? (
        !recipes.length ? (
          <Empty />
          ) : (
            <section className={s.mainContainer} >
            {showRecipes?.map((ele) => (
              <RecipeModel
              name={ele.name}
              image={ele.image}
              summary={ele.summary}
              key={ele.id}
              healthScore={ele.healthScore}
              diets={ele.diets}
              id={ele.id}
              />
              ))}
          </section>
        )
        ) : (
          <Loading />
          )}
          {totalPages >= 2 && Array.isArray(showRecipes) && (
            <Pagination totalPages={totalPages} />
          )}
    </div>
  );
};

// const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         dispatch(getDetail(id)).then(() => setLoading(false));
//         return () => {
//             setLoading(true);
//             dispatch(cleanID());
//         };
//     }, [id]);

// return ( 
// <div>
// { loading ? (<Loader /> ) : (<div>.....<div>)
// </div>
// )