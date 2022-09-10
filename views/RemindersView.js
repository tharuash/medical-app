import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {colors} from '../styles'
import {Reminder} from '../components'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

class RemindersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      reminders: [],
    };
  }

  render() {
    let state = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          style={{backgroundColor: colors.white, paddingHorizontal: 15}}
          data={state.reminders}
          renderItem={({item}) => (
            <Reminder
              id={item.id}
              reminder={item.reminder}
            />
          )}
        />
         <Spinner
              visible={state.loading}
            />
      </View>
    );
  }

  componentDidMount() {
    this.setState({loading : true})
    firestore()
      .collection('reminders')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        let reminders = []
        querySnapshot.forEach((documentSnapshot, index) => {
          let data = {
            id : index,
            reminder : documentSnapshot.data().text
          }
          reminders.push(data)
        })
        this.setState({reminders: reminders, loading : false})
      })
      .catch(error => {
        this.setState({loading : false})
        alert(error.message)
      })
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
    fontWeight: 'bold'
  }
});

export default RemindersView;