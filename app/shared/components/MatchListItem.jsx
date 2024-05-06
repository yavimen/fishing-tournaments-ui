import { View, Text, TouchableOpacity } from 'react-native'
import FeatherIcon from "react-native-vector-icons/Feather";
import React from 'react'

export function MatchListItem({ match, onPress }) {
  const matchDateTime = new Date(match.startDateTime)
  const putZeroIfRequires = (number) => {
    return number < 10 ? "0" + number : number
  }

  const formatDate = () => {
    if (!matchDateTime) return null;
    const dateMonth = matchDateTime.getMonth() + 1;
    const dateDate = matchDateTime.getDate();
    return `${putZeroIfRequires(dateDate)}-${putZeroIfRequires(dateMonth)}-${matchDateTime.getFullYear()}`;
  };

  const formatTime = () => {
    if (!matchDateTime) return null;
    const dateHours = matchDateTime.getHours();
    const dateMinutes = matchDateTime.getMinutes();
    return `${putZeroIfRequires(dateHours)}:${putZeroIfRequires(dateMinutes)}`;
  };

  const addressParts = match.actualAddressName.split(', ');
  let city = '';
  const cityParts = addressParts[0].split(' ')
  cityParts.map((x, i) => i !== 0 ? city += x + (i !== cityParts.length - 1 ? ' ' : '') : '');
  const formattedAddress = `${city}, ${addressParts[addressParts.length-1]}`;

  const formattedDate = formatDate();
  const formattedTime = formatTime();
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-row bg-white mb-3 rounded-lg drop-shadow-2xl'>
      <View className='basis-4/12 flex bg-gray-400 rounded-lg p-2 justify-center items-center' >
        <View>
          <View>
            <Text className='text-center text-md text-white'>{formattedDate ?? '-'}</Text>
          </View>
          <View>
            <Text className='text-center text-white'>{formattedTime ?? '-'}</Text>
          </View>
        </View>
      </View>
      <View className='basis-7/12 flex p-2'>
        <View>
          <Text className='text-right text-lg' numberOfLines={1} ellipsizeMode='tail'>{match.locationName}</Text> 
        </View>
        <View className='flex flex-row justify-end items-center'>
          <View className='flex'>
            <Text className='black text-xs'>{formattedAddress}</Text>
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