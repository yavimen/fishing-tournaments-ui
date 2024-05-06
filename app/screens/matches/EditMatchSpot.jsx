import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useToast } from "react-native-toast-notifications";
import { BaseInput, BaseButton } from "../../shared/components";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as Location from "expo-location";
import { spotsService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";

export function EditMatchSpot({ route, navigation }) {
  const match = route.params.match;
  const spot = route.params.spot;
  const tournament = route.params.tournament;
  const toast = useToast();
  const labelCols = 6;
  const actualMarkerData = spot.latitude !== null ? { ...spot } : { ...match };
  const [markerData, setMarkerData] = useState(actualMarkerData);

  const [spotName, setSpotName] = useState(spot.name);
  const { setSpots } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Ви відхилили доступ до геолокації (");
        return;
      }
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (servicesEnabled) return;
      Alert.alert(
        "Підказка",
        "Якщо ви знаходитесь на місці для учасника, увімкніть геолокація на телефоні. Так ви зможете точно встановити геолокацію місця."
      );
    })();
  }, []);

  const onUpdateSpot = async () => {
    setLoading(true);
    if (!spotName) {
      toast.show("Ввведіть назву місця для учасника", {
        type: "danger",
      });
      return;
    }

    const updatedSpot = {
      ...spot,
    };

    updatedSpot.name = spotName;
    updatedSpot.latitude = markerData.latitude;
    updatedSpot.latitudeDelta = markerData.latitudeDelta;
    updatedSpot.longitude = markerData.longitude;
    updatedSpot.longitudeDelta = markerData.longitudeDelta;

    const updateResult = await spotsService.updateSpot(spot.id, updatedSpot);
    const spots = await spotsService.getSpots({matchId: match.id});
    setSpots(spots);
    if (updateResult.success === false) {
      toast.show(updateResult.message, {
        type: "danger",
      });
      setLoading(false);
      return;
    }

    navigation.navigate("MatchDetails", { match, tournament })
    toast.show("Місце для учасника успішно оновлено", {
      type: "success",
    });
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-xl bg-white">
          <Text className="text-lg">Редагувати місце</Text>
        </View>
      </View>
      <View className="flex-1">
        <MapView
          showsUserLocation={true}
          initialRegion={markerData}
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          onRegionChange={(e) => setMarkerData(e)}
          showsMyLocationButton={true}
          ref={mapRef}
        >
          <Marker coordinate={markerData} />
        </MapView>
        <TouchableOpacity
          className="absolute bottom-3 right-3 bg-white p-2"
          onPress={() => mapRef.current.animateToRegion(actualMarkerData)}
        >
          <FeatherIcon color="black" name="map-pin" size={20} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 p-2">
        <BaseInput
          setProperty={setSpotName}
          property={spotName}
          label={"Назва місця"}
        />
        <BaseButton label={"Оновити місце учасника"} onPress={onUpdateSpot} loading={loading} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
