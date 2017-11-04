import * as React from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { View } from "react-native"
import { MainNavigator } from "./utils/routes"
import * as Redux from "redux"
import reducer from "./reducers"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { setLocalNotification } from "./utils/notifications"

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            paddingTop: 20,
            height: 80,
        },
    },
};

const store = Redux.createStore(
    reducer,
    {},
    Redux.compose(Redux.applyMiddleware(thunk))
)

export default class App extends React.Component<{}> {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider uiTheme={uiTheme}>
                    <View style={{flex: 1}}>
                        <MainNavigator/>
                    </View>
                </ThemeProvider>
            </Provider>
        );
    }
}

