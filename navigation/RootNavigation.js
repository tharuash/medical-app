/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../styles';
import {NavigationContainer} from '@react-navigation/native';
import {
  SignInView,
  SignUpView,
  HomeView,
  RecordsView,
  HistoryView,
  RemindersView,
  ProfileView,
  PrescriptionView,
  DetailsView
} from '../views';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const {width} = Dimensions.get('window');

function HeaderBackground() {
  return (
    <View
      style={{
        width,
        height: 60,
        backgroundColor: colors.blue
      }}
    />
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInView}
        options={{
          headerTitle: 'Sign In',
          headerTitleStyle: {
            color: colors.white,
          },
          headerStyle : {
            backgroundColor: colors.blue
          }
          
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpView}
        options={{
          headerTitle: 'Sign Up',
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,

          headerStyle : {
            backgroundColor: colors.blue
          }
        }}
      />
    </Stack.Navigator>
  );
}


function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen
        name="Menu"
        component={HomeView}
        options={{
          headerTitle: 'Home',
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,
          

          headerBackground: props => <HeaderBackground />,
        }}
      />
      <Stack.Screen
        name="Records"
        component={RecordsView}
        options={{
          headerTitle: 'Records',
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,

          headerBackground: props => <HeaderBackground />,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsView}
        options={{
          headerTitle: 'Details',
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,

          headerBackground: props => <HeaderBackground />,
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryView}
        options={{
          headerTitle: 'History',
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,

          headerBackground: props => <HeaderBackground />,
        }}
      />
      <Stack.Screen
        name="Prescription"
        component={PrescriptionView}
        options={{
          headerTitle: 'Prescription',
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,

          headerBackground: props => <HeaderBackground />,
        }}
      />
    </Stack.Navigator>
  );
}

function TabIcon(props) {
  return <Icon color={props.color} name={props.iconName} size={25} />;
}

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        showLabel: true,
        style: {
          backgroundColor: colors.white,
          borderTopWidth: 0.5,
          borderTopColor: '#d6d6d6',
        },
        labelStyle: {
          color: colors.grey,
        },
        activeTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon focused={focused} color={color} iconName="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon focused={focused} color={color} iconName="person" />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={RemindersView}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon focused={focused} color={color} iconName="notifications" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

class RootNavigation extends React.Component {
  render() {
    return  (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown : false}} initialRouteName="AuthStack">
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainStack" component={TabStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootNavigation;