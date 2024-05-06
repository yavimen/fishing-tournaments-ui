import { TouchableOpacity, Text } from "react-native";
import React from "react";

export function FloatingAddButton({ onPress }) {
  return (
    <TouchableOpacity
      className="absolute bottom-10 right-4 w-14 h-14 bg-sky-400 rounded-full flex items-center justify-center"
      onPress={() => {
        onPress ? onPress() : null;
      }}
    >
      <Text className="text-white text-3xl">+</Text>
    </TouchableOpacity>
  );
}
