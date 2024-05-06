import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
];

export const BaseSelect = ({ label, items, value, setValue }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item) => {
    return (
      <View className="p-2">
        <Text>{item.label}</Text>
      </View>
    );
  };

  return (
    <View className='mb-2'>
      <Text className="text-base mb-1 ml-3">{label ?? "Opa"}</Text>
      <Dropdown
        className="border border-black rounded-3xl py-1 px-3"
        style={[styles.dropdown, isFocus && { borderColor: "#38bdf8" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={items ?? data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"..."}
        searchPlaceholder="Пошук..."
        value={value}
        containerStyle={styles.itemsContainerStyle}
        renderItem={renderItem}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemsContainerStyle: {
    borderRadius: 20,
    padding: 4,
  },
});
