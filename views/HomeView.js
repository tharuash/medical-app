import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {MenuItem} from '../components'
import {colors} from '../styles'
import auth from '@react-native-firebase/auth';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const icons = {
      icon1 : require('../assets/icon1.png'),
      icon2 : require('../assets/icon2.png'),
      icon3 : require('../assets/icon3.png'),
      icon4 : require('../assets/icon4.png')

    }
    return (
      <View style={styles.container}>
           
        <Text style={styles.headerText}>Hi {auth().currentUser.displayName}</Text>

        <MenuItem name="Take Care of your health" image={icons.icon1} />
        <MenuItem name="Medical History" image={icons.icon2} onPress={() => {this.props.navigation.navigate('History')}} />
        <MenuItem name="Medical Records" image={icons.icon3} onPress={() => {this.props.navigation.navigate('Records')}} />
        <MenuItem name="Prescription Recognition" image={icons.icon4} onPress={() => {this.props.navigation.navigate('Prescription')}} />
            
    </View>
      
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10
  }
});

export default HomeView;