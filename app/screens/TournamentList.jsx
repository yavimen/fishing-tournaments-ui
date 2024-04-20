import { View } from 'react-native'
import React, { useEffect } from 'react'
import FloatingAddButton from '../shared/components/FloatingAddButton'

import {useNavigation} from '@react-navigation/native'
import TournamentService from '../services/tournamentsService';

export default function TournamentList() {
  const navigation = useNavigation();

  useEffect(() => {
    TournamentService.getAllTournaments().then((result) => {
      console.log(result);
    });
  }, []);
  return (
    <View className='flex-1 pt-6'>
      <FloatingAddButton onPress={() => navigation.navigate('CreateTournament')}/>
    </View>
  )
}