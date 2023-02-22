import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";
import s from "./recipeDetail.module.css";

//import { useHistory } from "react-router-dom";
import { Loading } from "../Empty/Loading";

export const RecipeDetail = () => {
  const { id } = useParams();
  //const history = useHistory();

  const dispatch = useDispatch();
  const recipeId = useSelector((state) => state.recipeId);

  function removeLinks(html) {
    // Crea un elemento div temporal
    const temp = document.createElement("div");
    // Asigna la cadena de texto HTML al contenido del elemento div
    temp.innerHTML = html;
    // Obtiene todas las etiquetas a del elemento div
    const links = temp.getElementsByTagName("a");
    // Recorre todas las etiquetas a y elimina el atributo href
    for (let i = 0; i < links.length; i++) {
      links[i].removeAttribute("href");
    }
    // Devuelve el contenido del elemento div sin los enlaces
    return temp.innerHTML;
  }
  const htmlWithoutLinks = removeLinks(recipeId.summary);

  useEffect(() => {
    dispatch(actions.RecipeID(id));
    dispatch(actions.getDiets());
  }, [dispatch, id]);

  const handleHome = () => {
    dispatch(actions.getRecipes());
    dispatch(actions.ClearId());
  };

  console.log(recipeId);
  // recipeId.name;
  return (
    <div className={s.containerDetail}>
      <div className={s.mainDetail} >
        <div className={s.backButton}>
          <Link to="/home">
            <button onClick={() => handleHome()}>Back to Home</button>
          </Link>
        </div>

        {recipeId.name ? (
          <div>
            <h1 className={s.titleDetail}>{recipeId.name}</h1>

            <div className={s.healthScore}>
              <>
                <h4>Health Score</h4>
                <h3>{recipeId.healthScore}</h3>
              </>
            </div>

            <div className={s.summary}>
              <div>
                <h4>Summary</h4>

                <div
                  dangerouslySetInnerHTML={{ __html: htmlWithoutLinks }}
                ></div>
              </div>

              <img src={recipeId.image} alt={recipeId.name} />
            </div>

            <div className={s.diets}>
              <h4>Diets</h4>

              {recipeId.diets?.map((ele, index) => (
                <h3 key={index}>{ele}</h3>
              ))}
            </div>

            <div className={s.steps}>
              {recipeId.steps ? <h4>Steps</h4> : <br />}

              <div>
                {recipeId.steps ? (
                  <p>{recipeId.steps}</p>
                ) : (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
