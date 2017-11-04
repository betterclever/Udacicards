import actionCreatorFactory from "typescript-fsa"
import wrapAsyncWorker from "./wrapAsyncWorker"
import * as StorageAPI from "../utils/storage"
import { Deck } from "../utils/models"
import bindThunkAction from "typescript-fsa-redux-thunk"

const actionCreator = actionCreatorFactory()

export const fetchDecksAction = actionCreator.async<any, any, any>('FETCH_DECKS')
export const saveNewCardAction = actionCreator.async<any, any, any>('SAVE_NEW_CARD')
export const addDeckAction = actionCreator.async<Deck, Deck[]>('ADD_DECK')

export const fetchDecks = wrapAsyncWorker(fetchDecksAction, () => {
    return StorageAPI.fetchDecks()
})

export const addNewDeck = wrapAsyncWorker(addDeckAction, (deck: Deck) => {
    return StorageAPI.createDeck(deck)
})

export const saveNewCard = wrapAsyncWorker(saveNewCardAction, ({card, topic}) => {
    return StorageAPI.addCardToDeck(card, topic)
})

export const addDeck = bindThunkAction(addDeckAction, async (deck: Deck) => {
    return await StorageAPI.createDeck(deck)
})

