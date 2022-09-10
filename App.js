import React from 'react';
import RootNavigation from './navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  render() {
    return (
      <RootNavigation/>
    );
  }

  componentDidMount(){
    SplashScreen.hide();
  }
  
}

