import * as React from "react"
import styled from "styled-components/native"
import { Button } from "react-native-material-ui"
import { QuestionCard } from "../utils/models"


const RootView = styled.View`
    flex: 4;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
`

const StyledText = styled.Text`
    font-size: 20px;
`

interface Props {
    question: QuestionCard,
    isAnswerVisible: boolean,
    setVisible: (yes: boolean) => void
}

const QuestionView = (props: Props) => {
    const question = props.question
    return props.isAnswerVisible ?
        <RootView>
            <StyledText>{question.answer}</StyledText>
            <Button accent text='View Question' onPress={() => props.setVisible(false)} />
        </RootView> :
        <RootView>
            <StyledText>{question.question}</StyledText>
            <Button accent text='View Answer' onPress={() => props.setVisible(true)} />
        </RootView>
}

export default QuestionView