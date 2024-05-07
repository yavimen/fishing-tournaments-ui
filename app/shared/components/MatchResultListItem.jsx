import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import FeatherIcon from "react-native-vector-icons/Feather";

export function MatchResultListItem({result, tournamentRatingCriteria, onPress}) {
  const [loading, setLoading] = useState(false);
  const onDeletePress = async () => {
    setLoading(true);
    onPress(result)
    setLoading(false);
  }
  return (
    <View className="flex flex-row justify-between bg-white mb-2 border border-black rounded-3xl drop-shadow-2xl">
      <View className="flex p-1">
        <View className='ml-3'>
          <View>
            <Text className="text-xl">
              {`${result?.value ?? '-'} ${tournamentRatingCriteria === 0 ? 'г' : 'см'}`}
            </Text>
          </View>
          <View className='flex-row'>
            <FeatherIcon color="black" name="user" size={16} />
            <Text className="ml-1 text-xs">
              {result?.player?.fullName ?? "-"}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onDeletePress} className="bg-red-500 p-3 flex justify-center items-center rounded-3xl">
        <FeatherIcon color="white" name="trash-2" size={20} />
      </TouchableOpacity>
    </View>
  )
}