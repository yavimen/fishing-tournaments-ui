import { View, Text, TouchableOpacity } from 'react-native'
import FeatherIcon from "react-native-vector-icons/Feather";
import React from 'react'

export function MatchListItem({ match, onPress }) {
  const putZeroIfRequires = (number) => {
    return number < 10 ? "0" + number : number
  }

  const matchDateTime = new Date(match.startDate)
  const formatDate = () => {
    if (!match.startDate) return null;
    const dateMonth = matchDateTime.getMonth() + 1;
    const dateDate = matchDateTime.getDate();
    return `${putZeroIfRequires(dateDate)}-${putZeroIfRequires(dateMonth)}-${matchDateTime.getFullYear()}`;
  };

  const formatTime = () => {
    if (!match.startTime) return null;
    return match.startTime.substring(0, 5);
  };

  const formattedDate = formatDate();
  const formattedTime = formatTime();
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-row bg-white mb-3 rounded-lg drop-shadow-2xl'>
      <View className='basis-4/12 flex bg-gray-400 rounded-lg p-2' >
        <View>
          <Text className='text-center text-md text-white'>{formattedDate ?? '-'}</Text>
        </View>
        <View>
          <Text className='text-center text-white'>{formattedTime ?? '-'}</Text>
        </View>
      </View>
      <View className='basis-7/12 flex p-2'>
        <View>
          <Text className='text-right text-md' numberOfLines={1} ellipsizeMode='tail'>{match.name}</Text> 
        </View>
        <View className='flex flex-row justify-end items-center'>
          <View>
            <Text className='black'>{match.locationName}</Text>
          </View>
          <View>
            <FeatherIcon color="black" name="map-pin" size={15} />
          </View>
        </View>
      </View>
      <View className='basis-1/12 flex justify-center items-center'>
        <FeatherIcon color="black" name="chevron-right" size={20} />
      </View>
    </TouchableOpacity>
  )
}