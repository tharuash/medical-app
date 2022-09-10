/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../styles';


export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    
    return (
        <View key={this.props.id} style={styles.itemThreeContainer}>
        <View style={styles.itemThreeSubContainer}>
          <View style={styles.itemThreeMetaContainer}>
            <View style={styles.reminderText}>
                <View>
                    <Icon
                    name="notifications"
                    underlayColor="transparent"
                    iconStyle={styles.placeIcon}
                    onPress={this.onPressPlace}
                    size={18}
                    />
                </View>
              <Text style={styles.itemThreeTitle} numberOfLines={1}>
                {this.props.reminder}
              </Text>
            </View>   
          </View>  
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
    paddingLeft: 20
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
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
  reminderText: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  }
});
