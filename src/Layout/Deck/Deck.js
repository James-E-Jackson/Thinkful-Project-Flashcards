import React from "react";
import {Link} from "react-router-dom";



function Deck({ deck, handleDelete }){
    return (
        <div  className="border p-2" style={{paddingTop:"20px"}}>
            <div className="d-flex space-between">
                <h4 className="col-11">{deck.name}</h4>
                <p>{deck.cards.length} cards</p>
            </div>
            
            <p>{deck.description}</p>
            <Link 
            to={`/decks/${deck.id}`}
            className="btn alert alert-primary"
            >View</Link>
            <Link 
            to={`/decks/${deck.id}/study`}
            className="btn alert alert-secondary"
            >Study</Link>
            <button className=" btn alert alert-danger" id={deck.id} onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Deck;