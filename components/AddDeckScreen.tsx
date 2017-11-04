import * as React from "react"
import styled from "styled-components/native"
import { Button } from "react-native-material-ui"
import { MediumText, PaddedContainerView, RootView, Spacer } from "./SharedComponents"
import { connect, Dispatch } from "react-redux"
import { addNewDeck } from "../actions/index"
import { Deck } from "../utils/models"
import { NavigationScreenProp } from "react-navigation"

const InputBox = styled.TextInput`
    width: 300px;
    height: 50px;
    margin: 20px;
`

interface State {
    deckName: string
}

interface Props {
    addNewDeck: (deck: Deck) => Promise<Deck[]>,
    navigation: NavigationScreenProp<any, any>
}

class AddDeckScreen extends React.Component<Props, State> {

    constructor() {
        super()
        this.state = {
            deckName: ''
        }
    }

    render(): JSX.Element | JSX.Element[] | React.ReactPortal | string | number | any | any {
        return <RootView>
            <PaddedContainerView>
                <MediumText>Deck Title</MediumText>
                <InputBox
                    multiline
                    numberOfLines={3}
                    onChangeText={(text) => this.setState({deckName: text})}
                    value={this.state.deckName}/>
            </PaddedContainerView>
            <Button
                style={{container: {margin: 20}}}
                raised primary
                text='Add New Deck' onPress={() => this.verifyAndSubmit()}/>
            <Spacer/>
        </RootView>

    }

    private verifyAndSubmit() {
        this.props.addNewDeck({
            questions: [],
            title: this.state.deckName
        }).then(() =>
            this.props.navigation.navigate("DeckDetailView", {topic: this.state.deckName})
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addNewDeck: (deck: Deck) => addNewDeck(dispatch, deck)
})

export default connect(null, mapDispatchToProps)(AddDeckScreen)