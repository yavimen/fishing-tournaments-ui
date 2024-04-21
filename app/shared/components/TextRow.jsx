import { View, Text } from 'react-native'
import React from 'react'

export function TextRow({label, value, classes, labelCols = 6}) {
  const labelClasses = labelCols === 12 ? '' : `basis-${labelCols}/12`;
  const valueClasses = labelCols === 12 ? '' : `basis-${12 - labelCols}/12`;
  return (
    <View className={`flex ${ labelCols === 12 ? '' : 'flex-row'} ${classes}`}>
        <View className={labelCols === 6 ? 'basis-1/2' : labelClasses}>
            <Text className='text-white font-bold'>{label}</Text>
        </View>
        <View className={labelCols === 6 ? 'basis-1/2' : valueClasses}>
            <Text className='text-white'>{value}</Text>
        </View>
    </View>
  )
}