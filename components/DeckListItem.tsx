import * as React from "react"
import { Card } from "react-native-material-ui"
import styled from "styled-components/native"
import { NavigationScreenProp } from "react-navigation"
import { Deck } from "../utils/models"

const CardContent = styled.View`
    height: 200px;
    justify-content: center;
    align-items: center;
`
const CardTitle = styled.Text`
    font-size: 30px;
`

const CardOverview = styled.Text`
    font-size: 20px;
    margin: 10px;
`

interface Props {
    deck: Deck,
    navigation: NavigationScreenProp<any, any>,
}

class DeckListItem extends React.Component<Props, any> {

    render(): JSX.Element {
        const deck = this.props.deck
        return (
            <Card
                onPress={() => this.props.navigation.navigate('DeckDetailView', {topic: deck.title})}
                style={{container: {elevation: 10}}}>
                <CardContent>
                    <CardTitle>{deck.title}</CardTitle>
                    <CardOverview>{deck.questions.length} cards</CardOverview>
                </CardContent>
            </Card>
        )
    }
}

export default DeckListItem