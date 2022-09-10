/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import {colors, fonts} from '../styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

export default class DetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      record: {},
    };
  }
  render() {
    let state = this.state
    let medicalDetailUIElements = Object
                                    .entries(state.record).map(([key, value]) => {
                                        return {field : key, value : value} 
                                    })
                                    .filter(i => {
                                        return i.field != 'drugs'
                                    })
                                    .filter(i => {
                                        return i.field != 'uid'
                                    })
                                    .sort((a, b) => a.field.localeCompare(b.field))
                                    .map(i => {
                                        return (<View style={styles.singleDetailContainer}>
                                            <Text>{i.field == 'nextVisit' ? 'Next Visiting Day' : (i.field.charAt(0).toUpperCase() + i.field.slice(1))}</Text>
                                            <Text>{i.value}</Text>
                                          </View>);
                                    })

    

    let drugDetailUIElements = [];

    if(state.record.drugs) {
        drugDetailUIElements = state.record.drugs
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(i => {
                                            return (<View style={styles.singleDetailContainer}>
                                                        <Text>{i.name.charAt(0).toUpperCase() + i.name.slice(1)}</Text>
                                                        <Text>{i.dose}</Text>
                                                    </View>);
                                        })
    } 
    

    return (

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 20}}
        keyboardShouldPersistTaps="handled">
        <Spinner
          visible={state.loading}
        />
        <View style={styles.componentsSection}>
          <Text style={styles.componentSectionHeader}>Medical Details</Text>
          {medicalDetailUIElements}

          <View style={{marginTop: 20}} />
          <Text style={[styles.componentSectionHeader, {fontSize: 18}]}>
            Drug Details
          </Text>
          {drugDetailUIElements}
          
          {state.record.instructions && (<View style={styles.multiDetailsContainer}>
            <Text style={{color: colors.primary}}>Instructions</Text>
            <Text style={{marginLeft: 20}}>{state.record.instructions}</Text>
          </View>)}
          <View style={{marginTop: 20}} />
         
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.setState({loading : true})
    firestore()
      .collection('records')
      .doc(this.props.route.params.recordId)
      .get()
      .then(doc => {
        let record = doc.data();
        this.setState({record: record, loading : false})
      })
      .catch(error => {
        this.setState({loading : false})
        alert(error.message)
      })
  }
}


const styles = StyleSheet.create({
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#617ae1',
  },
  itemThreeBrandTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  demoItem: {
    marginVertical: 15,
  },
  imageContainer: {
    flex: 1,
    //  padding: 5,
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  singleDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  multiDetailsContainer: {
    flex: 1,
  },
});