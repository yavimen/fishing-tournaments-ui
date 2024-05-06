import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getLocationData, matchesService } from "../../services";
import { MyDateTimePicker } from "../../shared/components";
import { useToast } from "react-native-toast-notifications";
import { useGlobalContext } from "../../context/GlobalContext";

const INITIAL_REGION = {
  latitude: 47.86867483060931,
  latitudeDelta: 10.324047287555445,
  longitude: 31.3039480894804,
  longitudeDelta: 15.909583792090416,
};

export function MatchCreate({ route, navigation }) {
  const toast = useToast();
  const tournament = route.params.tournament;
  const tournamentId = tournament.id;
  const match = route.params.match;

  const initialRegion = match?.actualAddressName
    ? { ...match }
    : INITIAL_REGION;
  const matchGoogleAdress = match?.actualAddressName
    ? { plus_code: { compound_code: match.actualAddressName } }
    : null;
  const [markerData, setMarkerData] = useState(initialRegion);
  const [locationName, setLocationName] = useState(match?.locationName ?? null);
  const [googleAddress, setGoogleAddress] = useState(matchGoogleAdress);
  const [startDateTime, setStartDateTime] = useState(
    match?.startDateTime ?? null
  );
  const { setMatches } = useGlobalContext();

  const handleLockLocation = async () => {
    if (googleAddress) {
      setGoogleAddress(null);
      return;
    }
    const result = await getLocationData(
      markerData.latitude,
      markerData.longitude
    );
    setGoogleAddress(result);
  };

  const handleMapMoving = (e) => {
    if (googleAddress) return;
    setMarkerData(e);
  };

  const handleCreateMatch = async () => {
    if (!googleAddress) {
      toast.show("Встановіть маркер на локацію проведення матчу", {
        type: "danger",
      });
      return;
    }
    if (!locationName?.trim()) {
      toast.show("Уведіть назву локації матчу", {
        type: "danger",
      });
      return;
    }
    if (!startDateTime) {
      toast.show("Встановіть дату та час проведення матчу", {
        type: "danger",
      });
      return;
    }

    let startDate = new Date(startDateTime);
    let result;
    console.log("startDateTime ", startDate);
    if (match?.id) {
      result = await matchesService.updateMatch(match.id, {
        startDateTime, // bug
        locationName,
        actualAddressName: googleAddress?.plus_code?.compound_code,
        ...markerData,
      });
    } else {
      result = await matchesService.createMatch({
        tournamentId,
        startDateTime,
        locationName,
        actualAddressName: googleAddress?.plus_code?.compound_code,
        ...markerData,
      });
    }

    if (result.success === false) {
      toast.show(result.message, {
        type: "danger",
      });
    } else {
      const matches = await matchesService.getMatches({ tournamentId });
      setMatches(matches);
      if (match?.id) {
        const updatedMatch = await matchesService.getMatchById(match.id);
        navigation.navigate("MatchDetails", { tournament, match: updatedMatch });
      } else {
        navigation.navigate("TournamentDetails", { id: tournamentId });
      }
      toast.show(match?.id ? "Матч успішно оновлено" : "Матч успішно додано", {
        type: "success",
      });
    }
  };

  return (
    <View className="flex-1 pt-3">
      <View className="flex-1 mt-6">
        <MapView
          showsUserLocation={true}
          initialRegion={initialRegion}
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={(e) => handleMapMoving(e)}
        >
          <Marker coordinate={markerData} />
        </MapView>
      </View>
      <View className="flex-1 px-3">
        <Text className="text-center color-gray-500">
          {googleAddress?.plus_code?.compound_code}
        </Text>
        <TouchableOpacity
          className="p-2 bg-gray-200 mx-3 mt-2 mb-4 rounded-lg"
          onPress={handleLockLocation}
        >
          <Text className="text-center">
            {googleAddress ? "Відкріпити маркер" : "Зафіксувати локацію"}
          </Text>
        </TouchableOpacity>
        <Text className="font-bold mb-1">Назва локації</Text>
        <TextInput
          className="border rounded-md px-4 py-2 mb-4"
          placeholder="..."
          value={locationName}
          onChangeText={setLocationName}
          placeholderTextColor={"#9ca3af"}
        />
        <MyDateTimePicker date={startDateTime} setDate={setStartDateTime} />

        <TouchableOpacity
          className="bg-gray-200 rounded-md py-2 bg-sky-500 mt-3"
          onPress={handleCreateMatch}
        >
          <Text className="text-lg font-semibold text-center color-white">
            {match?.id ? "Оновити матч" : "Створити матч"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
