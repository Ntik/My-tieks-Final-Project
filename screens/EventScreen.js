import React from 'react'
import { StyleSheet,View, Text } from 'react-native'
import { connect } from 'react-redux';



function EventScreen(props) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Merci de nous avoir écouté</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BF6A39',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',

    },


});

function mapStateToProps(state) {
    return { event: state  }
  }
  
  export default connect(
   mapStateToProps,
   null
  )(EventScreen);




