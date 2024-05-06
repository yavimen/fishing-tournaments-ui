import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import FeatherIcon from "react-native-vector-icons/Feather";
import { getFormattedDate, getFormattedTime } from "../dateTime";
export function MyDateTimePicker({ date, setDate }) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const formattedDate = getFormattedDate(date);
  const formattedTime = getFormattedTime(date);
  return (
    <View>
      <View className="flex flex-row justify-between">
        <View className='p-2'>
          <Text>{`${date ? formattedDate : '-'} ${formattedTime ?? ''}`}</Text>
        </View>
        <TouchableOpacity className='flex-row bg-gray-200 items-center p-2 rounded-lg' onPress={showDatepicker}>
          <Text>Дата</Text>
          <FeatherIcon name="calendar" size={20} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row bg-gray-200 items-center p-2 rounded-lg' onPress={showTimepicker}>
          <Text>Час</Text>
          <FeatherIcon name="clock" size={20} />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? new Date(date) : new Date()}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}
