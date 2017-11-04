import * as React from "react"
import styled from "styled-components/native"
import { Button } from "react-native-material-ui"
import { Deck } from "../utils/models"
import { NavigationScreenProp } from "react-navigation"
import { ActivityIndicator, Alert } from "react-native"
import { connect } from "react-redux"

const RootView = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
`

const DeckTitle = styled.Text`
    font-size: 40px;
`

const DeckOverviewText = styled.Text`
    font-size: 25px;
    color: #5e5f5e;
`

const MainContent = styled.View`
    flex: 12;
    justify-content: center;
    align-items: center;
`

const Spacer = styled.View`
    flex: 3;
`

interface Props {
    navigation: NavigationScreenProp<any, any>,
    deck: Deck
}

class DeckDetailView extends React.Component<Props, {}> {

    render(): JSX.Element {
        const deck = this.props.deck
        return (<RootView>
            <Spacer />
            {(deck !== null) ? (
                <MainContent>
                    <DeckTitle>{deck.title}</DeckTitle>
                    <DeckOverviewText>{deck.questions.length} cards</DeckOverviewText>
                    <Spacer />
                    <Button
                        primary
                        raised
                        text='Add Card'
                        onPress={() => {
                            this.props.navigation.navigate('AddCardView', { topic: deck.title })
                        }}
                        style={{
                            container: {
                                margin: 10,
                                height: 50,
                            }
                        }} />
                    <Button
                        accent
                        raised
                        text='Start Quiz'
                        onPress={() => {
                            if (deck.questions.length > 0) {
                                this.props.navigation.navigate('QuizView', { topic: deck.title })
                            } else {
                                Alert.alert(
                                    "No card available",
                                    "Please add a card to start quiz.",
                                    [
                                        {
                                            text: 'Add now',
                                            onPress: () => {
                                                this.props.navigation.navigate('AddCardView', { topic: deck.title })
                                            }
                                        },
                                        {
                                            text: 'Cancel',
                                        }
                                    ])
                            }
                        }}
                        style={{
                            container: {
                                margin: 10,
                                height: 50,
                            }
                        }} />
                </MainContent>) :
                <ActivityIndicator />}
            <Spacer />
        </RootView>)
    }
}

const mapStateToProps = (state: any, selfProps: any) => {
    const deckTitle = selfProps.navigation.state.params.topic
    const deck = state.decks.find((deck: any) => deck.title === deckTitle)
    return {
        deck: deck
    }
}

export default connect(mapStateToProps)(DeckDetailView)