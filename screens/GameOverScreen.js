import React from 'react';
import { View, StyleSheet, Text, Button, Image} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors'
import ButtonPrimary from '../components/ButtonPrimary';

const GameOverScreen = props => {
    return(
        <View style = {styles.screen}>
            <Text style = {styles.title}>GAME OVER</Text>
            <View style = {styles.imageContainer}>
                <Image resizeMode = "cover" style = {styles.image} source = {require('../assets/success.png')}/>
            </View>
            <View style = {styles.textContainer}>
                <Text style = {styles.text}>I pretended to guess your number in <Text style = {styles.highlight}>{props.guesses}</Text> attempts😏</Text>
            </View>
            <ButtonPrimary text = "Replay" onPress = {props.onReplay} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    title : {
        borderBottomWidth : 2,
        borderBottomColor : '#ccc',
        fontSize : 30,
        letterSpacing : 4,
        margin : 10,
        color : Colors.primary
    },
    image : {
        width : '100%',
        height : '100%'
    },
    imageContainer : {
        height : 300,
        width : 300,
        alignItems : 'center',
        justifyContent : 'center',
        overflow : "hidden",
        borderRadius : 150,
        borderColor : 'black',
        borderWidth : 3,
        marginVertical : 30
    },
    text : {
        fontSize : 18,
        marginVertical : 20,
        fontFamily : 'open-sans',
        fontWeight : 'bold',
        textAlign : 'center'
    },
    highlight : {
        color : Colors.primary
    },
    textContainer : {
        width : '80%',
    }
});

export default GameOverScreen;