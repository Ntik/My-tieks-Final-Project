
import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Overlay, Button } from "react-native-elements";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import FormInput from "../components/FormInput";
import { Content } from "native-base";
import { Input } from 'react-native-elements';
import DateTimePicker from "@react-native-community/datetimepicker";



function MapScreen() {
    
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [categories, setCategories] = React.useState([])
    const [visible, setVisible] = React.useState(false); 
    const toggleOverlay = () => {
          setVisible(!visible);
        };

    React.useEffect(() => {
        console.log('on est dans le hook deffet')
        const getCategories = async () => {
            const responseFromServer = await fetch('http://172.16.0.17:3000/all-categories')
            const responseFromServerJson = await responseFromServer.json()
            console.log(responseFromServerJson)
            setCategories(responseFromServerJson.categories)
        }
        getCategories()
       
    }, []) 

  const [currentLatitude, setCurrentLatitude] = React.useState(0);
  const [currentLongitude, setCurrentLongitude] = React.useState(0);
  const [listCoord, setListCoord] = React.useState([]);
  
  const [region, setRegion] = React.useState({
    latitude: 43.3,
    longitude: 5.4,
  });

  React.useEffect(() => {
    async function askPermissions() {

    
      
      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      console.log(status)
      if (status === 'granted') {
        
        Location.watchPositionAsync({ distanceInterval: 2 },
          (location) => {
            
            setCurrentLatitude(location.coords.latitude)
            setCurrentLongitude(location.coords.longitude);
            console.log("Location====>",location)
        }
          
        );
      }
    }
    askPermissions();
  }, []);

  const getCat = (cat) => {
      console.log(cat._id)
      setSelectedCategory(cat._id)
  }
  const addEvent = async () => {
      console.log(selectedCategory)
      setVisible(false)
      const responseFromServerCat = await fetch('http://172.16.0.17:3000/add-an-event', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body:`eventCategoryId=${selectedCategory}&token=yW0LIFRMF1s9aPeU3AGhmyxKOoBHrPFH`
        })

        const responseFromServerJsonCat = await responseFromServerCat.json()
        console.log(responseFromServerJsonCat)
  }

const [ title, setTitle ] = React.useState('')
const [ content, setContent ] = React.useState('')

const [date, setDate] = React.useState(new Date());
const [mode, setMode] = React.useState('date');
const [show, setShow] = React.useState(false);

const onChange = (event, selectedDate) => {
const currentDate = selectedDate || date;
setDate(currentDate);
};

const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  console.log(date)
  


  return (

    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Where are you going?"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          console.log("Data&Details ====>", details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setListCoord([
            ...listCoord,
            {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            },
          ]);
        }}
        query={{
          key: "AIzaSyBnZ3mKiyqEZceo2br6IUGpRQOSED93bM8",
          componentRestrictions: { country: "fr" },
          fields: [
            "address_components",
            "postal_code",
            "geometry",
            "icon",
            "name",
          ],
          strictBounds: false,
          types: ["cities"],
          radius: 3000,
          location: `${region.latitude}, ${region.longitude}`,
          //  radius et location permettent d'affiner la recherche dans un rayon precis autour du point d'ancrage.
        }}
        styles={{
          container: { flex: 0, width: "100%", elevation: 3 },
          listView: { backgroundColor: "white" },
        }}
      />
        <Overlay style={{ marginTop: 50 }}
            isVisible={visible} 
            onBackdropPress={toggleOverlay}
            fullScreen="true"
            >
            {
                categories.map((category, i) => (
                    <Text key={i} onPress={() => getCat(category)}>{category.name}</Text>   
                )) 
            }

            <Input
            labelValue={ title }
            onChangeText={( title ) => setTitle( title )}
            value={title}
            placeholder='Ex: concert de piano'
            />

            <Input style={{ height: 100 }}
            placeholder='Ex: Viens check ce concert !'
	        multiline={ true }
            value={ content }
            numberOfLines={ 4 }
            onChangeText={( content ) => setContent( content )}
            />

            

            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />



            
            <Button
            title="Close the window"
            onPress={() => setVisible(false)}
            />
            <Button
            title="Add an event"
            onPress={() => addEvent()}/>
        </Overlay>
        <Button title="Open Overlay" onPress={toggleOverlay} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.3,
          longitude: 5.4,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        {listCoord.map((lieu, i) => (
          <Marker
            key={i}
            pinColor="orange"
            coordinate={{ latitude: lieu.latitude, longitude: lieu.longitude }}
          />
        ))}
         <Marker key={"currentPos"}
          pinColor="red"
          title="Hello"
          description="I'am here"
          coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
