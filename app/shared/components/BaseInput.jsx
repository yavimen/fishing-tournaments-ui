import { View, Text, TextInput } from 'react-native'
import React from 'react'

export function BaseInput({label, property, setProperty}) {
  return (
    <View className='flex'>
        <Text className="text-base mb-1 ml-3">{label}</Text>
        <TextInput
            className="border rounded-3xl px-4 py-2 mb-4"
            placeholder="..."
            value={property}
            onChangeText={setProperty}
            placeholderTextColor={"#9ca3af"}
        />
    </View>
  )
}