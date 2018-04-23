import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class SearchInupt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    handleInput = text => {
        this.setState({
            input: text
        })
    }

    render() {
        return (
            <TextInput
                /*  tramite onChangeText ciò che viene scritto viene inserito in input.
                    handleInput non viene richiamata ma viene passata a TextInput   */ 
                onChangeText={this.handleInput}
                /*  Quando si preme invio viene richiamata la funzione passata a SearchInput 
                    da App che prende in input il testo scritto finora */
                onSubmitEditing={() => this.props.onSubmit(this.state.input)}
            />
        )
    }
}