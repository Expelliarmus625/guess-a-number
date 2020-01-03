import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Header = props => {
    return(
        <View style = {styles.headerContainer}>
            <Text style = {styles.headerText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer : {
        width : '100%',
        height : 90,
        paddingTop : 36,
        backgroundColor : '#f7287b',
        justifyContent : 'center',
        alignItems : 'center',
    },
    headerText : {
        color : 'white',
        fontSize : 18,
        letterSpacing : 4,
    }   
});
export default Header;