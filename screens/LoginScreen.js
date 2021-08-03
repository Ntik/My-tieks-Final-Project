import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';



const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return(


        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
         
            <Image
                source={require('../assets/Login.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>My Tieks</Text>
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
            <FormButton
            buttonTitle="Sign In"
            onPress={() => alert('Sign In Clicked')}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Don't have an account? click here</Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
       
      
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#449CA6',
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
        fontSize: 40,
        marginBottom: 30,
        color: '#FDF2AB',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    dontHaveButton: {
        marginVertical: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FDF2AB',
    }
});


export default LoginScreen;

