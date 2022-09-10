/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {colors, fonts} from '../styles';


export default class RecordItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    let props = this.props;
    let dataUIElements = props.data.map(item => {
      return (
        <View style={styles.itemThreeMetaContainer}>
          <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3}}>
              <Text style={[{fontWeight : 'bold', flex: 0.3, flexWrap : 'wrap'}, styles.itemThreeSubtitle]}>
                {item.field.charAt(0).toUpperCase() + item.field.slice(1)}
              </Text>
              <Text style={[{ flex: 0.7, flexWrap : 'wrap'},styles.itemThreeSubtitle]}>
                {item.value}
              </Text>
            </View>
        </View>
      )
  
    })
    return (
        <View key={props.id} style={styles.itemThreeContainer}>
        <View style={styles.itemThreeSubContainer}>
        
          {dataUIElements}
        </View>
        <View style={styles.itemThreeHr} />
      </View>
    );
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
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 70,
    width: 70,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
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
    fontSize: 15,
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
