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
      email:'',
      'newTitle':''
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
  .then((response) => response.json() ) 
  .then((responseJson) => {
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
      <View style={listElement} key={this.id}>
      <TouchableOpacity onPress={()=>{this._displayList(x.id,this.state.email)}}>

      <Text style={styles.listText}>{x.title}</Text>

      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this._deleteList(x.id,this.state.email)}}>
      <Ionicons name="md-trash" style={styles.deleteIcon}/>
      </TouchableOpacity>
      </View>
      ); 
  });
  return ( 
    <View>
    <View style={styles.header}>
    
    </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <View style={styles.addElementContainer}>
          <TextInput
      placeholder="List Title"
       underlineColorAndroid='transparent'
       style={styles.addList}
        onChangeText={ TextInputValue =>
       this.setState({newTitle : TextInputValue }) }
       />
    <TouchableOpacity onPress={()=>{this._addList(this.state.email)}}>
      <Ionicons name="md-add" style={styles.plus}/>
      </TouchableOpacity>
    </View>

    {lists}

    </ScrollView>
    </View>

    );
}

_addList=(email)=>{
  fetch("http://brightslabsdemo.atwebpages.com/php/addList.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      "payload": {'email':email, 'title':this.state.newTitle}
    })
  })

  .then((response) =>response.json()) 
  .then((responseJson) => {

    console.log(responseJson)
    responseJson=JSON.parse(responseJson.replace(/'/g,'"'));
    if (responseJson.status=="success"){
      let id=responseJson.message;
      let listTitles=this.state.listTitles;
      listTitles.push({id:id, title:this.state.newTitle})
      this.setState({listTitles:listTitles});
    }
  })
  .catch((error) => {
    console.error(error);
  });
}
_displayList=(title,email)=>{

 this._storeListName(title,email);
 this.props.navigation.navigate("SingleList");


}


_deleteList=(id,email)=>{
  fetch("http://brightslabsdemo.atwebpages.com/php/deleteList.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      "payload": {'email':email,'id':id}
    })
  })
  .then((response) =>response.json()) 
  .then((responseJson) => {
    console.log(responseJson)
    responseJson=JSON.parse(responseJson.replace(/'/g,'"'));
    if (responseJson.status=="success"){
      let listTitles=this.state.listTitles;
      let filteredItems = listTitles.filter(item => item.id !== id);
      console.log('filtered')
      console.log(filteredItems);
      console.log('filtered')
      console.log(this.state)
      this.setState({listTitles:filteredItems});
    }
  })
  .catch((error) => {
    console.error(error);
  });

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
  addElementContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
 
    height:40
  },
  header:{
    height:100,
    backgroundColor:"#463f42",
    alignItems:'flex-end',  
    justifyContent:'center',
    paddingRight:20,
    paddingLeft:20

  },
  plus:{
    fontSize:40,
    flex:2,
    paddingLeft:5,
    paddingRight:5
  },

  listElement:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:20,
    paddingRight:20,

    height:40

  },
  deleteIcon:{
    alignSelf:'flex-end',
    fontSize:20,
    color:"#463f42"
  },
  listText:{
    fontSize:20,
    color:'white'
  },
  addList:{
   textAlign: 'center',
   height: 40,
   borderColor:'grey',
   fontSize: 20, 
   borderWidth: 0.5,
   flex:8

 },
 container: {
 },
 logo:{
  flex:1, 
  alignSelf:'stretch',
  height: undefined,
  width: undefined
},
contentContainer: {

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

