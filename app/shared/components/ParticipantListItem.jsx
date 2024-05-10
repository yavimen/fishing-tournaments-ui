import { View, Text } from 'react-native'
import FeatherIcon from "react-native-vector-icons/Feather";
import React from 'react';
import { getFormattedDate } from '../dateTime';

export function ParticipantListItem({ participant }) {
  return (
    <View className={`flex flex-row justify-between mb-2 border border-black rounded-3xl drop-shadow-2xl ${participant.position === 1 ? 'bg-green-400' : ' bg-white'}`}>
      <View className="flex p-1">
        <View className='ml-3'>
          <View>
            <Text className="text-xl">
              {participant?.person?.fullName ?? "Місце 1"}
            </Text>
          </View>
          <View className='flex-row'>
            <FeatherIcon color="black" name="calendar" size={16} />
            <Text className="ml-1 text-xs">
              {getFormattedDate(participant.registrationDate) ?? "-"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
