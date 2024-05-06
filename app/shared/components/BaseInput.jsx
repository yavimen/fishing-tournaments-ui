import { View, Text, TextInput } from 'react-native'
import React from 'react'

export function BaseInput({label, property, setProperty, inputType, multiline, myClassName, secureTextEntry}) {
  return (
    <View className={`flex ${myClassName}`}>
        <Text className="text-base mb-1 ml-3">{label}</Text>
        <TextInput
            className={`border rounded-3xl px-4 pt-2 ${multiline ? 'max-h-[220px]' : ''}`}
            placeholder="..."
            keyboardType={inputType ?? "default"}
            value={property}
            onChangeText={setProperty}
            placeholderTextColor={"#9ca3af"}
            multiline={multiline}
            numberOfLines={multiline ? 5 : 1}
            textAlignVertical={multiline ? 'top' : 'center'}
            secureTextEntry={secureTextEntry}
        />
    </View>
  )
}