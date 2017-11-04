import * as React from "react"
import styled from "styled-components/native"
import QuestionView from "./QuestionView"
import { Button } from "react-native-material-ui"
import { ActivityIndicator, Text } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import { Deck, QuestionCard } from "../utils/models"
import { LargeText, MediumText, RootView, Spacer } from "./SharedComponents"
import { connect } from "react-redux"
import { Notifications } from "expo"
import { setLocalNotification } from "../utils/notifications"

const buttonStyle = {
    container: {
        margin: 10,
        height: 50,
        width: 200
    }
}

const ProgressView = styled.View`
    flex: 0.5;
    flex-direction: row;
    padding: 5px;
    align-items: flex-start;
    justify-content: flex-start;
`

interface State {
    ended: boolean,
    isAnswerVisible: boolean,
    currentQuestion: number,
    correctQuestions: number,
}

interface Props {
    navigation: NavigationScreenProp<any, any>,
    deck: Deck
}

class QuizView extends React.Component<Props, State> {

    constructor() {
        super()
        this.state = {
            ended: false,
            isAnswerVisible: false,
            currentQuestion: 0,
            correctQuestions: 0
        }
    }


    handleNext(isCorrect: boolean) {
        if (this.props.deck != null) {
            const currentQuestion = this.state.currentQuestion
            if (currentQuestion === this.props.deck.questions.length - 1) {
                this.setState({
                    ended: true,
                    isAnswerVisible: false,
                    correctQuestions: isCorrect ? this.state.correctQuestions + 1 : this.state.correctQuestions
                })
            } else {
                this.setState({
                    currentQuestion: this.state.currentQuestion + 1,
                    isAnswerVisible: false,
                    correctQuestions: isCorrect ? this.state.correctQuestions + 1 : this.state.correctQuestions
                })
            }
        }
    }

    private renderEndedContent() {
        Notifications.cancelAllScheduledNotificationsAsync().then(() => {
            setLocalNotification();
        });

        const correctQuestion = this.state.correctQuestions
        const totalQuestion = this.props.deck.questions.length
        return (
            <RootView>
                <Spacer />
                <LargeText>Quiz Completed!!</LargeText>
                <Spacer />
                <MediumText>You answered {correctQuestion} questions correct out of {totalQuestion}</MediumText>
                <Spacer />
                <Button
                    primary
                    raised
                    style={{
                        container: {
                            width: 200,
                            padding: 5,
                            margin: 10
                        }
                    }}
                    text='Restart'
                    onPress={() => {
                        this.setState({
                            currentQuestion: 0,
                            ended: false,
                            correctQuestions: 0,
                            isAnswerVisible: false,
                        })
                    }} />
                <Button
                    accent
                    raised
                    style={{
                        container: {
                            width: 200,
                            padding: 5,
                            margin: 10,
                        }
                    }}
                    text='Back to Deck'
                    onPress={() => {
                        this.props.navigation.goBack()
                    }} />
                <Spacer />
                <Spacer />
            </RootView>
        )
    }

    render(): JSX.Element | JSX.Element[] | React.ReactPortal | string | number | any | any {
        const deck = this.props.deck
        const currQuestion = (deck !== null) ? deck.questions[this.state.currentQuestion] : null

        if (this.state.ended) {
            return this.renderEndedContent()
        }

        if (deck !== null) {
            return <RootView>
                <ProgressView>
                    <Text>{this.state.currentQuestion + 1}/{deck.questions.length}</Text>
                </ProgressView>
                <Spacer />
                <QuestionView
                    isAnswerVisible={this.state.isAnswerVisible}
                    setVisible={(value: boolean) => { this.setState({ isAnswerVisible: value }) }}
                    question={currQuestion as QuestionCard} />
                <Spacer />
                <Button
                    primary
                    raised
                    text='Correct'
                    style={buttonStyle}
                    onPress={() => this.handleNext(true)}
                />
                <Button
                    accent
                    raised
                    text='Incorrect'
                    style={buttonStyle}
                    onPress={() => this.handleNext(false)}
                />
                <Spacer />
            </RootView>
        }
        return <RootView>
            <Spacer />
            <ActivityIndicator />
            <Spacer />
        </RootView>

    }
}

const mapStateToProps = (state: any, selfProps: any) => {
    const deckTitle = selfProps.navigation.state.params.topic
    const deck = state.decks.find((deck: any) => deck.title === deckTitle)
    return {
        deck: deck
    }
}

export default connect(mapStateToProps)(QuizView)