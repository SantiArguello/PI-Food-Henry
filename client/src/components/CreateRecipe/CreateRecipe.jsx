import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
import validate from "./validate";
import { Link } from "react-router-dom";
import s from "./createRecipe.module.css"



export const CreateRecipe = (props) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const dietas = useSelector((state) => state.dietas);
  const [habilitado, setHabilitado] = useState(false);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 10,
    image: "",
    diets: [],
    steps: "",
  });
  const [errorInput, setErrorInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    image: "",
    diets: [],
    steps: "",
  });

  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  ///"handleCheckChange" se utiliza para manejar el cambio de estado de los campos de tipo checkbox que seleccionan las dietas de la receta. Actualiza el estado de "input" y "errorInput" con la nueva información.
  const handleCheckChange = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });

      setErrorInput(
        validate({
          ...input,
          diets: [...input.diets, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((t) => t !== e.target.value),
      });

      setErrorInput(
        validate(
          {
            ...input,
            diets: input.diets.filter((t) => t !== e.target.value),
          },
          [...recipes]
        )
      );
    }
  };

  ///"handleChange" se utiliza para manejar el cambio de estado de los demás campos de "input". Actualiza el estado de "input" y "errorInput" con la nueva información.
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrorInput(
      validate({ ...input, [event.target.name]: event.target.value })
    );
  };

  ///"handleSubmit" se utiliza para manejar el envío del formulario. Valida la información de "input" y, si es válida, envía una acción de "postRecipes" al almacenamiento de Redux y navega a la página principal.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (recipes.find((ele) => ele.name === input.name)) {
      alert("Esta receta ya existe");
      return;
    }

    dispatch(actions.postRecipes(input));
    setInput({
      ...input,
      name: "",
      summary: "",
      healthScore: 10,
      image: "",
      diets: [],
      steps: "",
    });
    alert("Recipe created successfully");
    history.push("/home");
  };

  return (
    <div className={s.formContainer}>
      <div className={s.mainForm}>
        <Link  to="/home">
          <button className={s.buttonBack}  >Back to home</button>
        </Link>

        <form  onSubmit={(e) => handleSubmit(e)}>
          <div >
            <label>Name:</label>
            {errorInput.name ? <span>{errorInput.name}</span> : <span></span>}

            <input
              type="text"
              name="name"
              placeholder="Escribe el nombre de tu receta.."
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            <label>Description:</label>
            {errorInput.summary ? (
              <span>{errorInput.summary}</span>
            ) : (
              <span></span>
            )}

            <textarea
              type="text"
              name="summary"
              placeholder="Descripcion de tu receta"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />

            <label>HealthScore</label>
            {errorInput.healthScore ? (
              <span>{errorInput.healthScore}</span>
            ) : (
              <span></span>
            )}
            <input
              type="number"
              name="healthScore"
              placeholder="¿Que puntaje nutricional posee?"
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
            />
            <label>Imagen:</label>
            {errorInput.image ? <span>{errorInput.image}</span> : <span></span>}
            <input
              type="text"
              name="image"
              placeholder="Por favor un enlace con la foto de tu receta"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />

            <label>Pasos de preparacion:</label>
            {errorInput.steps ? <span>{errorInput.steps}</span> : <span></span>}
            <textarea
              type="text"
              name="steps"
              placeholder="Pasos para realizar la receta"
              value={input.steps}
              onChange={(e) => handleChange(e)}
            />

            <div >
              <label>Types of Diets:</label>
              {dietas?.map((diet) => {
                return (
                  <div key={diet.name}>
                    <input
                      
                      type="checkbox"
                      id={diet.id}
                      value={diet.name}
                      onChange={handleCheckChange}
                    />
                    <label htmlFor={diet.id} >
                      {diet.name}
                    </label>
                  </div>
                );
              })}
              {errorInput.diets ? (
                <span >{errorInput.diets}</span>
              ) : (
                <span></span>
              )}
            </div>
            {!Object.entries(errorInput).length ? (
              <button  type="submit">
                Create Recipe
              </button>
            ) : (
              <div>
                <button  type="submit" disabled={!habilitado}>
                  Create Recipe
                </button>
                <span >
                  {" "}
                  Incomplete required fields
                </span>
              </div>
            )}
          </div>

          <div >
          </div>
        </form>
      </div>
    </div>
  );
};


