import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { tournamentsService } from '../../services';
import {useNavigation} from '@react-navigation/native'

import { useGlobalContext } from '../../context/GlobalContext';

import { BaseInput, BaseButton, BaseSelect } from '../../shared/components';
import { useToast } from "react-native-toast-notifications";

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const [loading, setLoading] = useState(false);

  const { setTournaments } = useGlobalContext();

  const [ratingСriterion, setRatingСriterion] = useState(null);

  const ratingСriterions = [
    { label: "Вага", value: 0 },
    { label: "Довжина", value: 1 },
  ];

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
    if (!maxParticipantNumber || maxParticipantNumber < 3 || maxParticipantNumber >= 100) {
      toast.show('Уведіть максимальну кількість учасників турніру (3-99)', {type: 'danger'});
      setLoading(false);
      return;
    }
    if (ratingСriterion === null) {
      toast.show('Оберіть критерій оцінювання', {type: 'danger'});
      setLoading(false);
      return;
    }
    await tournamentsService.createTournament({ name, maxParticipantNumber, ratingСriterion })

    const tournaments = await tournamentsService.getMyTournaments({actual:true});
    
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
      <View className='flex-1 p-3 justify-center'>
        <BaseInput
          label={'Назва турніру'}
          property={name}
          setProperty={setName}
        />
        <BaseInput
          label={'Максимальна кількість учасників (3-99)'}
          property={maxParticipants}
          setProperty={setMaxParticipants}
          inputType={'numeric'}
        />
        <BaseSelect
          value={ratingСriterion}
          setValue={setRatingСriterion}
          label={"Критерій оцінювання"}
          items={ratingСriterions}
        />
        <BaseButton
          label={'Створити турнір'}
          myClassName={'mt-3'}
          onPress={handleCreateTournament}
          loading={loading}
        />
      </View>
    </View>
  );
}