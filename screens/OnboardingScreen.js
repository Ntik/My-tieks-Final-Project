import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

// SKIP, Next, et Done permettent de customiser les boutons du OnBoarding
// const Skip = ({...props}) => (
//     <Button
//     title= 'Passer'
//     color= "#FAFAFA"
//     {...props}
// />);



const OnboardingScreen = ({navigation}) => {
    return(
        <Onboarding
        // SkipButtonComponent={Skip}
        onSkip={() => navigation.navigate("Login")}
        onDone={() => navigation.navigate("Login")}

         pages={[
    {
      backgroundColor: '#3AADDD',
      image: <Image source={require('../assets/OnBoarding1.png')} style={styles.imagesSizes} />,
      title: 'Connectez Vous à Votre Quartier',
      subtitle: 'My Tieks permets de mieux connaitre l’actualité environnante.',
    },
    {
        backgroundColor: '#319E9C',
        image: <Image source={require('../assets/OnBoarding2.png')} style={styles.imagesSizes} />,
        title: 'Visualisez les événements alentours',
        subtitle: 'Grâce à votre position, visualisez d’un seul coup d’oeil tous les évènements de votre quartier.',
      },
      {
        backgroundColor: '#EEE6A3',
        image: <Image source={require('../assets/OnBoarding3.png')} style={styles.imagesSizes} />,
        title: 'Visualisez les événements alentours',
        subtitle: 'Grâce à votre position, visualisez d’un seul coup d’oeil tous les évènements de votre quartier.',
      },
     ]}
    />
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagesSizes:{

        width: 390,
        height: 400,
    }
});



export default OnboardingScreen;