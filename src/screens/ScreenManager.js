import React, { Component } from 'react';
import {  Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../../images/logo.png')}
        style={{ width: 30, height: 30,
          justifyContent: 'center', 
          alignItems: 'center',    }}
      />
    );
  }
}

const Screens = StackNavigator({
  LoginScreen: {screen: LoginScreen},
  HomeScreen: {screen: HomeScreen}
},
LoginScreen.navigationOptions = {
  header: null
  },
HomeScreen.navigationOptions = {
  header: null,
  // headerTitle: <LogoTitle />,
  headerLeft: null
  }
);

export default Screens;