import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function SettingsMenuItem({ iconName, title, onPressHandler }) {
    const rowStyle = 'flex flex-row items-center justify-start h-16 bg-gray-500 rounded-lg mb-3 pl-3 pr-3';
    const iconRowStyle = 'w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white';
    const rowLabelStyle = 'text-base font-normal text-white';
    const rowSpacerStyle = 'flex-grow flex-shrink flex-basis-0 text-white';

  return (
    <TouchableOpacity
      className={rowStyle}
      onPress={() => onPressHandler()}
    >
      <View className={iconRowStyle}>
        <FeatherIcon color="white" name={iconName ?? 'globe'} size={20} />
      </View>

      <Text className={rowLabelStyle}>{title}</Text>

      <View className={rowSpacerStyle} />

      <FeatherIcon color="white" name="chevron-right" size={20} />
    </TouchableOpacity>
  );
}
