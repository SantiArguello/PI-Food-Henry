import React from "react";

export default function Pagination({recipesPage,allRecipes,paged}) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++) {
        pages.push(i)
    }; 
    return (
        <div>
            
        {pages.length <= 1 ? 
        <></> :
        <nav className="pagination">
            
            <ul>
                {pages?.map(p =>(
                    <li  key={p}>
                        <button  onClick={() => paged(p)} >{p}</button>
                    </li>
                ))}
            </ul>

        </nav>
        }  

    </div>

    )

}