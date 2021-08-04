import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { connect } from 'react-redux';



const SignupScreen = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState('');
    const addNewuser = async () => {
        props.navigation.navigate('MapScreen')
        // const responseFromServer = await fetch('https://my-tieks-0001.herokuapp.com/sign-up', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //     body:`email=${email}&password=${password}`
        // })

        // const responseFromServerJson = await responseFromServer.json()
        // if(responseFromServerJson.result){
        //    props.navigation.navigate('MapScreen')
        //    props.onSubmitToken(responseFromServerJson.token)
        // }else {
        //     setError('Please sign in')
        //     return error
        // }
    }
    return(

        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
            <Image
                source={require('../assets/Signup.png')}
                style={styles.logo}
            />
            <Text>{error}</Text>
            <Text style={styles.text}>Create An Account</Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
            buttonTitle="Sign Up"
            onPress={() => addNewuser()}
            />
            

            <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Have an account? Sign in</Text>
            </TouchableOpacity>

            </KeyboardAvoidingView>
       
      
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BF6A39',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 30,
        color: '#FDF2AB',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FDF2AB',
    },
    forgotButton: {
        marginVertical: 35,
    },
});

function mapDispatchToProps(dispatch) {
    return {
      onSubmitToken: function(token) { 
        dispatch( {type: 'saveToken', token: token }) 
      }
    }
  }


  export default connect(
    null, 
    mapDispatchToProps
)(SignupScreen);


