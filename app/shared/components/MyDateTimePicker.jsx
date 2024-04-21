import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import FeatherIcon from "react-native-vector-icons/Feather";
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

  const putZeroIfRequires = (number) => {
    return number < 10 ? "0" + number : number
  }

  const formatDate = () => {
    const dateMonth = date.getMonth() + 1;
    const dateDate = date.getDate();
    return `${putZeroIfRequires(dateDate)}-${putZeroIfRequires(dateMonth)}-${date.getFullYear()}`;
  };

  const formatTime = () => {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();
    return `${dateHours}:${dateMinutes}`;
  };

  const formattedDate = formatDate();
  const formattedTime = formatTime();
  return (
    <View>
      <View className="flex flex-row justify-between">
        <View>
          <Text>{`${formattedDate} ${formattedTime}`}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={showDatepicker}>
            <FeatherIcon color="white" name="calendar" size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={showTimepicker}>
            <FeatherIcon color="white" name="clock" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
