import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,

} from 'react-native';

export default class LoginScreen extends Component{
static navigationOptions = {
    header: null,
  };

  render(){
    return(
      <View style = {styles.form}>
        <Text style={styles.header}>Login</Text>
        <TextInput style={styles.input} secureTextEntry = {false} placeholder = "Enter your username" /> 
        <TextInput style={styles.input} secureTextEntry = {true} placeholder = "Enter your secret password" /> 
        <TouchableOpacity style={styles.button} onPress={this._signInAsync} >
         <Text style={styles.text} >Sign In</Text>
       </TouchableOpacity>
      </View>   
    );
  }
    _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  form:{
    flex: 1,
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:200,
    padding: 5,
    margin:8,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
  },
  header:{
    fontSize: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  button:{
    textAlign: 'center',
    padding: 8,
    marginTop: 8,
    backgroundColor: '#00a8ff',
  },
  text:{
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  }
});
