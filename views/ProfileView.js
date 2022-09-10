import React from 'react';
import { StyleSheet, Text, View, ScrollView, Card, Image , Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles'
import auth from '@react-native-firebase/auth';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderHeader = () => {

    return (
      <View style={styles.headerContainer}>
       
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require('../assets/dp.jpeg')}
            />
            <Text style={styles.userNameText}>{auth().currentUser.displayName}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="mail"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                {auth().currentUser.email}
                </Text>
              </View>
              
            </View>
            <View style={{marginTop: 30}}/>
            <Button title='Sign Out'  onPress={() => this.signout()} />
          </View>
        
      </View>
    )
  }

  render() {
    return (
     
        <View style={styles.container}>
          <View containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </View>
        </View>
     
      
    );
  }

  signout = () => {
    auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('AuthStack');
      })
      .catch(error => {
        alert(error.message);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  
  },
  
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  detailsRow: {
    marginTop : 10,
  },
  userCityRow: {
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
    marginTop: 30
  },
});

export default ProfileView;