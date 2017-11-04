export interface Deck {
    title: string,
    questions: QuestionCard[]
}

export interface QuestionCard {
    question: string,
    answer: string
}