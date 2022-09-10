/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, ScrollView, Image, Dimensions, Text, Button, ActivityIndicator, FlatList} from 'react-native';
import {fonts, colors} from '../styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const {width, height} = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';

export default class PrescriptionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        imageError: '',
        loading: false,
        fileUri : '',
        fileName : '',
        isPredicted : false,
        predictions: [
            {id: 1, name : 'Amoxilin'},
            {id: 2, name : 'Vitamin C' }
        ]
    };
  }
  render() {
    let state = this.state;
    return (
      <View
        style={styles.container}>
          <Spinner
              visible={state.loading}
            />
       
        <View style={styles.componentsSection}>
          <Text style={styles.componentSectionHeader}>Upload here</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 10
            }}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={state.fileUri
                    ? {uri: state.fileUri}
                    :require('../assets/dummy.png')}
              />
            </View>
            <View>
              <Button
                style={styles.demoButton}
                title="Camera"
                onPress={() => {
                  this.launchCameraFromDevice();
                }}
              />
              <View style={{marginTop: 10}}/>
              <Button
                style={styles.demoButton}
                title="Gallery"
                onPress={() => {
                  this.launchImageLibraryFromDevice();
                }}
              />
            </View>
          </View>
          {state.imageError && (
            <Text style={{color: colors.red, fontWeight : 'bold'}}>
              Prescription image is required to predict.
            </Text>
          )}

          <View style={{marginTop: 10}} />
          
            <Button
              style={styles.demoButton}
              title="Upload and Predict"
              onPress={() => {
                if(this.state.fileUri != '') {
                  this.setState(
                    {
                      loading: true,
                    },
                    () => {
                      setTimeout(() => {this.setState({loading: false, isPredicted: true})}, Math.floor(Math.random() * (10000 - 8000 + 1) ) + 8000)
                    },
                  );
                } else {
                  this.setState(
                    {
                      imageError: true,
                    });
                } 
              }}
            />

          <View style={{margin: 10}} />
          
        </View>

       

        {state.isPredicted && (
            <View style={styles.componentsSection}>
                <FlatList
                    keyExtractor={item => item.id}
                    style={{backgroundColor: colors.white, paddingHorizontal: 15}}
                    data={state.predictions}
                    renderItem={({item}) => (
                        <View style={styles.itemThreeContainer}>
                            <View style={styles.itemThreeSubContainer}>
                                <View style={styles.itemThreeMetaContainer}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={styles.itemThreeHr} />
                        </View>
                        
                    )}
                />
            </View>
        )   
        }
        
      </View>
    );
  }



  launchCameraFromDevice = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 600,
      maxHeight: 400,
      quality: 0.75,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        // alert('User cancelled image picker');
      } else if (response.error) {
        alert('Error : ' + response.error);
      } else if (response.customButton) {
        //alert('User tapped custom button: ' + response.customButton);
      } else {
        this.setState({
          fileUri: response.assets[0].uri,
          fileName: response.assets[0].fileName,
        });
      }
    });
  };

  launchImageLibraryFromDevice = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 700,
      maxHeight: 1000,
      quality: 0.75,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // alert('User cancelled image picker');
      } else if (response.error) {
        alert('Error : ' + response.error);
      } else if (response.customButton) {
        // alert('User tapped custom button: ' + response.customButton);
      } else {
        this.setState({
          fileUri: response.assets[0].uri,
          fileName: response.assets[0].fileName,
        });
      }
    });
  }; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  componentsSection: {
    flex:0.5,
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

  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },

  imageContainer: {
    flex: 1,
    //  padding: 5,
  },
  image: {
    flex: 1,
    height: 100,
    width: 150,
    borderRadius: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomBtngroup: {
    height: 0.015 * height,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0.6 * height,
  },
  btnConfirm: {
    backgroundColor: '#00CF91',
    height: 0.075 * height,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0.05 * width,
    width: 0.4 * width,
    opacity: 0.8,
    marginBottom: 0.05 * height,
  },
  topBtngroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 0.005 * width,
    marginTop: 0.025 * height,
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB9F82',
    opacity: 0.8,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  itemThreeSubContainer: {
    paddingVertical: 10,
  },
  predictiong: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});