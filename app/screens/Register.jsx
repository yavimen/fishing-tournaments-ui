import { View, Text, TextInput, Button } from 'react-native'
import React, { createRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { register } = useAuth();

  const [registerResponse, setRegisterResponse] = useState(null);

  const passwordInputRef = createRef();


  const onRegister = async () => {
    const result = await register(email, password, confirmPassword);
    console.info(result);

    if (result.message === 'Password does not match') 
    {
      setPassword(null);
      setConfirmPassword(null);
    }

    setRegisterResponse(result)
  }

  return (
    <View>
      <TextInput placeholder='Пошта' onChangeText={(e) => setEmail(e)} />
      <TextInput placeholder='Пароль'secureTextEntry={true} onChangeText={(e) => setPassword(e)}/>
      <TextInput placeholder='Повторити пароль'secureTextEntry={true} onChangeText={(e) => setConfirmPassword(e)} />
      <Button onPress={onRegister} title='Зареєструватися'/>
      <Text>{registerResponse?.success === false ? registerResponse.message : null}</Text>
    </View>
  )
}