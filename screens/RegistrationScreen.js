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

export default class RegistrationScreen extends React.Component {

  constructor(){
    super();
    this.state={
      'username':'',
      'email':'',
      'password':'',
      'passwordConfirmation':''
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
      <Text style={styles.getStartedText}>Sign Up</Text>

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
         underlineColorAndroid='transparent'
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
        <TouchableOpacity>

        <Button title="submit" onPress={this._handleSubmit} ><Text>Register</Text></Button>

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
developmentModeText: {
  marginBottom: 20,
  color: 'rgba(0,0,0,0.4)',
  fontSize: 14,
  lineHeight: 19,
  textAlign: 'center',
},
contentContainer: {
  paddingTop: 30,
},
welcomeContainer: {
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 20,
},
welcomeImage: {
  width: 100,
  height: 80,
  resizeMode: 'contain',
  marginTop: 3,
  marginLeft: -10,
},
getStartedContainer: {
  alignItems: 'center',
  marginHorizontal: 50,
},
homeScreenFilename: {
  marginVertical: 7,
},
codeHighlightText: {
  color: 'rgba(96,100,109, 0.8)',
},
codeHighlightContainer: {
  backgroundColor: 'rgba(0,0,0,0.05)',
  borderRadius: 3,
  paddingHorizontal: 4,
},
getStartedText: {
  fontSize: 17,
  color: 'rgba(96,100,109, 1)',
  lineHeight: 24,
  textAlign: 'center',
},
tabBarInfoContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 20,
    },
  }),
  alignItems: 'center',
  backgroundColor: '#fbfbfb',
  paddingVertical: 20,
},
tabBarInfoText: {
  fontSize: 17,
  color: 'rgba(96,100,109, 1)',
  textAlign: 'center',
},
navigationFilename: {
  marginTop: 5,
},
helpContainer: {
  marginTop: 15,
  alignItems: 'center',
},
helpLink: {
  paddingVertical: 15,
},
helpLinkText: {
  fontSize: 14,
  color: '#2e78b7',
},
});
