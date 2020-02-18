import React, { Component } from "react";
import {View,Image, Text, TextInput, StyleSheet, Button, TouchableOpacity, Dimensions, Picker } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default class CreateScreen extends React.Component {

    static navigationOptions = {
    };

constructor(props){
  super(props);

  this.state = {
    inputTitle: null,
    inputContent: "",
    images: [],
    color: 'white',
  };
}

 static navigationOptions = {
    title: 'Create post',
  };

  _buildPost = (newPost, refFunction) =>{
    for (let prop in newPost){
      if(newPost[prop] === null){ 
        alert('Wrong prop' + prop);
        return;
      }  
    }
    refFunction(newPost); // 'creator' is here
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      let massive = this.state.images;
      let input = this.state.inputContent;
      if(massive.length < 3){
        massive.push(result.uri);
        input+=" # ";
        this.setState({
            inputContent:input,
            images: massive});
      }
      return;  
    }
  };

  _showLoadedImages = function(){
    let images = this.state.images; // to not change state sraightly

     return images.map((image) => { // returning array of components
      return (
         <Image source={{ uri: image }} style={styles.imgUploaded} />
      );
    }); 
  }

  render() {
    const { navigation } = this.props;
    let refCreatePost;
    if(navigation.getParam('creator', null) && this.refCreatePost == null){
       refCreatePost = navigation.getParam('creator', null); // if first time creating post =>
    }                                                     // initilize function for creating

      return (
          <View style = {styles.container}>
              <View style = {styles.form}>
                  <View style = {{flex:1, flexDirection:"row", width:"100%"}}>
                      <Text style={styles.text}>What is your title?</Text>
                      <Picker
                          selectedValue={this.state.color}
                          style={{height: 50, width: 35}}
                          onValueChange={(itemValue, itemIndex) =>
                              this.setState({color: itemValue})
                          }>
                          <Picker.Item label="White" value="white" />
                          <Picker.Item label="Black" value="black" />
                      </Picker>
                  </View>
                  <TextInput
                      placeholder = "Title for post"
                      style={styles.inputTitle}
                      onChangeText={(text) => this.setState({inputTitle: text})} />
                  <Text style={styles.text}>Fill your article</Text>
                  <TextInput
                      multiline = {true}
                      numberOfLines = {10}
                      scrollEnabled = {true}
                      placeholder = "Content of post"
                      style={styles.inputContent}
                      onChangeText={(text) => this.setState({inputContent: text})}
                      value ={this.state.inputContent}/>
                  <View style={styles.imgControl}>
                      <TouchableOpacity
                          style = {styles.photoBtn}
                          onPress={this._pickImage}
                      >
                       <Ionicons name={"ios-images"} size={30} color={"white"} />
                      </TouchableOpacity>
                      {this._showLoadedImages()}
                  </View>
              </View>
              <TouchableOpacity
                  style={styles.btn}
                  onPress = {() => {
                      this._buildPost({
                          title:this.state.inputTitle,
                          content:this.state.inputContent,
                          images: this.state.images,
                          color: this.state.color
                      }, refCreatePost);
                      this.props.navigation.navigate("PostsScreen")}
                  }>
                  <Ionicons name={"ios-add"} size={25} color={"white"} />
              </TouchableOpacity>
          </View>
      );
  }
}
const styles = StyleSheet.create({
  container:{  
    width: "100%",
    height:"100%",
  },
  form:{
    flex: 1,
    width: "90%",
    alignSelf: 'center',
    alignItems: 'center',
  },
  imgControl:{
    alignSelf: 'flex-start',
    width:"90%",
    flex: 1,
    flexDirection: "row",
    marginTop:5,
    marginLeft: "5%",
    alignItems: 'flex-start',
  },
  inputTitle:{
    height: "7%",
    width:"90%",
    padding:5,
    marginTop:-30,
    fontSize: 16,
    borderRadius: 5,
    borderColor: '#9c88ff',
   
    borderWidth: 1
  },
  inputContent:{
    textAlignVertical: 'top',
    height: "60%",
    fontSize: 16,
    width:"90%",
      margin:5,
      padding:5,
    borderRadius: 5,
    borderColor: '#9c88ff',
    
    borderWidth: 1
  },
  btn:{
    width:60,
    height:60,
    borderRadius:30,

    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',

      bottom:"3%",
    left: Dimensions.get('window').width - 90,
   
    backgroundColor: '#8854d0'
  },
  photoBtn:{
    width:60,
    height:60,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'gray'
  },
  imgUploaded:{
    width:58,
    height:58,
    marginLeft: "3%",
      borderRadius:10,
  },
  text:{
     marginTop:10,
     alignSelf: 'flex-start',
     fontSize: 20,
     fontWeight: "bold",
  }

});

