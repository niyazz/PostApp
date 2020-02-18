
import React, { Component } from "react";
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import Post from "./PostComponent";
import {Ionicons} from "@expo/vector-icons";


export default class PostersScreen extends React.Component {

 static navigationOptions = {
    title: 'Posts',
     headerStyle: {
         backgroundColor: '#6633FF',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
         fontWeight: 'bold',
     },
  };

  state = {
    posts : [
      {title: "About my new Winter House",
       content: "Buying a new bike can be difficult. These days, the market has become so diverse that one. # These days, the market has become so diverse that one can quickly feel overwhelmed. Before rushing to purchase a new bike, you should stop and consider a few things. Running expert Sascha Wingenfeld tells you what to look out for – because cycling is a great addition to your run training!",
       images: ["https://wordpress.accuweather.com/wp-content/uploads/2019/03/crater-lake-snow.jpg"],
       color: "black"},
      {title: "JavaScript best practices",
       content: "For many front-end developers, JavaScript was their first taste of a scripting and/or" +
           " interpretive language. " +
           "To these developers, the concept and " +
           "implications of loosely typed variables may be second nature. " +
           "However, the explosive growth in demand for modern web applications has resulted in a growing number of back-end" +
           " developers that have had to dip their feet into the pool of client-side technologies." +
           " Many of these developers are coming from a background of strongly typed languages, such as C# or" +
           " Java, and are unfamiliar with both the freedom and the potential pitfalls involved in working with loosely typed variables.",
       images: ["https://res.cloudinary.com/practicaldev/image/fetch/s--ZmPcIbAW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dzone.com/storage/temp/12334613-971.jpg"],
       color: "white"},
        {title: "JavaScript best practices",
            content: "For many front-end developers, JavaScript was their first taste of a scripting and/or" +
                " interpretive language. " +
                "To these developers, the concept and " +
                "implications of loosely typed variables may be second nature. " +
                "However, the explosive growth in demand for modern web applications has resulted in a growing number of back-end" +
                " developers that have had to dip their feet into the pool of client-side technologies." +
                " Many of these developers are coming from a background of strongly typed languages, such as C# or" +
                " Java, and are unfamiliar with both the freedom and the potential pitfalls involved in working with loosely typed variables.",
            images: ["https://res.cloudinary.com/practicaldev/image/fetch/s--ZmPcIbAW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dzone.com/storage/temp/12334613-971.jpg"],
            color: "white"}
    ],
  }

  _createPost = (poster) => { // adding a posts in start of array
     let postes = this.state.posts; // to not change state sraightly
     postes.unshift(poster);

      this.setState({
        posts: postes
      });
  };
_deletePost = (posts, i) =>{
    posts.splice(i,1);
    this.setState({posts: posts });
};
  _showPosts = function(){
    let posts = this.state.posts; // to not change state sraightly

     return posts.map((post, i) => { // returning array of components
      return (
        <TouchableHighlight  onPress = {()=>this._openPost(post)}>
            <View style = {(i % 2 === 0) ? styles.postMod : styles.post}>
                <TouchableOpacity  style={styles.btnDelete} onPress =  {()=>this._deletePost(posts, i)}>
                    <Ionicons name={"ios-close"} size={25} color={"#6633FF"} />
                </TouchableOpacity>
                <Post post={post}/>
            </View>

        </TouchableHighlight>
      );
    }); 
  };

   _openPost = (poster) =>{
    this.props.navigation.navigate("PostPageScreen", {post: poster});
  };

  render() {
    return (
        <View style = {{height: "100%"}}>
           <ScrollView style = {{backgroundColor: "#CCCCFF"}}>
              <View style = {styles.container}>
                  {this._showPosts()}
               </View>
           </ScrollView>   
           <TouchableOpacity  style={styles.btn} onPress = {() =>
              this.props.navigation.navigate("CreatingScreen",
              {creator: this._createPost})}>
               <Ionicons name={"ios-add"} size={25} color={"white"} />
           </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    post:{
        width: "100%",
        height:Dimensions.get('window').height/2.75,
        marginTop:10,
        borderRadius: 10
    },
    postMod:{
        width: "100%",
        height:Dimensions.get('window').height/2.75,
        marginTop:20,
        borderRadius: 10
    },
  container:{
         paddingBottom: 20,
    width: "91%",
    flex: 1,
    alignSelf: 'center',

  },
  btn:{
    width:60,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom:5,
    left: Dimensions.get('window').width - 80,
    borderRadius:30,
    flex:1,
    backgroundColor: '#6633FF',
  },
    btnDelete:{
        width:20,
        height:20,
        top: "2.5%",
        left: "92%",
        zIndex: 1,
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        borderRadius:20,
        flex:1,
        backgroundColor: '#CCCCFF',
    },
  icon:{
    color: 'white'
  }
});
