import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import TournamentService from '../services/tournamentsService';

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const handleCreateTournament = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name for the tournament');
      return;
    }

    const maxParticipantsNumber = parseInt(maxParticipants);
    if (!maxParticipantsNumber || maxParticipantsNumber <= 0 || maxParticipantsNumber >= 100) {
      Alert.alert('Error', 'Please enter a valid number of maximum participants (1-99)');
      return;
    }
    TournamentService.createTournament({ name, maxParticipantsNumber });
    // Process tournament creation here

    // You can submit form data to an API or perform other actions
  };

  return (
    <View className = 'flex-1 p-4 justify-center items-center'>
      <View className='w-full p-4 bg-white rounded-lg shadow'>
        <Text className='text-lg font-semibold mb-4'>Create Tournament</Text>
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-2 mb-4'
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className='border border-gray-300 rounded-md px-4 py-2 mb-4'
          placeholder="Max Participants (1-99)"
          keyboardType="numeric"
          value={maxParticipants}
          onChangeText={setMaxParticipants}
        />
        <TouchableOpacity
          className='bg-blue-500 rounded-md py-2'
          onPress={handleCreateTournament}
        >
          <Text className='text-white text-lg font-semibold'>Create Tournament</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}