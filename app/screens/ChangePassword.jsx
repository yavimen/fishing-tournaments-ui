import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { resetPassword } from "../services/authService";
import { BaseInput, BaseButton } from "../shared/components";
import { useToast } from "react-native-toast-notifications";

export default function ChangePassword() {
  const toast = useToast();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const onPasswordReset = async () => {
    setLoading(true);
    if (!email) {
      toast.show('Уведіть пошту', {type: 'danger'});
      setLoading(false);
      return;
    }
    const result = await resetPassword(email);
    if (result.success === false) {
      toast.show(result.message, {type: 'danger'});
    }
    else {
      toast.show("Лист із відновленням паролю було на діслано на вашу поштову скриньку", {type: 'success'});
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-white px-3">
      <Text className="my-2 text-center text-lg">Зміна пароля</Text>
      <BaseInput label={"Пошта"} property={email} setProperty={setEmail} myClassName={'mb-5'}/>
      <BaseButton onPress={onPasswordReset} label="Змінити пароль" loading={loading} />
    </View>
  );
}
