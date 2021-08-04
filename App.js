import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MapScreen from './screens/MapScreen';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import token from './token.reducer'
// import AsyncStorage from '@react-native-async-storage/async-storage';"@react-native-async-storage/async-storage";



const store = createStore(combineReducers({token}));
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigator() {

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({color}) => {
        let iconName;
        if (route.name == 'MapScreen') {
          iconName = 'ios-navigate';
        } else if (route.name == 'ChatScreen') {
          iconName = 'ios-chatbubbles';}
        //  else if (route.name =='HomeScreen') {
        //   iconName = 'ios-home';
        // }
        return <Ionicons name={iconName} size={24} color={color} />;
      },
      })}
    tabBarOptions={{
      activeTintColor: '#D92949',
      inactiveTintColor: '#F27D16',
      style: {
        backgroundColor: '#F2D16D',
      }
    }}
  >
      <Tab.Screen name="MapScreen" component={MapScreen} />
      {/* {/* /* <Tab.Screen name="HomeScreen" component={HomeScreen} /> */ }  
      <Tab.Screen name="ChatScreen" component={ChatScreen} />

    </Tab.Navigator>
  );
 }

function App() {
  return(
      <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
      headerMode="none">
        <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="MapScreen" component={MapScreen}/>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
//  <Provider store={ store }>

//     <NavigationContainer>
//         <Stack.Navigator headerMode="none">

//             <Stack.Screen name="Onboarding" component={ OnboardingScreen }/>
//             <Stack.Screen name="Login" component={ LoginScreen }/>
//             <Stack.Screen name="Signup" component={ SignupScreen }/>
//             <Stack.Screen name="MapScreen" component={ MapScreen }/>

//         </Stack.Navigator>
//     </NavigationContainer>

//  </Provider>
  )
}


//  FONCTIONNALITES PERMETTANT DE SKIP L'INTRO A LA SECONDE CONNEXION, A METTRE EN PLACE APRES BON FONCTIONNEMENT
// function App() {
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   useEffect(() => {
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if(value === null){
//         AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunch(true);
//       }else {
//         setIsFirstLaunch(false);
//       }
//     })
//   }, [])

//   if( isFirstLaunch === null){
//     return null;
//   }else if ( isFirstLaunch === true ){
//     return (
//       <NavigationContainer>
//       <Stack.Navigator
//       headerMode="none">
//         <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
//         <Stack.Screen name="Login" component={LoginScreen}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//     )
//   } else {
//     return <LoginScreen/>;
//   }
// }

export default App;