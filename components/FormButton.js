import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native';



const windowHeight = Dimensions.get('window').height;

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
   
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#F1C516',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});





// import React from 'react'
// import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;


// const FormButton = (buttonTitle, ...rest) => {
//     return (
//        <TouchableOpacity style={styles.buttonContainer} {...rest}>
//            <Text style={styles.buttonText}>{buttonTitle}</Text>
//        </TouchableOpacity>
//     )
// }


// const styles = StyleSheet.create({
//     buttonContainer: {
//         marginTop: 10,
//         width: '100%',
//         height: windowHeight / 15,
//         backgroundColor: 'red',
//         padding: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 3,
//     },
//     buttonText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//     }
// })
// export default FormButton;

