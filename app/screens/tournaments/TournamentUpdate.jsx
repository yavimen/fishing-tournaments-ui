import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { tournamentsService } from "../../services";

import { useGlobalContext } from "../../context/GlobalContext";
import { useToast } from "react-native-toast-notifications";

export default function UpdateTournament({ route, navigation }) {
  const tournament = route.params.tournament;
  const [name, setName] = useState(tournament.name);
  const [maxParticipants, setMaxParticipants] = useState(
    tournament.maxParticipantNumber?.toString() ?? "0"
  );
  const [description, setDescription] = useState(tournament.description);
  const [startConditions, setStartConditions] = useState(tournament.startConditions);

  const { getMyTournamentById, setTournamentDetails } = useGlobalContext();
  const toast = useToast();

  const handleCreateTournament = async () => {
    if (!name.trim()) {
      Alert.alert("Увага", "Уведіть назву турніру");
      return;
    }
    const maxParticipantNumber = parseInt(maxParticipants);
    if (
      !maxParticipantNumber ||
      maxParticipantNumber <= 0 ||
      maxParticipantNumber >= 100
    ) {
      Alert.alert(
        "Увага",
        "Уведіть максимальну кількість учасників турніру (1-99)"
      );
      return;
    }
    const result = await tournamentsService.updateTournament(tournament.id, {
      name,
      maxParticipantNumber,
      description,
      startConditions,
    });

    if (result.success === false) {
      toast.show(result.message, {
        type: "danger",
      });
    } else {
      const tournamentDetails = await tournamentsService.getMyTournamentById(tournament.id);
      setTournamentDetails(tournamentDetails);
      navigation.navigate("TournamentDetails", { id: tournament.id });
      toast.show("Турнір успішно оновлено", {
        type: "success",
      });
    }
  };
  return (
    <SafeAreaView className="flex-1 pt-6 mt-6">
      <View className="flex flex-row pl-3">
        <TouchableOpacity onPress={() => navigation.navigate("TournamentList")}>
          <Text>Турніри / </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TournamentDetails", { id: tournament.id })
          }
        >
          <Text>{tournament?.name}</Text>
        </TouchableOpacity>
        <Text> / Оновити</Text>
      </View>
      <ScrollView className="flex-1 mt-3">
        <View className="flex-1 bg-gray-500 mx-3 p-3 rounded-lg ">
          <Text className='text-white font-bold mb-1'>Назва</Text>
          <TextInput
            className="border border-white rounded-md px-4 py-2 mb-4 text-white"
            placeholder="..."
            value={name}
            onChangeText={setName}
            placeholderTextColor={'#9ca3af'}
          />
          <Text className='text-white font-bold mb-1'>Максимальна кількість учасників (1-99)</Text>
          <TextInput
            className="border border-white rounded-md px-4 py-2 mb-4 text-white"
            placeholder="..."
            keyboardType="numeric"
            value={maxParticipants}
            onChangeText={setMaxParticipants}
            placeholderTextColor={'#9ca3af'}
          />
          <Text className='text-white font-bold mb-1'>Опис турніру</Text>
          <TextInput
            className="border border-white rounded-md px-4 py-2 mb-4 max-h-[220px] text-white"
            placeholder="..."
            inputMode="text"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={"top"}
            placeholderTextColor={'#9ca3af'}
          />
          <Text className='text-white font-bold mb-1'>Умови для участі</Text>
          <TextInput
            className="border border-white rounded-md px-4 py-2 mb-4 max-h-[220px] text-white"
            placeholder="..."
            inputMode="text"
            value={startConditions}
            onChangeText={setStartConditions}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={"top"}
            placeholderTextColor={'#9ca3af'}
          />
          <TouchableOpacity
            className="bg-gray-600 rounded-md py-2"
            onPress={handleCreateTournament}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Оновити турнір
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
