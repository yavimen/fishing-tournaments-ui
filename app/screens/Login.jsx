import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native'

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = useAuth();

  const [loginResponse, setLoginResponse] = useState(null);

  const navigation = useNavigation();

  const onLogin = async () => {
    const result = await login(email, password);
    console.info(result);
    setLoginResponse(result)
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='my-2 text-base'>Вхід у обліковий запис</Text>
      <TextInput className='my-2' placeholder='Пошта' onChangeText={(e) => setEmail(e)} />
      <TextInput className='my-2' placeholder='Пароль'secureTextEntry={true} onChangeText={(e) => setPassword(e)} />
      <Button onPress={onLogin} title='Ввійти'/>
      <Text className='text-red-700'>{loginResponse?.success === false ? loginResponse.message : null}</Text>
      
      <View className='flex-row items-center my-2'>
        <Text>Забули пароль ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <Text className='ml-1 text-sky-600'>Відновити пароль</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className='text-sky-600'>
          Зареєструвати новий акаунт
        </Text>
      </TouchableOpacity>
    </View>
  )
}