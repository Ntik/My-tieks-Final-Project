
import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Overlay, Button } from "react-native-elements";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



function MapScreen() {
    
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [categories, setCategories] = React.useState([])
    const [visible, setVisible] = React.useState(false); 
    const [eventMarker, setEventMarker] = React.useState([])
    const toggleOverlay = () => {
          setVisible(!visible);
        };

    React.useEffect(() => {
        
        const getCategories = async () => {
            const responseFromServer = await fetch('https://my-tieks-0001.herokuapp.com/all-categories')
            const responseFromServerJson = await responseFromServer.json()
            console.log(responseFromServerJson)
            setCategories(responseFromServerJson.categories)
        }
        getCategories()
       
    }, []) 
    React.useEffect(() => {
        
      const getMarkers = async () => {
          const responseForMarker = await fetch('https://my-tieks-0001.herokuapp.com/all-events')
          const responseForMarkerJson = await responseForMarker.json()
          // console.log("All Marker ===>",responseForMarkerJson)
          setEventMarker(responseForMarkerJson.events)
      }
      getMarkers()
     
  }, []) 
        console.log("SetEventMarker===>", setEventMarker)
  const [currentLatitude, setCurrentLatitude] = React.useState(0);
  const [currentLongitude, setCurrentLongitude] = React.useState(0);
  const [eventCoord, setEventCoord] = React.useState({});
  
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

  // fonction permettant de mettre à jour l'état de la catégories au click (la selectionner)
  const getCat = (cat) => {
      setSelectedCategory(cat._id)
  }
  const addEvent = async () => {
      console.log(selectedCategory)
      setVisible(false)
      const responseFromServerCat = await fetch('https://my-tieks-0001.herokuapp.com/add-an-event', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body:`eventCategoryId=${selectedCategory}&token=yW0LIFRMF1s9aPeU3AGhmyxKOoBHrPFH&lat=${eventCoord.latitude}&lng=${eventCoord.longitude}`
        })

        const responseFromServerJsonCat = await responseFromServerCat.json()
        console.log(responseFromServerJsonCat)
  }

      console.log("Coordonnées Event======>",eventCoord)
  return (

    <View style={{ flex: 1 }}>
        <Overlay 
            isVisible={visible} 
            onBackdropPress={toggleOverlay}
            fullScreen="true"
            >
              <View>
              <GooglePlacesAutocomplete
        placeholder="Where are you going?"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
         
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setEventCoord(
            {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            },
          );
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
          container: { flex: 0, width: "100%", elevation: 3, zIndex: 1 },
          listView: { backgroundColor: "white" },
        }}
      />
              </View>
            {
                categories.map((category, i) => (
                    <Text key={i} onPress={() => getCat(category)}>{category.name}</Text>   
                )) 
            }
            
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
        {/* {listCoord.map((lieu, i) => (
          <Marker
            key={i}
            pinColor="orange"
            coordinate={{ latitude: lieu.latitude, longitude: lieu.longitude }}
          />
        ))} */}
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
