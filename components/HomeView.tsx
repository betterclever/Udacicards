import * as React from "react"
import styled from "styled-components/native"
import { ActivityIndicator, FlatList, View } from "react-native"
import DeckListItem from "./DeckListItem"
import { NavigationScreenProp } from "react-navigation"
import { ActionButton } from "react-native-material-ui"
import { Deck } from "../utils/models"
import { connect, Dispatch } from "react-redux"
import { fetchDecks } from "../actions/index"

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const Spacer = styled.View`
    flex: 2;
`

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

interface Props {
    navigation: NavigationScreenProp<any, any>,
    fetchAllDecks: () => Promise<any>,
    decks: Deck[]
}

class HomeView extends React.Component<Props, {}> {

    constructor() {
        super()
    }

    componentDidMount() {
        this.props.fetchAllDecks()
    }

    render(): JSX.Element | JSX.Element[] | React.ReactPortal | string | number | any | any {
        if (this.props.decks === undefined) {
            return <ActivityIndicator/>
        }
        return (
            <View
                style={{flex: 1}}>
                <FlatList
                    style={{
                        flex: 1
                    }}
                    data={this.props.decks}
                    keyExtractor={(item, index) => item.title}
                    renderItem={({item}) => <DeckListItem key={item.title} deck={item}
                                                          navigation={this.props.navigation}/>}
                />
                <ActionButton
                    onPress={() => this.props.navigation.navigate('AddNewDeck')}/>
            </View>
        )

    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchAllDecks: () => fetchDecks(dispatch, {})
})

const mapStateToProps = (state: any) => ({
    decks: state.decks
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)