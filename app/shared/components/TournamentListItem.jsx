import { View, Text, TouchableOpacity } from 'react-native'
import FeatherIcon from "react-native-vector-icons/Feather";
import React from 'react'

export function TournamentListItem({ tournament, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-row bg-white mb-3 rounded-lg drop-shadow-2xl'>
      <View className='basis-4/12 flex bg-gray-400 rounded-lg p-2' >
        <View>
          <Text className='text-center text-md text-white'>{tournament.startDate ?? '-'}</Text>
        </View>
        <View>
          <Text className='text-center text-white'>{tournament.startTime ?? '-'}</Text>
        </View>
      </View>
      <View className='basis-7/12 flex p-2'>
        <View>
          <Text className='text-right text-md' numberOfLines={1} ellipsizeMode='tail'>{tournament.name}</Text> 
        </View>
        <View className='flex flex-row justify-end items-center'>
          <View>
            <Text className='black'>{tournament.participantAmount ?? 0}</Text>
          </View>
          <View>
            <FeatherIcon color="black" name="user" size={15} />
          </View>
        </View>
      </View>
      <View className='basis-1/12 flex justify-center items-center'>
        <FeatherIcon color="black" name="chevron-right" size={20} />
      </View>
    </TouchableOpacity>
  )
}