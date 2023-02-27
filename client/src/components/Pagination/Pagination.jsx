import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import s from "./pagination.module.css"


export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.currentPage);
 

  

  const nextPage = async () => {
    dispatch(actions.setPage(page + 1));
    
  };
  const prevPage = () => {
    dispatch(actions.setPage(page - 1));
    
  };

  


  // Este componente renderiza una barra de paginación que permite al usuario navegar entre diferentes páginas de una lista. La barra de paginación incluye botones "Anterior" y "Siguiente" para avanzar o retroceder una página

  return (
    <div >
      <div className={s.container}>
      <button
        className={`${s.pageButton}`}
        disabled={page === 1}
        onClick={prevPage}
      >
        Prev
      </button>
      <p className={s.currentPage}>
        {page} to {totalPages}
      </p>
      <button
        className={`${s.pageButton}`}
        disabled={page === totalPages}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
    </div>
  );
}
