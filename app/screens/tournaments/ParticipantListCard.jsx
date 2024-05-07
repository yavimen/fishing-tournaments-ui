import { View, Text, RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { participantsService } from "../../services";
import { ParticipantListItem } from "../../shared/components";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function ParticipantListCard({ tournament, loading }) {
  const { myTournamentParticipants, setMyTournamentParticipants } =
    useGlobalContext();
  const [refreshing, setRefreshing] = useState(loading);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await participantsService.getMyTournamentParticipants({
      tournamentId: tournament.id,
    });
    setMyTournamentParticipants(result);
    setRefreshing(false);
  };
  return (
    <View className="flex-1 bg-white">
    <View className='flex-row justify-end p-3'>
      <TouchableOpacity
        className="bg-sky-400 p-2 rounded-full"
        onPress={() => {}}
      >
        <FeatherIcon color="white" name="award" size={20} />
      </TouchableOpacity>
    </View>
      <ScrollView
        className="px-3"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {myTournamentParticipants.totalCount ? myTournamentParticipants.items.map((x) => (
          <ParticipantListItem participant={x} key={x.id}/>
        )) : <Text className='text-center text-base'>У вашого турніру ще немає учасників</Text>}
      </ScrollView>
    </View>
  );
}
