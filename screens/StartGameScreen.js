import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, Keyboard} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import ButtonPrimary from '../components/ButtonPrimary';

const StartGameScreen = props => {

    const [enteredText , setEnteredText] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelecteNumber] = useState();

    const enteredTextHandler = inputText =>{
        setEnteredText(inputText.replace(/[^0-9]/g, ''));
    };

    const resetHandler = () =>{
        setEnteredText('');
        setConfirmed(false);
    }

    const confirmedHandler = () =>{
        const chosenNumber = parseInt(enteredText);
        if(isNaN(chosenNumber)|| chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid Number', 'Please enter a number between 1 and 99.', [{text : 'Okay', style : 'destructive', onPress : resetHandler}]);
            return;
        }
        Keyboard.dismiss();
        setConfirmed(true);
        setSelecteNumber(chosenNumber);
        setEnteredText('');
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = (
            <Card style = {styles.summary}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <ButtonPrimary style = {{color : Colors.primary}} text = "Start Game" onPress = {() => props.onStartGame(selectedNumber)}/>
            </Card>
        );
    }  
    return(
        <View style = {styles.screen}>
            <Text style = {styles.title}>Start Your Stupid Game</Text>
            <Card style = {styles.inputContainer}>
                <Text>Enter a number but don't tell me</Text>
                <Input 
                    style= {styles.input}
                    blurOnSubmit = {true}
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    keyboardType =  "numeric"
                    maxLength = {2}
                    onChangeText = {enteredTextHandler}
                    value = {enteredText}
                />
                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button color = {Colors.accent} title= "Reset"  onPress = {resetHandler}/>
                    </View>
                    <View style = {styles.button}>
                        <Button color = {Colors.primary} title= "Confirm"  onPress = {confirmedHandler}/>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems : 'center'
    },
    title : {
        fontSize : 20,
        marginVertical : 10,
        fontFamily : 'open-sans-bold'
    },
    inputContainer : {
        width : 350,
        alignItems : 'center',
        paddingVertical : 30
    },
    buttonContainer : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15,
        paddingVertical : 20
    },
    button : {
        flex : 1,
        paddingHorizontal : 5
    },
    input : {
        textAlign : 'center',
        width : 50,
    },
    summary : {
        width : 350,
        marginTop : 20,
        alignItems : 'center'
    }

});

export default StartGameScreen;