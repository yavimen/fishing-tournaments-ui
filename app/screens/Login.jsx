import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { BaseInput, BaseButton } from "../shared/components";
import { useToast } from "react-native-toast-notifications";

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigation = useNavigation();

  const onLogin = async () => {
    setLoading(true);
    if (!email) {
      toast.show('Уведіть пошту', {type: 'danger'});
      setLoading(false);
      return;
    }
    if (!password) {
      toast.show('Уведіть пароль', {type: 'danger'});
      setLoading(false);
      return;
    }
    const result = await login(email, password);
    if (result.success === false) {
      toast.show(result.message, {type: 'danger'});
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-white px-3">
      <View>
      <Text className="my-2 text-center text-lg">Вхід у обліковий запис</Text>
      <BaseInput label={"Пошта"} property={email} setProperty={setEmail} />
      <BaseInput
        myClassName={'mb-6'}
        label={"Пароль"}
        property={password}
        setProperty={setPassword}
        secureTextEntry={true}
      />
      <BaseButton onPress={onLogin} label="Ввійти" loading={loading} />

      <View className="flex-row justify-center items-center my-2">
        <Text>Забули пароль ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
          <Text className="ml-1 text-sky-400">Відновити пароль</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text className="text-center text-sky-400">
          Зареєструвати новий акаунт
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
