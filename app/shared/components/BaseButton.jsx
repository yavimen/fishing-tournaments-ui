import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

export function BaseButton({ label, onPress, loading, myClassName }) {
  const buttomBgColor = loading ? 'bg-gray-300' : 'bg-sky-400';
  return (
    <TouchableOpacity className={`${buttomBgColor} p-3 rounded-3xl ${myClassName}`} onPress={onPress} disabled={loading ?? false}>
      <Text className='text-white text-center text-base'>{label}</Text>
      {loading && <ActivityIndicator className='absolute inset-y-0 right-3' size="large" color="white" />}
    </TouchableOpacity>
  )
}
