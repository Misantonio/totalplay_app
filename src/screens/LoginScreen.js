

import React, { Component } from 'react';
import {  Image,  StyleSheet,  Text,TextInput, KeyboardAvoidingView, View,  TouchableOpacity, StatusBar } from 'react-native';

var people = [
  {name: 'Quang Vi', age: 29},
  {name: 'Sơn Tùng', age: 24},
];


export default class LoginScreen extends Component {
  render() {
    const { navigate } = this.props.navigation

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>            

      <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
      <Image style={styles.logo} 
             source={require('../../images/logo.png')} 
      />  
      <View style= {styles.regform}>                   
          <TextInput 
          style={styles.textInput} 
          placeholder="email" 
          placeholderTextColor="rgba(255,255,255,0.7)" 
          />
          <TextInput 
          style={styles.textInput} 
          placeholder="password" 
          placeholderTextColor="rgba(255,255,255,0.7)" 
          />        
        </View>       
      </View>
      
      <TouchableOpacity style={styles.caja} onPress={() => navigate('HomeScreen', {prevScreenTitle: 'Main Screen', people: people})}>            
              <Text style={styles.textButton}  >
                  Continuar
              </Text>            
      </TouchableOpacity>
      <View>            
          <Text style={styles.subtitle} >Powered by Nearshore</Text>
      </View>
  </View>
</KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
  container:{        
    flex: 1,   
    backgroundColor: 'white',        
},
  wrapper:{
        backgroundColor: '#EA2027',
        opacity:.9,
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    title:{
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle:{
        color: 'white',        
        fontWeight: '200',
        paddingBottom: 20
    },
    titleWrapper:{
        justifyContent: 'center',
        flex:1
    },
    submit:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      textButton:{
          color:'red',
          textAlign:'center',
          fontSize: 20,
          justifyContent: 'center', 
          alignItems: 'center',
      },
   
      regform:{
        alignSelf:'stretch',
      },
      header:{      
        fontSize:24,
        color:'#fff',
        paddingBottom:0,
        marginBottom:80,
      },
      caja:{
        height: 40, 
        width: "80%", 
        borderColor: 'white', 
        borderWidth: 2, 
        borderRadius: 20,
        marginBottom: 20,         
        backgroundColor: 'white',
        justifyContent: 'center', 
        alignItems: 'center',
      
  
      },
      textInput:{
        alignSelf:'stretch',
        height:40,
        marginBottom:30,
        color: '#fff',
        borderBottomColor:'#f8f8f8',
        borderBottomWidth:1,
      },
});