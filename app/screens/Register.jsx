import { View, Text } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BaseInput, BaseButton } from "../shared/components";
import { useToast } from "react-native-toast-notifications";

export default function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onRegister = async () => {
    setLoading(true);
    if (!email) {
      toast.show("Уведіть пошту", { type: "danger" });
      setLoading(false);
      return;
    }
    if (!password) {
      toast.show("Уведіть пароль", { type: "danger" });
      setLoading(false);
      return;
    }
    if (!confirmPassword) {
      toast.show("Повторіть пароль", { type: "danger" });
      setLoading(false);
      return;
    }
    const result = await register(email, password, confirmPassword);
    console.info(result);

    if (result.message === "Password does not match") {
      setPassword(null);
      setConfirmPassword(null);
    } else if (result.success === false) {
      toast.show(result.message, { type: "danger" });
    } else {
      toast.show("Ви успішно зареєструвалися", { type: "success" });
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-white px-3">
      <Text className="my-2 text-center text-lg">Реєстрація</Text>
      <BaseInput label={"Пошта"} property={email} setProperty={setEmail} />
      <BaseInput
        label={"Пароль"}
        property={password}
        setProperty={setPassword}
        secureTextEntry={true}
      />
      <BaseInput
        label={"Повторити пароль"}
        property={confirmPassword}
        setProperty={setConfirmPassword}
        myClassName={"mb-6"}
        secureTextEntry={true}
      />
      <BaseButton
        onPress={onRegister}
        label="Зареєструватися"
        loading={loading}
      />
    </View>
  );
}
