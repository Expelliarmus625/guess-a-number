import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const ButtonPrimary = props => {
    return <TouchableOpacity onPress = {props.onPress}>
        <View style = {{...props.style, ...styles.button}}>
            <Text style = {styles.buttonText}>{props.text}</Text>
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    button : {
        backgroundColor : Colors.accent,
        paddingVertical : 12,
        paddingHorizontal : 30,
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : "center"
    },
    buttonText : {
        color : 'white',
        fontSize : 20,
        fontFamily : 'open-sans',
        fontWeight : 'bold',
        justifyContent : 'center'
    }
})

export default ButtonPrimary;