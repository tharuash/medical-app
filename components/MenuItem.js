/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {colors, fonts} from '../styles';

export default class MenuItem extends React.Component {
  render() {
    let props = this.props;
    
    return (
      <TouchableOpacity
        key={props.key}
        style={{
          marginBottom: 10
        }}
        onPress={props.onPress}>
        <View style={styles.itemOneContainer}>
         
          <View style={styles.itemOneContent}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.itemOneTitle} numberOfLines={1}>
                {props.name}
              </Text>
              <Image style={{marginLeft: 'auto'}} source={props.image} />
            </View>
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemOneContainer: {
    // flex: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: '100%'
  },
  itemOneTitle: {
    fontSize: 18,
    color: colors.white,
    paddingLeft: 10
  },
  itemOneSubTitle: {
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    // flex: 1,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
