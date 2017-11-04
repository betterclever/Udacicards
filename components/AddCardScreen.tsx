import * as React from "react"
import styled from "styled-components/native"
import { Button } from "react-native-material-ui"
import { PaddedContainerView } from "./SharedComponents"
import { NavigationScreenProp } from "react-navigation"
import { connect, Dispatch } from "react-redux"
import { saveNewCard } from "../actions/index"
import { QuestionCard } from "../utils/models"

const RootView = styled.KeyboardAvoidingView`
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: flex-start;
`
const Spacer = styled.View`
    flex: 2;
`
const InputBox = styled.TextInput`
    width: 300px;
    font-size: 15px;
    padding: 10px;
`
const HText = styled.Text`
    font-size: 16px;
`

interface State {
    question: string,
    answer: string
}

interface Props {
    navigation: NavigationScreenProp<any, any>,
    saveNewCard: (data: { card: QuestionCard, topic: string }) => Promise<any>
}

class AddCardScreen extends React.Component<Props, State> {

    constructor() {
        super()
        this.state = {
            question: '',
            answer: ''
        }
    }

    private verifyAndSubmit() {
        const topic = this.props.navigation.state.params.topic
        this.props.saveNewCard({
            topic: topic,
            card: {
                question: this.state.question,
                answer: this.state.answer
            }
        }).then(() => {
            this.props.navigation.goBack();
        })
    }

    render(): JSX.Element | JSX.Element[] | React.ReactPortal | string | number | any | any {
        return <RootView>
            <PaddedContainerView>
                <HText>Question</HText>
                <InputBox
                    multiline
                    numberOfLines={3}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}/>
            </PaddedContainerView>
            <PaddedContainerView>
                <HText>Answer</HText>
                <InputBox
                    multiline
                    numberOfLines={3}
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}/>
            </PaddedContainerView>
            <Button
                style={{container: {margin: 20}}}
                raised primary
                text='Submit' onPress={() => this.verifyAndSubmit()}/>
            <Spacer/>
        </RootView>

    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    saveNewCard: (data: { card: QuestionCard, topic: string }) => saveNewCard(dispatch, data)
})

export default connect(null, mapDispatchToProps)(AddCardScreen)