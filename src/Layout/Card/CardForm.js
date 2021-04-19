import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";

function CardForm(){
    const defaultState = {
        front: "",
        back: ""
    };
    const {deckId, cardId = null} = useParams();
    const [formData, setFormData] = useState(defaultState);
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({});
    const history = useHistory();
    let pageName = "";
    cardId ? pageName="Edit Card": pageName="Add Card";

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId).then(setDeck)
        if(cardId){
            readCard(cardId, abortController.signal)
                .then((card) => {
                setCard(card);
                setFormData({front: card.front, back: card.back});
                });
        }

    
        return () => abortController.abort();
    }, [])
    const handleSubmit = async () => {
        if(cardId){
            await updateCard({...card, front:formData.front, back:formData.back});
            setFormData(defaultState);
            history.push(`/decks/${deckId}`);
        }else{
            await createCard(deckId, {front:formData.front, back:formData.back});
            setFormData(defaultState);
            history.push(`/decks/${deckId}`);
        }
    }



    return (
        <div>
            <Breadcrumb deckName={deck.name} pageName={pageName}/>
            <div className="form-group">
                <label>Front</label>
                <textarea
                    className="form-control"
                    id="fieldOne"
                    placeholder="Front side of card"
                    value={formData.front}
                    onChange={(event=>
                        setFormData({
                            ...formData,
                            front: event.target.value
                        }))}>
                </textarea>
                <label>Back</label>
                <textarea
                    className="form-control"
                    id="fieldTwo"
                    placeholder="Back side of card"
                    value={formData.back}
                    onChange={(event=>
                        setFormData({
                            ...formData,
                            back: event.target.value
                        }))}>

                </textarea>
                <div>
                    <Link to={`decks/${deckId}`}className="btn alert alert-danger">{cardId?`Cancel`:`Done`}</Link> 
                    <button className="btn alert alert-success"onClick={handleSubmit}>Submit</button>  
                </div>
            </div>
        </div>
    )
}
export default CardForm;