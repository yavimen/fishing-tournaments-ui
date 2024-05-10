import { View, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React from "react";

export function MatchListItem({ match, onPress }) {
  const matchDateTime = new Date(match.startDateTime);
  const putZeroIfRequires = (number) => {
    return number < 10 ? "0" + number : number;
  };

  const formatDate = () => {
    if (!matchDateTime) return null;
    const dateMonth = matchDateTime.getMonth() + 1;
    const dateDate = matchDateTime.getDate();
    return `${putZeroIfRequires(dateDate)}-${putZeroIfRequires(
      dateMonth
    )}-${matchDateTime.getFullYear()}`;
  };

  const formatTime = () => {
    if (!matchDateTime) return null;
    const dateHours = matchDateTime.getHours();
    const dateMinutes = matchDateTime.getMinutes();
    return `${putZeroIfRequires(dateHours)}:${putZeroIfRequires(dateMinutes)}`;
  };

  const formattedDate = formatDate();
  const formattedTime = formatTime();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row bg-white mb-3 justify-between rounded-3xl drop-shadow-2xl border"
    >
      <View className="flex bg-sky-400 rounded-3xl py-2 px-3">
        <View>
          <View>
            <Text className="text-center text-md text-white">
              {formattedDate ?? "-"}
            </Text>
          </View>
          <View>
            <Text className="text-center text-white">
              {formattedTime ?? "-"}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-end">
        <View className="flex p-2">
          <View>
            <Text
              className="text-right text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {match.locationName}
            </Text>
          </View>
          <View className="flex flex-row justify-end items-center">
            <View className="flex">
              <Text className="black text-xs">{match.actualAddressName}</Text>
            </View>
            <View>
              <FeatherIcon color="black" name="map-pin" size={15} />
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center">
          <FeatherIcon color="black" name="chevron-right" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
