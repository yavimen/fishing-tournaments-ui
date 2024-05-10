import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { matchesService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { TextRow } from "../../shared/components";
import { getFormattedTime, getFormattedDate } from "../../shared/dateTime";
import FeatherIcon from "react-native-vector-icons/Feather";

export function PublicMatchDetail({ route }) {
  const { publicMatchDetail, setPublicMatchDetail } = useGlobalContext();
  const matchId = route.params.matchId;
  const [refreshing, setRefreshing] = useState(false);
  const labelCols = 6;
  const mapRef = useRef();

  useEffect(() => {
    const loadData = async () => {
      setRefreshing(true);
      const matchDetail = await matchesService.getMatchByIdForPlayer(matchId);
      setPublicMatchDetail(matchDetail);
      setRefreshing(false);
    };
    loadData();
  }, []);
  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">Деталі матчу</Text>
        </View>
      </View>
      {publicMatchDetail && (
        <View className="flex-1">
          <MapView
            showsUserLocation={true}
            initialRegion={publicMatchDetail}
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            zoomControlEnabled
            ref={mapRef}
          >
            <Marker coordinate={publicMatchDetail}>
              <Callout>
                <View>
                  <Text>Матч</Text>
                </View>
              </Callout>
            </Marker>
            {publicMatchDetail?.playerSpot?.latitude && (
              <Marker coordinate={publicMatchDetail.playerSpot} pinColor={'green'}>
                <Callout>
                  <View>
                    <Text>Ваше місце у матчі</Text>
                  </View>
                </Callout>
              </Marker>
            )}
          </MapView>
            <TouchableOpacity
            className="absolute top-16 right-3 bg-white p-2"
            onPress={() => mapRef.current.animateToRegion(publicMatchDetail)}
            >
            <FeatherIcon color="black" name="map-pin" size={20} />
            </TouchableOpacity>
        </View>
      )}
      <View className="flex-1">
        <TextRow
          label={"Назва локації:"}
          value={publicMatchDetail?.locationName ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Адреса локації:"}
          value={publicMatchDetail?.actualAddressName ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Дата проведення:"}
          value={getFormattedDate(publicMatchDetail?.startDateTime) ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Час проведення:"}
          value={getFormattedTime(publicMatchDetail?.startDateTime) ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Ваше місце у матчі:"}
          value={publicMatchDetail?.playerSpot.name ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
      </View>
    </View>
  );
}
