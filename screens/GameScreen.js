import React ,{ useState, useRef, useEffect }from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import ButtonPrimary from '../components/ButtonPrimary';
import { Ionicons } from '@expo/vector-icons'
import Icons from '../constants/Icons';

const generateRandom = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const random = Math.floor(Math.random() * (max - min)) + min;
    
    if(random === exclude){
        return generateRandom(min, max, exclude);
    }
    else{
        return random;
    }
    
};

const generateListItem = (value, roundNum) => (
    <View key = {value} style = {styles.listItem}>
        <Text>#{roundNum}.</Text>
        <Text>{value}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandom(1,100, props.userInput);
    const [guess, setGuess] = useState(initialGuess); 
    const [guessList, setGuessList] = useState([initialGuess]);

    const currentHigh = useRef(1);
    const currentLow = useRef(100);
    
    const { userInput, onGameOver } = props;

    useEffect(() => {
        if(guess === userInput){
            props.onGameOver(guessList.length);
        }
    }, [guess, userInput, onGameOver ]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && guess > props.userInput) || (direction === 'higher' && guess < props.userInput)){
            Alert.alert('You Little Shit', 'I know the actual number. I\'m only pretending to guess', [{text : 'Sorry', style : 'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = guess;
        }
        else{
            currentLow.current = guess + 1;
        }
        const nextNumber = generateRandom(currentLow.current,currentHigh.current,guess);
        setGuessList(curGuessList => [nextNumber, ...curGuessList]);
        setGuess(nextNumber);
    };
    return(
        <View style = {styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{guess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
                <ButtonPrimary text = {Icons.higher} onPress = {nextGuessHandler.bind(this,'higher')}/>
                <ButtonPrimary text = {Icons.lower} onPress = {nextGuessHandler.bind(this, 'lower')}/> 
            </Card>
            <View style = {styles.listContainer}>    
                <ScrollView>
                    {guessList.map( (guess, index )=> generateListItem(guess, index + 1))} 
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        alignItems : 'center',
        padding : 10
    },
    buttonContainer : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginTop : 20,
        width : 300,
        maxWidth : '80%'
    },
    listItem : {
        padding : 15,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
        width : 300,
        backgroundColor : '#f0f0f0',
        flexDirection : 'row',
        justifyContent : 'space-around'
    },
    listContainer : {
        height : 350,
        borderWidth : 1,
        marginTop : 30,
        borderRadius : 20,
        overflow : "hidden",
    }
});

export default GameScreen;