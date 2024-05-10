import { View, Text } from "react-native";
import React, { useState } from "react";
import { BaseButton, BaseInput } from "../shared/components";
import { useToast } from "react-native-toast-notifications";
import { accountService } from "../services/accountService";
import { useGlobalContext } from "../context/GlobalContext";

export default function SettingsUserInfo({ navigation }) {
  const toast = useToast();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserInfo } = useGlobalContext();

  const handleCreateTournament = async () => {
    setLoading(true);
    if (!name.trim()) {
      toast.show(`Уведіть ім'я`, { type: "danger" });
      setLoading(false);
      return;
    }
    if (!surname.trim()) {
      toast.show(`Уведіть прізвище`, { type: "danger" });
      setLoading(false);
      return;
    }
    const result = await accountService.updateUserInfo({ name, surname });
    if (result.success === false) {
      toast.show(result.message, {
        type: "danger",
      });
    } else {
      setUserInfo(result);
      navigation.navigate("Settings");
      toast.show("Дані успішно оновлено", {
        type: "success",
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">Оновити інформацію профіля</Text>
        </View>
      </View>
      <View className="flex-1 justify-center p-3">
        <BaseInput label={`Ім'я`} property={name} setProperty={setName} />
        <BaseInput
          label={`Прізвище`}
          property={surname}
          setProperty={setSurname}
        />
        <BaseButton
          label={"Оновити"}
          onPress={handleCreateTournament}
          loading={loading}
          myClassName={"mt-5"}
        />
      </View>
    </View>
  );
}
