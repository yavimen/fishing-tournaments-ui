import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { tournamentsService } from '../../services';
import {useNavigation} from '@react-navigation/native'

import { useGlobalContext } from '../../context/GlobalContext';

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const { setTournaments } = useGlobalContext();

  const navigation = useNavigation();

  const handleCreateTournament = async () => {
    if (!name.trim()) {
      Alert.alert('Увага', 'Уведіть назву турніру');
      return;
    }
    const maxParticipantNumber = parseInt(maxParticipants);
    if (!maxParticipantNumber || maxParticipantNumber <= 0 || maxParticipantNumber >= 100) {
      Alert.alert('Увага', 'Уведіть максимальну кількість учасників турніру (1-99)');
      return;
    }
    await tournamentsService.createTournament({ name, maxParticipantNumber })

    const tournaments = await tournamentsService.getMyTournaments();
    
    setTournaments(tournaments);
    
    navigation.navigate('TournamentList');
  };

  return (
    <View className = 'flex-1 p-4 justify-center items-center'>
      <View className='w-full p-4 bg-white rounded-lg shadow'>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-2 mb-4'
          placeholder="Назва"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-2 mb-4'
          placeholder="Максимальна кількість учасників (1-99)"
          keyboardType="numeric"
          value={maxParticipants}
          onChangeText={setMaxParticipants}
        />
        <TouchableOpacity
          className='bg-gray-500 rounded-md py-2'
          onPress={handleCreateTournament}
        >
          <Text className='text-white text-lg font-semibold text-center'>Створити турнір</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}