import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import AsyncStorage from '@react-native-async-storage/async-storage';"@react-native-async-storage/async-storage";



const Stack = createStackNavigator();

function App() {
  return(
  <NavigationContainer>
  <Stack.Navigator
  headerMode="none">
    <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="Signup" component={SignupScreen}/>
  </Stack.Navigator>
</NavigationContainer>
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