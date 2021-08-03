import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';



const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    return(

        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
            <Image
                source={require('../assets/Signup.png')}
                style={styles.logo}
            />
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
            onPress={() => alert('Sign Up Clicked')}
            />
            

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
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


export default SignupScreen;


