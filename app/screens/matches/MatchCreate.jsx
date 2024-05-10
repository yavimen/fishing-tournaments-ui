import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getLocationData, matchesService, tournamentsService } from "../../services";
import {
  MyDateTimePicker,
  BaseButton,
  BaseInput,
} from "../../shared/components";
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
  const { setMatches, getMyTournamentById, setTournamentDetails } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const handleLockLocation = async () => {
    if (googleAddress) {
      setGoogleAddress(null);
      return;
    }
    const result = await getLocationData(
      markerData.latitude,
      markerData.longitude
    );
    const rightAddressParts = result.plus_code.compound_code.split(" ").filter((x, index) => index !== 0);
    result.plus_code.compound_code = rightAddressParts.join(" ");
    setGoogleAddress(result);
    console.info("address: ", result);
  };

  const handleMapMoving = (e) => {
    if (googleAddress) return;
    setMarkerData(e);
  };

  const handleCreateMatch = async () => {
    setLoading(true);
    if (!googleAddress) {
      toast.show("Встановіть маркер на локацію проведення матчу", {
        type: "danger",
      });
      setLoading(false);
      return;
    }
    if (!locationName?.trim()) {
      toast.show("Уведіть назву локації матчу", {
        type: "danger",
      });
      setLoading(false);
      return;
    }
    if (!startDateTime) {
      toast.show("Встановіть дату та час проведення матчу", {
        type: "danger",
      });
      setLoading(false);
      return;
    }

    let startDate = new Date(startDateTime);
    let result;
    console.log("startDateTime ", startDate);
    if (match?.id) {
      result = await matchesService.updateMatch(match.id, {
        ...markerData,
        startDateTime,
        locationName,
        actualAddressName: googleAddress?.plus_code?.compound_code,
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
      const TournamentDetails = await tournamentsService.getMyTournamentById(tournamentId);
      setTournamentDetails(TournamentDetails);
      if (match?.id) {
        const updatedMatch = await matchesService.getMatchById(match.id);
        navigation.navigate("MatchDetails", {
          tournament,
          match: updatedMatch,
        });
      } else {
        navigation.navigate("TournamentDetails", { id: tournamentId });
      }
      toast.show(match?.id ? "Матч успішно оновлено" : "Матч успішно додано", {
        type: "success",
      });
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">
            {match?.id ? "Редагувати матч" : "Створити матч"}
          </Text>
        </View>
      </View>
      <View className="flex-1">
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
        <Text className="text-center color-gray-500 mb-2">
          {googleAddress?.plus_code?.compound_code}
        </Text>
        
        <BaseButton
          label={googleAddress ? "Відкріпити маркер" : "Зафіксувати локацію"}
          onPress={handleLockLocation}
          myClassName={'mb-2'}
        />

        <BaseInput
          label={"Назва локації"}
          property={locationName}
          setProperty={setLocationName}
        />
        <MyDateTimePicker myClassName={'mb-3'} date={startDateTime} setDate={setStartDateTime} />

        <BaseButton
          label={match?.id ? "Оновити матч" : "Створити матч"}
          onPress={handleCreateMatch}
          loading={loading}
        />
      </View>
    </View>
  );
}
