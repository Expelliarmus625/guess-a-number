import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { AppLoading } from 'expo';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
    'anydore' : require('./assets/fonts/Anydore.otf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [tries, setTries] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (<AppLoading startAsync = {fetchFonts} onFinish = {() => setDataLoaded(true)} onError = {console.log('err')}/>);
  }

  const newGameHandler = () => {
    setTries(0);
    setUserNumber(null);
  };
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = guesses => {
    setTries(guesses);
  };

  let content = <StartGameScreen onStartGame = {startGameHandler} />;

  if(userNumber && tries <= 0){
    content = <GameScreen userInput = {userNumber} onGameOver = {gameOverHandler}/>;
  }
  else if(tries > 0){
    content = <GameOverScreen guesses = {tries} onReplay = {newGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="GUESS A NUMBER" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
