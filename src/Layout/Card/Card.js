import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function Card({card, handleDeleteCard}){
    const {url} = useRouteMatch();
    return(
        <div className="p-1 border">
            <div className="d-flex">
                <p className="col-6 px-3">{card.front}</p>
                <p className="col-6 px-3">{card.back}</p>
            </div>
            <div className="d-flex flex-row-reverse">
                <Link 
                className="btn alert alert-primary"
                to={`${url}/cards/${card.id}/edit`}>
                edit</Link>
                <button className="btn alert alert-danger" id={card.id} onClick={handleDeleteCard}>delete</button>
            </div>
        </div>
    );
}

export default Card;