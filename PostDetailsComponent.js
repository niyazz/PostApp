import React, { Component } from "react";
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';

export default class PostDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('post', 'Not an article').title, // push title of post to header place
    };
  };
  _structuredContent = (post) => {
    let positions = this._findImages(post.content,"#");
    let contents = [];
    let start = 0;
    for(let i = 0; i < positions.length; i++){
        let text = post.content.substring(start, positions[i]);
        text = text.trim();
        contents.push({
            p:text,
            img: post.images[i],
        });

        start = positions[i] + 1;

        if(i === (positions.length - 1)){
            contents.push({
                p:post.content.substring(start).trim(),
                img:null,
            });
        }
    }
      return contents.map((cont, i) => { // returning array of components
          if(cont.img != null) {
              return (
                  <View style = {( i === contents.length - 1)  ? styles.contentLast : styles.content}>
                      <Text style = {(post.color === "white") ? styles.textBlack : styles.textWhite}>{cont.p}</Text>
                      <Image
                          source = {{uri: cont.img}}
                          style = {styles.image}/>
                  </View>
              );
          }
          else{
              return (
                  <View style={( i === contents.length - 1) ? styles.contentLast : styles.content}>
                      <Text style={(post.color === "white") ? styles.textBlack : styles.textWhite}>{cont.p}</Text>
                  </View>
              );
          }
      });
  };

  _findImages = (string, tag) =>{ // finds in string special tag (#, <img>)
      let positions = [];
      let idx = string.indexOf(tag);
      while (idx !== -1) {
         positions.push(idx);
         idx = string.indexOf(tag, idx + 1);
      }
      return positions;
  };

  render() {
    const { navigation } = this.props;
    let poster = navigation.getParam('post', null); // taking a post from params and
                                                    // show it`s props <Text style = {styles.header}>{poster.content}</Text>
    return (
        <ScrollView style = {(poster.color === "white") ? styles.postWhite : styles.postBlack}>
            <Text style = {(poster.color === "white") ? styles.headerWhite : styles.headerBlack}>{poster.title}</Text>
                {this._structuredContent(poster)}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    postBlack:{
        padding: "5%",
        backgroundColor: "#6633FF"
    },
    postWhite:{
        padding: "5%",
        backgroundColor: "#fff"
    },
    content: {
        flex: 1,
        marginTop:"3%",
        alignItems: "center",
    },
    contentLast: {
        flex: 1,
        marginTop:"3%",
        alignItems: "center",
        marginBottom:"5%",
    },
    headerWhite:{
        fontWeight: "bold",

        color:"#000",
        fontSize: 24,
    },
    headerBlack:{
        fontWeight: "bold",
        color: "#fff",
        fontSize: 24,
    },
    textWhite:{
        fontSize: 18,
        color: "#fff",
        marginBottom:"3%",
    },
    textBlack:{
        fontSize: 18,
        color:"#000",
        marginBottom:"3%",
    },
    image:{
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height / 3,
    }
});
