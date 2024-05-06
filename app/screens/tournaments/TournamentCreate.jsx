import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { tournamentsService } from '../../services';
import {useNavigation} from '@react-navigation/native'

import { useGlobalContext } from '../../context/GlobalContext';

import { BaseInput, BaseButton } from '../../shared/components';
import { useToast } from "react-native-toast-notifications";

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const [loading, setLoading] = useState(false);

  const { setTournaments } = useGlobalContext();

  const navigation = useNavigation();
  const toast = useToast();

  const handleCreateTournament = async () => {
    setLoading(true);
    if (!name.trim()) {
      toast.show('Уведіть назву турніру', {type: 'danger'});
      setLoading(false);
      return;
    }
    const maxParticipantNumber = parseInt(maxParticipants);
    if (!maxParticipantNumber || maxParticipantNumber <= 0 || maxParticipantNumber >= 100) {
      toast.show('Уведіть максимальну кількість учасників турніру (1-99)', {type: 'danger'});
      setLoading(false);
      return;
    }
    await tournamentsService.createTournament({ name, maxParticipantNumber })

    const tournaments = await tournamentsService.getMyTournaments();
    
    setTournaments(tournaments);
    
    navigation.navigate('TournamentList');

    toast.show('Турнір успішно створений', {type: 'success'});
    setLoading(false);
  };

  return (
    <View className = 'flex-1 bg-white'>
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">Створити турнір</Text>
        </View>
      </View>
      <View className='p-3'>
        <BaseInput
          label={'Назва турніру'}
          property={name}
          setProperty={setName}
        />
        <BaseInput
          label={'Максимальна кількість учасників (1-99)'}
          property={maxParticipants}
          setProperty={setMaxParticipants}
          inputType={'numeric'}
        />

        <BaseButton
          label={'Створити турнір'}
          onPress={handleCreateTournament}
          loading={loading}
        />
      </View>
    </View>
  );
}