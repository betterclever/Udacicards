import { AsyncStorage } from 'react-native'
import { Deck, QuestionCard } from "./models"

export const STORAGE_KEY = 'mobile-flashcard'

const initData = [
    {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            },
        ],
    },
    {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer:
                'The combination of a function and the lexical environment within which',
            },
        ],
    }
]

export const setupData = () => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initData))
    return initData;
}

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY).then(results => {
        return results === null ? setupData() : JSON.parse(results)
    })
}

export function createDeck(deck: Deck) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(STORAGE_KEY).then(result => {

            const decks: Deck[] = JSON.parse(result)
            const newDecks = decks.concat(deck)
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks)).then(() => {
                resolve(newDecks)
            })

        }).catch(() => {
            reject()
        })
    })
}

export function getDeck(deckTitle: any) {
    return AsyncStorage.getItem(STORAGE_KEY).then((result) => {
        return (JSON.parse(result) as Deck[]).find(deck => deck.title == deckTitle)
    })
}

export function addCardToDeck(question: QuestionCard, title: string) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(STORAGE_KEY).then(result => {
            const decks: Deck[] = JSON.parse(result)
            const deck = decks.find((deck) => title === deck.title)

            if (deck !== undefined) {
                deck.questions.push(question)
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks)).then(() => {
                    resolve(deck)
                })
            }
        }).catch(() => {
            reject()
        })
    })


}