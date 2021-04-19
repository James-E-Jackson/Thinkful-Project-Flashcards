import React from "react";
import Header from "./Header";
import DeckList from "./Deck/DeckList";
import { Route, Switch } from "react-router";
import NotFound from "./NotFound";
import ViewDeck from "./Deck/ViewDeck";
import StudyDeck from "./Deck/StudyDeck"
import DeckForm from "./Deck/DeckForm"
import Breadcrumb from "./Breadcrumb";
import CardForm from "./Card/CardForm";


function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/new">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardForm/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
              <CardForm />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact={true} path="/">
            <DeckList />
          </Route>
          <Route>
            <Breadcrumb pageName="Page Not Found"/>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}


export default Layout;
