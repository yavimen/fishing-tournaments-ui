import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { tournamentsService } from "../../services";

import { useGlobalContext } from "../../context/GlobalContext";
import { useToast } from "react-native-toast-notifications";
import { BaseInput, BaseButton, BaseSelect } from "../../shared/components";

export default function UpdateTournament({ route, navigation }) {
  const tournament = route.params.tournament;
  const [name, setName] = useState(tournament.name);
  const [maxParticipants, setMaxParticipants] = useState(
    tournament.maxParticipantNumber?.toString() ?? "0"
  );
  const [description, setDescription] = useState(tournament.description);
  const [startConditions, setStartConditions] = useState(
    tournament.startConditions
  );
  const [ratingСriterion, setRatingСriterion] = useState(
    tournament.ratingСriterion
  );

  const ratingСriterions = [
    { label: "Вага", value: 0 },
    { label: "Довжина", value: 1 },
  ];

  const { getMyTournamentById, setTournamentDetails } = useGlobalContext();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const handleCreateTournament = async () => {
    setLoading(true);
    if (!name.trim()) {
      toast.show("Уведіть назву турніру", {
        type: "danger",
      });
      setLoading(false);
      return;
    }
    const maxParticipantNumber = parseInt(maxParticipants);
    if (
      !maxParticipantNumber ||
      maxParticipantNumber <= 0 ||
      maxParticipantNumber >= 100
    ) {
      toast.show("Уведіть максимальну кількість учасників турніру (1-99)", {
        type: "danger",
      });
      setLoading(false);
      return;
    }
    const result = await tournamentsService.updateTournament(tournament.id, {
      name,
      maxParticipantNumber,
      description,
      startConditions,
      ratingСriterion,
    });

    if (result.success === false) {
      toast.show(result.message, {
        type: "danger",
      });
    } else {
      const tournamentDetails = await tournamentsService.getMyTournamentById(
        tournament.id
      );
      setTournamentDetails(tournamentDetails);
      navigation.navigate("TournamentDetails", { id: tournament.id });
      toast.show("Турнір успішно оновлено", {
        type: "success",
      });
    }
    setLoading(false);
  };
  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">Оновити турнір</Text>
        </View>
      </View>
      <ScrollView className="flex-1 p-3">
        <BaseInput
          label={"Назва турніру"}
          property={name}
          setProperty={setName}
        />
        <BaseInput
          label={"Максимальна кількість учасників (3-99)"}
          property={maxParticipants}
          setProperty={setMaxParticipants}
          inputType={"numeric"}
        />
        <BaseSelect
          value={ratingСriterion}
          setValue={setRatingСriterion}
          label={"Критерій оцінювання"}
          items={ratingСriterions}
        />
        <BaseInput
          label={"Опис турніру"}
          property={description}
          setProperty={setDescription}
          multiline={true}
        />
        <BaseInput
          label={"Умови для участі"}
          property={startConditions}
          setProperty={setStartConditions}
          multiline={true}
        />
      </ScrollView>
      <BaseButton
        myClassName={"m-4"}
        label={"Оновити турнір"}
        onPress={handleCreateTournament}
        loading={loading}
      />
    </View>
  );
}
