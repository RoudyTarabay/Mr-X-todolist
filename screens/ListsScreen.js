import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { MonoText } from '../components/StyledText';

export default class ListsScreen extends React.Component {

  constructor(props){
    super(props );
    this.id=0;

    this.state={
      listTitles:[],
      email:''
    };
    this._bootstrapAsync();
  } 

  _bootstrapAsync = async () => {
   const email=await AsyncStorage.getItem('email');

   console.log(email);

   this.state.email=email;
   this.fetchList();

 };

 fetchList= ()=>{

  fetch("http://brightslabsdemo.atwebpages.com/php/getLists.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      "payload": {'email':this.state.email}
    })
  })
  .then((response) =>response.json()) 
  .then((responseJson) => {
    console.log('aaaaaa')
    console.log(responseJson);
    console.log('bbbbb');  
    console.log(JSON.parse(responseJson.replace(/'/g,'"') ))
    this.setState({'listTitles':JSON.parse(responseJson.replace(/'/g,'"') ).message});

    console.log(this.state);

  })
  .catch((error) => {
    console.error(error);
  });
}
static navigationOptions = {
  header: null,
};

render() {
  let colors = ['#9b9922', '#d5cd87'];



  let lists=this.state.listTitles.map((x)=>{
    this.id=this.id+1;
    let listElement = [
    styles.listElement, 
    {'backgroundColor': colors[this.id % colors.length]}
    ];

    return(
      <TouchableOpacity key={this.id} onPress={()=>{this._displayList(x,this.state.email)}}>
      <View style={listElement} >
      <Text style={styles.listText}>{x}</Text>

      </View>
      </TouchableOpacity>
      ); 
  });
  return ( 
    <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    {lists}

    </ScrollView>


    </View>
    );
}
_displayList=(title,email)=>{

 this._storeListName(title,email);
 this.props.navigation.navigate("SingleList");


}
_storeListName= async (title,email)=>{
  await AsyncStorage.setItem('listTitle', title);
  await AsyncStorage.setItem('email', email);


}


} 

/*const styles = StyleSheet.create({
  formTextInput:{
   textAlign: 'center',
   width: '90%',
   marginBottom: 7,
   height: 40,
   borderRadius: 5 ,
   fontSize: 20,

 },
 container: {
  flex: 1,
  backgroundColor: '#fff',
},

contentContainer: {
  paddingTop: 30,
},
welcomeContainer: {
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 20,

},
getStartedContainer: {
  alignItems: 'center',
  marginHorizontal: 50,
},
homeScreenFilename: {
  marginVertical: 7,
},

getStartedText: {
  fontSize: 17,
  color: 'rgba(96,100,109, 1)',
  lineHeight: 24,
  textAlign: 'center',
},
});*/ 

const styles = StyleSheet.create({
  listElement:{
    flex:1,
    height:40,
    justifyContent: 'center',
    paddingLeft:20

  },
  listText:{
    fontSize:20,
    color:'white'
  },
  formTextInput:{
   textAlign: 'center',
   width: '100%',
   marginBottom: 7,
   height: 40,
   borderColor:'grey',
   fontSize: 20, 
   borderWidth: 0.5,
   borderRadius:5   


 },
 container: {
  flex: 1,
  backgroundColor: '#fff',
},
logo:{
  flex:1, 
  alignSelf:'stretch',
  height: undefined,
  width: undefined
},
contentContainer: {
  paddingTop: 30, 
},
mainTitleContainer: {
  flex:1,
  height: 150,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 20,

},  
formContainer: {
  alignItems: 'center',
  marginHorizontal: 50,
  marginTop:40
},
homeScreenFilename: {
  marginVertical: 7,
},

mainTitle: {
  fontSize: 24,
  color: 'rgba(96,100,109, 1)',
  lineHeight: 24,
  textAlign: 'center',
  fontStyle:'italic'
},
submitButton:{
  width:'100%',
  height: 40,
  flex:1,
  borderRadius:5,
  backgroundColor:"#0E8044",
  color:"#0E8044",
  alignItems:'center',

}, 
centerText:{
  fontSize:20,
  textAlign:'center',
  color:'white',
  alignItems:'center',
  paddingBottom : 20

},
backendMessage:{
  color: "#0E8044",
  fontSize:16

},
backendMessageContainer:{
  width: "100%",
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
},

icons:{
  fontSize:16,
  marginRight:5,
  color: "#0E8044",
}
});

