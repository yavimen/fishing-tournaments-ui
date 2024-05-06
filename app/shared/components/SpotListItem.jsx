import { View, Text, TouchableOpacity } from 'react-native'
import FeatherIcon from "react-native-vector-icons/Feather";
import React, {useState} from 'react';

export function SpotListItem({ spot, navigation, match, tournament }) {
  return (
    <View className="flex flex-row justify-between bg-white my-2 border border-black rounded-3xl drop-shadow-2xl">
      <View className="flex p-1">
        <View className='ml-3'>
          <View>
            <Text className="text-xl">
              {spot?.name ?? "Місце 1"}
            </Text>
          </View>
          <View className='flex-row'>
            <FeatherIcon color="black" name="user" size={16} />
            <Text className="text-xs">
              {spot.player?.fullName ?? "-"}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("EditMatchSpot", { spot, match, tournament })} className="bg-sky-400 p-3 flex justify-center items-center rounded-3xl">
        <FeatherIcon color="white" name="edit-2" size={20} />
      </TouchableOpacity>
    </View>
  );
}
