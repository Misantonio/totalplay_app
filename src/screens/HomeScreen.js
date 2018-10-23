import React, {Component} from 'react';
import {Platform, PermissionsAndroid, Alert, Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './LoginScreen';
import Chat from '../chat';

 
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevScreenTitle: this.props.navigation.state.params.prevScreenTitle,
      people: this.props.navigation.state.params.people,
    };
}
  render() {
    return (
      <View style={{ flex:1 }}>          
        <Chat/>
      </View>
    );
  }
}

class MapScreen extends React.Component {
  state = {
    longitude: '',
      latitude: ''
    }

  render() {            
    return (      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>                
  
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
      </View>
    </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Chat: { screen: HomeScreen },
  Mapa: { screen: MapScreen },
  Config: { screen: SettingsScreen },
  
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Chat') {
        iconName = 'ios-chatbubbles';
      } else if (routeName === 'Config') {
        iconName = 'ios-settings';
      }
      else if (routeName === 'Mapa') {
        iconName = 'ios-map';
      }      
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'gray',
  },
}
);
