/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import {colors} from '../styles';
import {ListItem} from '../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

export default class RecordsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      records: [],
    };
  }
  render() {
    let state = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          style={{backgroundColor: colors.white, paddingHorizontal: 15}}
          data={state.records}
          renderItem={({item}) => (
            <ListItem
              id={item.id}
              data={item.data}
              onPress={() => {this.props.navigation.navigate('Details', {recordId : item.docId})}}
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
      .collection('records')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        let records = []
        
        
        querySnapshot.forEach((documentSnapshot, index) => {
          let doc = documentSnapshot.data();
          
          let data = {
            id : index + 1,
            docId : documentSnapshot.id,
            data : Object
                    .entries(doc).map(([key, value]) => {
                      return {field : key, value : value} 
                    })
                    .filter(i => {
                      return i.field == 'date' || i.field == 'disease'
                    })
                    .sort((a, b) => a.field.localeCompare(b.field))
          }
          records.push(data);
        })
        this.setState({records: records, loading : false})
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
    paddingTop: 5,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
});
