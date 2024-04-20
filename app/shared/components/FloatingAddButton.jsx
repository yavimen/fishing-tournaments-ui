import { TouchableOpacity, Text } from "react-native";
import React from "react";

export default function FloatingAddButton({ onPress }) {
  return (
    <TouchableOpacity
      className="absolute bottom-10 right-10 w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center"
      onPress={() => {
        onPress ? onPress() : null;
      }}
    >
      <Text className="text-white text-3xl">+</Text>
    </TouchableOpacity>
  );
}
