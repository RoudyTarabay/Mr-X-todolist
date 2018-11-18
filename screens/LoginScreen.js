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
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {

  constructor(){
    super();
    this.state={
      'username':'',
      'password':'',
    }
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeContainer}>
      <Text style={styles.getStartedText}>Login</Text>

      </View>

      <View style={styles.getStartedContainer}>
      {/*this._maybeRenderDevelopmentModeWarning()*/}
      <TextInput
      placeholder="Username"
      onChangeText={ TextInputValue =>
       this.setState({username : TextInputValue }) }
       underlineColorAndroid='transparent'
       style={styles.formTextInput}
       />

       <TextInput
       placeholder="Password"
       onChangeText={ TextInputValue =>
         this.setState({password: TextInputValue }) }
         underlineColorAndroid='transparent'
         secureTextEntry={true}
         style={styles.formTextInput}

         />

        <TouchableOpacity>

        <Button title="submit" onPress={this._handleSubmit} ><Text>Login</Text></Button>

         </TouchableOpacity>

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
  fetch("http://brightslabsdemo.atwebpages.com/php/login.php", {
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
    .then((response) => response.json())   
    .then((responseJson) => {
      console.log(responseJson);
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
});
