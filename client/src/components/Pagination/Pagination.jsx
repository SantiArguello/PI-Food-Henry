import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useEffect, useState } from "react";


export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.currentPage);
  const [input, setInput] = useState(page);

  useEffect(() => {
    setInput(page);
  }, [page]);

  const nextPage = async () => {
    dispatch(actions.setPage(page + 1));
    setInput(page + 1);
  };
  const prevPage = () => {
    dispatch(actions.setPage(page - 1));
    setInput(page - 1);
  };

  


  // Este componente renderiza una barra de paginación que permite al usuario navegar entre diferentes páginas de una lista. La barra de paginación incluye botones "Anterior" y "Siguiente" para avanzar o retroceder una página, y un cuadro de texto en el que el usuario puede ingresar manualmente el número de página que desea ver.

  return (
    <div >
      <div >
        <button  disabled={page === 1} onClick={prevPage}>
          Prev
        </button>
       
        <p>
          {page} to {totalPages}
        </p>

        <button
         
          disabled={input === totalPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
