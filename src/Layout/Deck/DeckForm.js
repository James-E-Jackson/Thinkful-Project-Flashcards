import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";


function DeckForm(){
    const defaultState = {
        name: "",
        description: ""
    };
    const {deckId=null} = useParams();
    const [formData, setFormData] = useState(defaultState);
    const history = useHistory();
    let pageName="";
    deckId? pageName = "Edit": pageName="Create Deck";
    
    useEffect(() => {
        const abortController = new AbortController();
        if(deckId){
            readDeck(deckId, abortController.signal)
                .then((deck) => setFormData({name: deck.name, description: deck.description}));
        }
        return () => abortController.abort();
    }, [])



    const handleSubmit = async () => {
        if(deckId){
            await updateDeck({id:deckId, name:formData.name, description:formData.description});
            setFormData(defaultState);

            history.push(`/decks/${deckId}`);
        }else{
            const newDeck = await createDeck({name: formData.name, description:formData.description});
            setFormData(defaultState);

            history.push(`/decks/${newDeck.id}`);
        }
    }

    return (
        <div>
            <Breadcrumb pageName={pageName}/>
            <div className="form-group">
                <label>Deck Name</label>
                <input
                    className="form-control"
                    id="deckName"
                    placeholder="Deck Name"
                    value={formData.name}
                    onChange={(event=>
                        setFormData({
                            ...formData,
                            name: event.target.value
                        }))}>
                </input>
                <label>Description</label>
                <textarea
                    className="form-control"
                    id="deckDescription"
                    placeholder="Deck Description"
                    value={formData.description}
                    onChange={(event=>
                        setFormData({
                            ...formData,
                            description: event.target.value
                        }))}>

                </textarea>
                <div>
                    <Link 
                    to="/"
                    className="btn alert alert-danger">Cancel</Link> 
                    <button className="btn alert alert-success"onClick={handleSubmit}>Submit</button>  
                </div>
            </div>
        </div>
    );
}

export default DeckForm;