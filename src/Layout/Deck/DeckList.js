import React, { useEffect, useState } from "react";
import Deck from "./Deck"
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import { listDecks } from "../../utils/api";


function DeckList(){
    const [change, setChange] = useState(false);
    const [decks, setDecks] = useState([]);
    const history = useHistory();
    const {url} = useRouteMatch();

    const handleDelete = async (event) => {
        const result = window.confirm("Are you sure you want to delete this deck?");
        if(result){
            await deleteDeck(event.target.id);
            setChange(!change);
            if(url !==`/`) history.push(`/`);
        }
    }

    useEffect(() => {
        listDecks().then(setDecks);
    }, [change])

    
    let deckList = '';
    if(decks) deckList = decks.map((deck, index) => <Deck id={deck.id} key={index} deck={deck} handleDelete={handleDelete}/>);
    
    return (
        <div>
            <Link 
            to={`/decks/new`}
            className="btn alert alert-success">Create Deck</Link>
            <ul style={{ listStyleType: "none"}}>
            <li>{deckList}</li>
            </ul>
        </div>
    );
}
export default DeckList;