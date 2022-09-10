import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import {colors, fonts} from '../styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

class SignUpView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      inputError: false,
      inputErrorMessage: '',
      loading: false
    };
  }

  render() {
    let state = this.state;
    return (
      <View style={styles.container}>
            <ImageBackground source={require('../assets/BackgroundImage.png')} resizeMode="cover" style={styles.image}>
                <Text style={styles.headerText}>Sign Up</Text>
                <Text style={{color: 'grey'}}>Create An account Here</Text>

                <TextInput 
                    onChangeText={val => {this.setState({email: val})}}
                    style={styles.input}
                    textContentType='emailAddress'
                    placeholder='Email' />
                
                <TextInput 
                    onChangeText={val => {this.setState({name: val})}}
                    style={styles.input}
                    textContentType='text'
                    placeholder='First name' />

                <TextInput 
                    onChangeText={val => {this.setState({password: val})}}
                    style={styles.input}
                    textContentType='password'
                    placeholder='Password'
                    secureTextEntry={true} />

                <TextInput 
                    onChangeText={val => {this.setState({confirmPassword: val})}}
                    style={styles.input}
                    textContentType='password'
                    placeholder='Confirm Password'
                    secureTextEntry={true} />

                <View style={{marginTop: 10}}/>

                {state.inputError ? (
                  <Text style={styles.errorText}>{state.inputErrorMessage}</Text>
                  ) : null}

                <Button
                  title='Sign up'
                  onPress={ 
                    () => this.signup()
                  }> </Button>

                <View style = {styles.lineStyle} />

                <Text>Already Sign Up?<Text style={{color: colors.blue}} onPress={() => this.toLogin()}> Sign In</Text></Text>

            </ImageBackground>
            <Spinner
              visible={state.loading}
            />
        </View>
      
    );
  }

  validateInputs = () => {
    let errors = false;
    let state = this.state;
    
    if (
      state.email.trim() == '' ||
      state.password.trim() == '' ||
      state.name.trim() == '' ||
      state.confirmPassword.trim() == '' 
    ) {
      errors = true;
      this.setState({
        inputError: true,
        inputErrorMessage: 'All fields can\'t be empty.',
      });
    } else if (state.password.toLocaleLowerCase() != state.confirmPassword.toLocaleLowerCase()) {
      errors = true;
      this.setState({
        inputError: true,
        inputErrorMessage: 'Passwords aren\'t matching.',
      });
    }

    return errors;
  };

  signup = () => {
    this.setState({loading : true})
    let state = this.state;
    if (!this.validateInputs()) {
      console.log(state.name + ' ' + state.email + ' ' + state.password + ' ' + state.confirmPassword)
      auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then(userRef => {
          console.log(userRef.user.email);
          console.log(userRef.user.uid);

          firestore()
            .collection('users')
            .doc(userRef.user.uid)
            .set({
              id : userRef.user.uid,
              name: state.name,
              email: state.email
            })
            .then(() => {
              this.uploadUserProfile(state.name)
                .then(() => {
                  this.setState({loading : false})
                  alert('Successfully registered.')
                  this.props.navigation.navigate('MainStack');
                })
                .catch(error => {
                  this.setState({loading : false})
                  alert(error.message);
                });
            })
            .catch(error => {
              this.setState({loading : false})
              alert(error.message);
            })
          
        })
        .catch(error => {
          this.setState({loading : false})
          alert(error.message);
        })
    };
  }

  toLogin = () => {
    this.props.navigation.navigate('SignIn')
  }

  uploadUserProfile = async (name) => {
    await auth()
      .currentUser
      .updateProfile({
        displayName : name
      });
    await auth().currentUser.reload();
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex:1, 
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 50
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    padding: 10, 
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    marginVertical:20,
    width: '100%'
  },
  errorText: {
    fontFamily: fonts.primaryLight,
    fontSize: 15,
    color: colors.red,
    marginBottom: 10,
    fontWeight: 'bold'
  },
});

export default SignUpView;