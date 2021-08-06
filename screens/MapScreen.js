import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Overlay, Button } from "react-native-elements";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker'



function MapScreen(props) {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visibleFilter, setVisibleFilter] = React.useState(false);
  const [eventMarker, setEventMarker] = React.useState([]);
  const [eventMarkerCopy, setEventMarkerCopy] = React.useState([]);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlayFilter = () => {
    setVisibleFilter(!visibleFilter);
  };
  //

  React.useEffect(() => {
    const getCategories = async () => {
      const responseFromServer = await fetch(
        "https://my-tieks-0001.herokuapp.com/all-categories"
      );
      const responseFromServerJson = await responseFromServer.json();
      // console.log(responseFromServerJson)
      setCategories(responseFromServerJson.categories);
    };
    getCategories();
  }, []);

  React.useEffect(() => {
    const getMarkers = async () => {
      const responseForMarker = await fetch(
        "https://my-tieks-0001.herokuapp.com/all-events"
      );
      const responseForMarkerJson = await responseForMarker.json();
      // console.log("All Marker ===>",responseForMarkerJson)
      setEventMarker(responseForMarkerJson.events);
    };
    getMarkers();
  }, []);
  // console.log("SetEventMarker===>", eventMarker)
  const [currentLatitude, setCurrentLatitude] = React.useState(0);
  const [currentLongitude, setCurrentLongitude] = React.useState(0);
  const [eventCoord, setEventCoord] = React.useState({});
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  // const [categoryTitle, setCategoryTitle] = React.useState('');

  const [region, setRegion] = React.useState({
    latitude: 43.3,
    longitude: 5.4,
  });

  React.useEffect(() => {
    async function askPermissions() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      // console.log(status)
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
          // console.log("Location====>",location)
        });
      }
    }
    askPermissions();
  }, []);

  // fonction permettant de mettre à jour l'état de la catégories au click (la selectionner)
  const getCat = (cat) => {
    setSelectedCategory(cat._id);
  };

  const addEvent = async () => {
    console.log("TOKEN=====>",props.token.token)
    console.log("CAT=====>",selectedCategory)
    console.log("CONTENT=====>",content)
    setVisible(false);
    const responseFromServerEvent = await fetch(
      "https://my-tieks-0001.herokuapp.com/add-an-event",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `eventCategoryId=${selectedCategory}&token=${props.token.token}&lat=${eventCoord.latitude}&lng=${eventCoord.longitude}&content=${content}`,
      }
    );

    const responseFromServerJsonEvent = await responseFromServerEvent.json();
    setEventMarker([...eventMarker, responseFromServerJsonEvent.newEvents])
   
  };

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirm = (date) => {
    hideDatePicker();
  };

  // console.log("Coordonnées Event======>",eventCoord)
  var catName;

  const filterEvent = async () => {
    const responseFromServerFilter = await fetch(`https://my-tieks-0001.herokuapp.com/events-by-category/${selectedCategory}`, {
     method: "POST",
     headers: { "Content-Type": "application/x-www-form-urlencoded"},
     body: null
    });
    const responseFromServerFilterJson = await responseFromServerFilter.json();
    //console.log("FILTER====>",responseFromServerFilterJson)
    setEventMarker(responseFromServerFilterJson.data)




  

    
  };

  //console.log("test after filter", eventMarker)
  const sendToShow = (eventTopushStore) => {
    props.onMarkerClick(eventTopushStore)
    props.navigation.navigate('EventScreen')

  }
  return (
    <View style={{ flex: 1 }}>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen="true"
      >
        <View>
        <GooglePlacesAutocomplete
        placeholder="Ex: 3 rue des Acacias"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          //console.log("Data&Details ====>", details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
            setEventCoord({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
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

          <Input
            labelValue={ title }
            onChangeText={( title ) => setTitle( title )}
            value={title}
            placeholder='Ex: concert de piano'
            />

            <Input style={{ height: 100 }}
            placeholder="Ex: Participer au concert de piano de l'école de musique!"
	          multiline={ true }
            value={ content }
            numberOfLines={ 4 }
            onChangeText={( content ) => setContent( content )}
            />
            <Button title="Choisir la date" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
          
          {
          categories.map((category, i) => (
            <Button 
            title={category.name}
            key={i} onPress={() => getCat(category)}>
            </Button>
          ))
        }
         <Button
            title="Fermer la fenêtre"
            onPress={() => setVisible(false)}
            />
            <Button
            title="Ajouter un évènement"
            onPress={() => addEvent()}/>
        </View>
       
        </Overlay>
        

      <Overlay
        isVisible={visibleFilter}
        onBackdropPress={toggleOverlayFilter}
        fullScreen="true"
      >
        {categories.map((category, i) => (
          <Button 
          title={category.name}
          key={i} onPress={() => getCat(category)}>
          </Button>
        ))}
        
        <Button title="Fermer la fenêtre" onPress={() => setVisibleFilter(false)}/>
        <Button title="Filtrer les évènements" onPress={() => {filterEvent();setVisibleFilter(false)}} />
      </Overlay>
       
          <Button title="Ajouter un évènement" onPress={toggleOverlay} />
          <Button title="Filtrer" onPress={toggleOverlayFilter} />
      
      

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
        {
        eventMarker.map((event, i) => {
          console.log(" cat loop", event)
          categories.map((categorie, i) => {
            if (categorie._id == event.eventCategoryId) {
              catName = categorie.name;
            }
          });

          return (
            <Marker
            onPress={() => sendToShow(event) }
              key={i}
              pinColor="orange"
              coordinate={{ latitude: event.lat, longitude: event.lng }}
              title={catName}
              description={event.content}
            />
          );
        })}
        <Marker
          key={"currentPos"}
          pinColor="red"
          title="Hello"
          description="Vous êtes ici!"
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
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

function mapDispatchToProps(dispatch) {
  return {
    onMarkerClick: function(userEvent) { 
      dispatch( {type: 'readEvent', diplayEvent: userEvent}) 
    }
  }
}

function mapStateToProps(state) {
  return { token: state  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MapScreen);

