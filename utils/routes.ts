import AddCardScreen from "../components/AddCardScreen"
import HomeView from "../components/HomeView"
import { StackNavigator } from "react-navigation"
import DeckDetailView from "../components/DeckDetailView"
import QuizView from "../components/QuizView"
import AddDeckScreen from "../components/AddDeckScreen"

export const MainNavigator = StackNavigator({
    Home: {
        screen: HomeView,
        navigationOptions: ({navigation}: any) => ({
            title: 'Udacicards',
        }),
    },
    AddNewDeck: {
        path: 'addNewDeck',
        screen: AddDeckScreen,
        navigationOptions: {
            title: "Add New Deck"
        }
    },
    AddCardView: {
        path: 'addNewCard/:topic',
        screen: AddCardScreen,
        navigationOptions: {
            title: "Add New Card"
        }
    },
    DeckDetailView: {
        path: 'deck/:topic',
        screen: DeckDetailView,
        navigationOptions: {
            title: "UdaciCards"
        }
    },
    QuizView: {
        path: 'quiz/:topic',
        screen: QuizView,
        navigationOptions: {
            title: "Quiz"
        }
    }
})