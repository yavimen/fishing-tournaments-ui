import { View, Text, TouchableOpacity } from 'react-native'
import FeatherIcon from "react-native-vector-icons/Feather";
import React from 'react'
import { getFormattedDate, getFormattedTime } from '../dateTime';

export function TournamentListItem({ tournament, onPress, isPublic }) {
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-row bg-white mb-3 justify-between rounded-3xl drop-shadow-2xl border'>
      <View className='flex bg-sky-400 rounded-3xl py-2 px-3' >
        <View>
          <Text className={`text-center text-md text-white`}>{getFormattedDate(tournament.startDate) ?? '-'}</Text>
        </View>
        <View>
          <Text className={`text-center text-white ${tournament.startDate ? 'text-white' : 'text-sky-400' }`}>{getFormattedTime(tournament.startDate) ?? '00-00-0000'}</Text>
        </View>
      </View>
      <View className='flex-row justify-end'>
        <View className='flex p-2'>
          <View>
            <Text className='text-right text-base' numberOfLines={1} ellipsizeMode='tail'>{tournament.name}</Text> 
          </View>
          <View className='flex flex-row justify-end items-center'>
            <View>
              <Text className='black'>{isPublic ? tournament.firstMatchLocation : tournament.participantAmount ?? 0}</Text>
            </View>
            <View>
              <FeatherIcon color="black" name={isPublic ? "map-pin" : "user"} size={15} />
            </View>
          </View>
        </View>
        <View className='flex justify-center items-center'>
          <FeatherIcon color="black" name="chevron-right" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  )
}