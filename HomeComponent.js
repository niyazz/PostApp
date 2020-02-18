
import React, { Component } from "react";
import LoginForm from "./LoginComponent"
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
            <Text>Home Screen</Text>
            <Button title="Sign out" onPress={this._signOutAsync} />
          </View>   
      </View>   
    );
  }
    _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row', 
  },
  form:{
    flex: 1,
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});