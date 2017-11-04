import { reducerWithInitialState } from "typescript-fsa-reducers"
import { Deck } from "../utils/models"
import { addDeckAction, fetchDecksAction, saveNewCardAction } from "../actions/index"

interface State {
    decks: Deck[]
}

const STATE: State = {
    decks: []
}

const Reducer = reducerWithInitialState(STATE)
    .caseWithAction(fetchDecksAction.done, (state: State, action) => {
        return {
            decks: action.payload.result
        }
    })
    .caseWithAction(saveNewCardAction.done, (state: State, action) => {
        const topic = action.payload.params.topic
        const newCards = action.payload.result
        const value = {
            ...state,
            decks: state.decks.map((deck) => (topic === deck.title)
                ? newCards
                : { ...deck })
        }
        return value;
    })
    .caseWithAction(addDeckAction.done, (state, action) => {
        const newDecks = action.payload.result
        return {
            ...state,
            decks: newDecks
        }
    })

export default Reducer