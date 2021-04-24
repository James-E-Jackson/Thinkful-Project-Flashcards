import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";


function StudyDeck(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState(0);
    const [front, setFront] = useState(true);
    const history = useHistory();
    const pageName = "Study";
    
    useEffect(() => {     
        readDeck(deckId).then(setDeck);
    }, [deckId])

    const handelFlip = () => {setFront(!front)}
    const handleNext = () => {
        if(deck.cards[card+1]) {
            setCard(card+1);
            setFront(!front);
        }else{
            const result = window.confirm("Restart cards?\nClick `cancel` to return to the home page");
            if(result){
                setCard(0);
                setFront(true);
            }else{
                history.push("/");
            }
        }
    }
    
    if(deck.length===0) return <p>Loading...</p>

    if(deck.cards.length > 2){
        return (
            <div>
                <Breadcrumb deckName={deck.name} pageName={pageName}/>
                <h2>{deck.name? `Study: ${deck.name}`:`loading...`}</h2>
                <h4>Card {card+1} of {deck.cards.length}</h4>
                <p>{deck.cards[card] ? 
                (front ? `${deck.cards[card].front}` : `${deck.cards[card].back}`)
                : `loading...`}
                </p>
                <button className="btn alert alert-secondary"onClick={handelFlip}>Flip</button>
                {front? null:<button className="btn alert alert-primary" onClick={handleNext}>Next</button>}
            </div>
        );
    }else{
        return (
            <div>
                <Breadcrumb deckName={deck.name} pageName={pageName}/>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. there are {deck.cards.length} cards in this deck</p>
                <Link 
                className="btn"
                to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
            </div>
        );
        
    }
}

export default StudyDeck;