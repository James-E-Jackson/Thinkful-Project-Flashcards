import React from "react";
import { Link, useParams} from "react-router-dom";

function Breadcrumb({deckName=null, pageName=null}){
    const {deckId="", cardId=""} = useParams();
   

    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home </Link>
                </li>
                <li className="breadcrumb-item">
                {deckName? (<Link to={`/decks/${deckId}`}>{deckName}</Link>) : (<p>{pageName}</p>)}
                </li>
                {deckName && pageName? <li className="breadcrumb-item">{pageName} {cardId}</li> : null}
            </ol>
        </nav>
    );
}
export default Breadcrumb;