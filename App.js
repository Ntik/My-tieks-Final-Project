import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MapScreen from './screens/MapScreen';
import EventScreen from './screens/EventScreen';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userEvent from './readEvent.reducer'
import token from './token.reducer';
// import AsyncStorage from '@react-native-async-storage/async-storage';"@react-native-async-storage/async-storage";



const store = createStore(combineReducers({token, userEvent}));
const Stack = createStackNavigator();


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
        <Stack.Screen name="EventScreen" component={EventScreen}/>
        
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
//     AsyncStorage.getItem('Déjà connécté une fois').then(value => {
//       if(value === null){
//         AsyncStorage.setItem('Déjà connécté une fois', 'true');
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