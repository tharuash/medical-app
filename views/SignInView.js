import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button } from 'react-native';
import { Alert } from 'react-native-web';
import { colors, fonts } from '../styles';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';

class SignInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      inputError: false,
      inputErrorMessage: '',
      loading: false,
    };
  }

  render() {
    let state = this.state;
    return (
      <View style={styles.container}>
            <ImageBackground source={require('../assets/BackgroundImage.png')} resizeMode="cover" style={styles.image}>
                <Text style={styles.headerText}>Sign In</Text>
                <Text style={{color: 'grey'}}>Welcome Back</Text>

                <TextInput 
                    onChangeText={val => {this.setState({email: val})}}
                    style={styles.input}
                    textContentType='emailAddress'
                    placeholder='Email'
                    value={state.email} />

                <TextInput 
                    onChangeText={val => {this.setState({password: val})}}
                    style={styles.input}
                    textContentType='password'
                    placeholder='Password'
                    secureTextEntry={true}
                    value={state.password}/>
                <View style={{marginTop: 10}}/>
                
                {state.inputError ? (
                  <Text style={styles.errorText}>{state.inputErrorMessage}</Text>
                  ) : null}
              
                <Button
                  title='Sign In'
                  style={styles.buttonStyle}
                  onPress={() => this.signin()} />

                <View style = {styles.lineStyle} />

                <Text>New Member?<Text style={{color: colors.blue}} onPress={() => this.toRegister()}> Sign Up</Text></Text>
                
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
      state.password.trim() == '' 
    ) {
      errors = true;
      this.setState({
        inputError: true,
        inputErrorMessage: 'Email or password can\'t be empty.',
      });
    } else if (
      state.email.trim().toLowerCase() == 'abc' &&
      state.password.trim().toLocaleLowerCase() == 'abc' 
    ) {
      errors = true;
      this.setState({
        inputError: true,
        inputErrorMessage: 'Incorrect email or password',
      });
    }

    return errors;
  };

  signin = () => {
    this.setState({loading : true})
    let state = this.state;
    if (!this.validateInputs()) {
      auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then(userRef => {
          

          this.setState({loading : false, email : '', password : ''});
          this.props.navigation.navigate('MainStack');
        })
        .catch(error => {
          this.setState({loading : false})
          alert(error.message);
        })
    };
  }

  toRegister = () => {
    this.props.navigation.navigate('SignUp')
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
  buttonStyle: {
    borderRadius: 15
  },
  errorText: {
    fontFamily: fonts.primaryLight,
    fontSize: 15,
    color: colors.red,
    marginBottom: 10,
    fontWeight: 'bold'
  },
});

export default SignInView;