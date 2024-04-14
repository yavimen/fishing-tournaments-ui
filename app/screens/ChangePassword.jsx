import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { resetPassword } from "../services/authService";

export default function ChangePassword() {
  const [email, setEmail] = useState(null);
  const [resetPasswordResponse, setResetPasswordResponse] = useState(null);

  const onPasswordReset = async () => {
    const result = await resetPassword(email);
    console.info(result);
    setResetPasswordResponse(result);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TextInput className='my-3' placeholder="Пошта" onChangeText={(e) => setEmail(e)} />
      <Button onPress={onPasswordReset} title="Змінити пароль" />
      <Text className={resetPasswordResponse?.success === false ? 'text-red-700' : 'text-green-700'}>
        {resetPasswordResponse?.success === false
          ? resetPasswordResponse.message
          : "Лист із відновленням паролю було на діслано на вашу поштову скриньку"}
      </Text>
    </View>
  );
}
