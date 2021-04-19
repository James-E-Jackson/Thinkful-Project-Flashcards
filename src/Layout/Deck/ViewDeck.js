import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import Card from "../Card/Card";

function ViewDeck(){
    const [deck, setDeck] = useState([]);
    const [change, setChange] =useState(true);
    const history = useHistory();
    const {deckId} = useParams();
    const {url} = useRouteMatch();

    useEffect(() => {
        const abortController = new AbortController();
        if(deckId){
            readDeck(deckId).then(setDeck)
        }
        return () => abortController.abort();
        
    }, [change])

    const handleDelete = async (event) => {
        const result = window.confirm("Are you sure you want to delete this deck?");
        if(result){
            await deleteDeck(event.target.id);
            setChange(!change);
            history.push(`/`);
        }
    }
    
    const handleDeleteCard = async (event) =>{
        const result = window.confirm("Are you sure you want to delete this Card?");
        if(result){
        await deleteCard(event.target.id);
        }
    }

    let currentDeck={};
    if(deck) currentDeck = deck;
    if(!currentDeck) currentDeck = {name:"Loading...",description:"Loading"};

    let cardList = '';
    if(deck.cards) cardList = deck.cards.map((card, index)=> <Card key={index} card={card} deckId={deckId} handleDeleteCard={handleDeleteCard}/>);

    return(
        <div>
            <Breadcrumb pageName={currentDeck.name}/>
            <div>
                <h4>{currentDeck.name}</h4>
                <p>{currentDeck.description}</p>
            </div>
            <div className="d-flex pb-4">
                <Link 
                to={`${url}/edit`}
                className="btn alert alert-primary">Edit</Link>
                <Link 
                to={`${url}/study`}
                className="btn alert alert-secondary">Study</Link>
                <Link 
                to={`${url}/cards/new`}
                className="btn alert alert-success">Add Card</Link>
                <button className="btn alert alert-danger" id={deckId} onClick={handleDelete}>Delete</button>
            </div>
            <ul className="list-group">
                <li className="list-group-item">{cardList}</li>
            </ul>
        </div>
    );
}

export default ViewDeck;