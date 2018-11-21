import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  View,
  Icon,
  Button
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class RegistrationScreen extends React.Component {

  constructor(){
    super();
    this.state={
      email:'',
      'password':'',
      'passwordConfirmation':'',
      response:{}
    }
        this._bootstrapAsync();

  }
    _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.mainTitleContainer}>
      <Image style={styles.logo} source={require('../assets/images/toDoListIcon.png')}   resizeMode="contain" />

      <Text style={styles.mainTitle}>Mr X 's to do list</Text>

      </View>

      <View style={styles.formContainer}>
    {/*this._maybeRenderDevelopmentModeWarning()*/}

    <TextInput
    placeholder="Email"
    onChangeText={ TextInputValue =>
     this.setState({email : TextInputValue }) }
     underlineColorAndroid='transparent'
     style={styles.formTextInput}
     />
     <TextInput
     placeholder="Password"
     onChangeText={ TextInputValue =>
       this.setState({password: TextInputValue }) }
       underlineColorAndroid ='transparent'
       secureTextEntry={true}
       style={styles.formTextInput}

       />
       <TextInput
       placeholder="Confirm Password"
       onChangeText={ TextInputValue =>
         this.setState({passwordConfirmation: TextInputValue }) }
         underlineColorAndroid='transparent'
         secureTextEntry={true}
         style={styles.formTextInput}

         />
         <TouchableOpacity underlayColor='#fff' style={styles.submitButton } onPress={this._handleSubmit}>
         <Text style={styles.centerText}>Create Account</Text>
         </TouchableOpacity>


         <View style={styles.backendMessageContainer}> 
         <Text style={styles.icons}>
         <Ionicons  name={
          this.state["response"].status==null?'' :this.state["response"].status=="success" ? 'md-checkmark' : 'md-warning'}/> 
         </Text>
         <Text style={styles.backendMessage}>

        {this.state["response"].message} 
        </Text>
        </View>
        </View>
        </ScrollView>


        </View>
        );
  }

/*_maybeRenderDevelopmentModeWarning() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
      Learn more
      </Text>
      );

    return (just changed my password hoping it would
      <Text style={styles.developmentModeText}>
      Development mode is enabled, your app will be slower but you can use useful development
      tools. {learnMoreButton}
       </Text>
      );
  } else {
    return (
      <Text style={styles.developmentModeText}>
      You are not in development mode, your app will run at full speed.
      </Text> 
      );
  }
}*/
_handleSubmit=  () => {
      this.setState({response:{}})

  fetch("http://brightslabsdemo.atwebpages.com/php/signup.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      "payload": this.state
    })
  })
  .then((response) =>  response.json())   
  .then((responseJson) => {
    console.log(responseJson);
    this.setState({'response':JSON.parse(responseJson.replace(/'/g,'"')) });

  })
  .catch((error) => {
    console.error(error);
  });
}

_handleLearnMorePress = () => { 
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
};

_handleHelpPress = () => {    
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
};
}

const styles = StyleSheet.create({
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
  marginTop: 20,
  alignItems:'center',
 
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
centerText:{

  fontSize:20,
  textAlign:'center',
  color:'white',
  alignItems:'center',

},
icons:{
    fontSize:16,
    marginRight:5,
    color: "#0E8044",
}
});
