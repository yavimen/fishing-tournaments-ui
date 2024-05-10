import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  participantsService,
  publicTournamentsService,
  tournamentsService,
  publicMatchesService,
} from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";
import { TabView, SceneMap } from "react-native-tab-view";
import ParticipantListCard from "../tournaments/ParticipantListCard";
import { TextRow, BaseButton } from "../../shared/components";
import { getFormattedDate, getFormattedTime } from "../../shared";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { jwtService } from "../../services";
import { PublicMatcheList } from "./PublicMatcheList";

const ratingСriterions = [
  { label: "Вага", value: 0 },
  { label: "Довжина", value: 1 },
];

export function PublicTournamentDetails({ route, navigation }) {
  const { authState } = useAuth();
  const toast = useToast();
  const {
    publicTournamentDetails,
    setPublicTournamentDetails,
    myTournamentParticipants,
    setMyTournamentParticipants,
    setPublicTournaments,
    setPublicMatches,
    setParticipatedTournamens,
  } = useGlobalContext();

  const tournamentId = route.params.id;
  const [refreshing, setRefreshing] = useState(false);

  const [isUserInParticipants, setIsUserInParticipants] = useState(true);

  const determinWhetherUserInParticipants = async (tournamentParticipants) => {
    const userId = await jwtService.getUserId();
    const result = tournamentParticipants?.items?.some(
      (x) => x.person.id === userId
    );
    console.log("result:", result)
    setIsUserInParticipants(result);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const tournamentDetails =
      await publicTournamentsService.getPublicTournamentById(tournamentId);
    setPublicTournamentDetails(tournamentDetails);
    setRefreshing(false);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Деталі" },
    { key: "second", title: "Матчі" },
    { key: "third", title: "Учасники" },
  ]);
  const labelCols = 6;
  useEffect(() => {
    const loadData = async () => {
      setRefreshing(true);
      const tournamentDetails =
        await publicTournamentsService.getPublicTournamentById(tournamentId);
      setPublicTournamentDetails(tournamentDetails);

      const tournamentParticipants =
        await participantsService.getMyTournamentParticipants({
          tournamentId: tournamentId,
        });

      setMyTournamentParticipants(tournamentParticipants);

      const publicMatches = await publicMatchesService.getPublicMatches({
        tournamentId: tournamentId,
      });
      setPublicMatches(publicMatches);

      determinWhetherUserInParticipants(tournamentParticipants);
      setRefreshing(false);
    };
    loadData();
  }, [tournamentId]);

  const registerForTournament = async () => {
    setRefreshing(true);

    var response = await tournamentsService.registerForTournament(
      publicTournamentDetails.id
    );

    if (response.success === false) {
      toast.show(response.message, {
        type: "danger",
      });
    } else {
      const tournamentDetails =
        await publicTournamentsService.getPublicTournamentById(
          publicTournamentDetails.id
        );
      setPublicTournamentDetails(tournamentDetails);

      const publicTournaments =
        await publicTournamentsService.getPublicTournaments();
      setPublicTournaments(publicTournaments);

      const tournamentParticipants =
        await participantsService.getMyTournamentParticipants({
          tournamentId: route.params.id,
        });
      setMyTournamentParticipants(tournamentParticipants);

      const participatedTournamens =
        await publicTournamentsService.getPublicTournaments({
          getUserParticipations: true,
        });
      setParticipatedTournamens(participatedTournamens);

      toast.show("Ви успішно зараєструвалися на турнір", {
        type: "success",
      });

      setIsUserInParticipants(true);
    }
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => (
            <View className="flex-1 p-3">
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <Text className="text-lg">{"Турнір " + publicTournamentDetails.name}</Text>
                <TextRow
                  label={"Дата проведення:"}
                  value={
                    getFormattedDate(publicTournamentDetails?.startDate) ?? "-"
                  }
                  classes={"mb-2"}
                  labelCols={labelCols}
                />
                <TextRow
                  label={"Час проведення:"}
                  value={
                    getFormattedTime(publicTournamentDetails?.startDate) ?? "-"
                  }
                  classes={"mb-2"}
                  labelCols={labelCols}
                />
                <TextRow
                  label={"Максимальна кількість учасників:"}
                  value={publicTournamentDetails?.maxParticipantNumber ?? "-"}
                  classes={"mb-2"}
                  labelCols={labelCols}
                />
                <TextRow
                  label={"Критерій оцінювання:"}
                  value={
                    ratingСriterions.find(
                      (x) => x.value === publicTournamentDetails.ratingСriterion
                    )?.label ?? "-"
                  }
                  classes={"mb-2"}
                  labelCols={labelCols}
                />
                <TextRow
                  label={"Останній раз оновлено:"}
                  value={
                    getFormattedDate(publicTournamentDetails?.lastUpdate) +
                    " " +
                    getFormattedTime(publicTournamentDetails?.lastUpdate)
                  }
                  classes={"mb-2"}
                  labelCols={labelCols}
                />
                <TextRow
                  label={"Опис:"}
                  value={publicTournamentDetails?.description ?? "-"}
                  classes={"mb-2"}
                  labelCols={12}
                />
                <TextRow
                  label={"Умови участі:"}
                  value={publicTournamentDetails?.startConditions ?? "-"}
                  classes={"mb-2"}
                  labelCols={12}
                />
              </ScrollView>
              {authState.authenticated && !isUserInParticipants && (
                <View className="flex-1 justify-center">
                  <BaseButton
                    onPress={registerForTournament}
                    label={"Зареєструватися на турнір"}
                  />
                </View>
              )}
            </View>
          ),
          second: () => (
            <PublicMatcheList
              tournamentId={publicTournamentDetails.id}
              tournament={publicTournamentDetails}
              navigation={navigation}
            />
          ),
          third: () => (
            <ParticipantListCard
              tournament={publicTournamentDetails}
              isPublic={true}
            />
          ),
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <View className="flex flex-row bg-sky-400">
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                className={`flex-1 justify-center items-center rounded-t-3xl ${
                  index == i ? "bg-white" : "bg-gray-300"
                }`}
                key={route.key}
                onPress={() => setIndex(i)}
              >
                <Text className="text-lg">{route.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}
