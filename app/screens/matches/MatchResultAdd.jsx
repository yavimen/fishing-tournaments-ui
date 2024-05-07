import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useGlobalContext } from "../../context/GlobalContext";
import { matchesService, matchResultsService } from "../../services";
import { BaseSelect, BaseInput, BaseButton } from "../../shared/components";

export function MatchResultAdd({ route, navigation }) {
  const toast = useToast();
  const match = route.params.match;
  const tournament = route.params.tournament;
  const [refreshing, setRefreshing] = useState(false);
  const { matchPlayers, setMatchPlayers, setMatchResults } = useGlobalContext(null);

  const [playerId, setPlayerId] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setRefreshing(true);
      const result = await matchesService.getMatchPlayers(match.id);
      setMatchPlayers(result);
      setRefreshing(false);
    };

    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await matchesService.getMatchPlayers(match.id);
    setMatchPlayers(result);
    setRefreshing(false);
  };

  const onAddResult = async () => {
    setRefreshing(true);
    if (!playerId) {
      toast.show('Виберіть гравця', {type: 'danger'});
      setRefreshing(false);
      return;
    }
    const floatResult = parseFloat(result);
    if (floatResult === NaN || floatResult <= 0) {
      toast.show('Уведіть результат. Він має бути більший нулю', {type: 'danger'});
      setRefreshing(false);
      return;
    }
    
    const responce = await matchResultsService.createMatchResult({
      playerId,
      value: floatResult,
    });

    if (responce.success === false) {
      toast.show(responce.message, {
        type: "danger",
      });
      setRefreshing(false);
      return;
    }

    const matchResults = await matchResultsService.getMatchResults(match.id);
    setMatchResults(matchResults);
    
    navigation.navigate("MatchDetails", { match, tournament })
    toast.show("Результат для учасника успішно додано", {
      type: "success",
    });

    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">Додати результат</Text>
        </View>
      </View>

      <View className="flex-1 px-3">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <BaseSelect
            label={"Учасник"}
            value={playerId}
            setValue={setPlayerId}
            items={matchPlayers.map((x) => ({
              label: x.fullName,
              value: x.id,
            }))}
          />
          <BaseInput
            label={`Результат (${
              tournament.ratingСriterion === 0 ? "Вага, г" : "Довжина, см"
            })`}
            property={result}
            setProperty={setResult}
            inputType={"numeric"}
          />
          <BaseButton
            label={"Додати"}
            onPress={onAddResult}
            loading={refreshing}
            myClassName={'mt-6'}
          />
        </ScrollView>
      </View>
    </View>
  );
}
