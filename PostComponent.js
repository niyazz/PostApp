import React, { Component } from "react";
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

export default class Post extends React.Component {

  cuttedContent = (str, tag) =>{
    while(str.indexOf(tag) !== -1)
        str = str.replace(tag,"");
    return str.substring(0, 100) + '...';
  };

  render() {
    return (
     <ImageBackground source={{uri: this.props.post.images[0]}} 
      style={styles.post}
      imageStyle={{opacity: 1, borderRadius: 10}}>
          <Text style = {{fontSize: 18,
                          width: "80%",
                          fontWeight: "bold",
                          textTransform: 'uppercase',
                          color:this.props.post.color}}>
                            {this.props.post.title}
          </Text>
          <Text style = {{ 
              width: "80%",
              marginBottom:"10%",
              fontSize: 12,
              color:this.props.post.color}}> 
              {this.cuttedContent(this.props.post.content, '#')}
          </Text>

       </ImageBackground>
    );
  }
 
}


const styles = StyleSheet.create({
  post:{
    flex:1,
    width: "100%",
    height: "100%",
    justifyContent:'flex-end',
    alignItems: 'center', 
  },
  header:{
   
  },
  content:{
   
  }
});
