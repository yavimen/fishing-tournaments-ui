import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { tournamentsService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextRow } from "../../shared/components";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ConfirmationDialog } from "../../shared/components";
import { useToast } from "react-native-toast-notifications";

export default function TournamentDetails({ route, navigation }) {
  const { tournamentDetails, setTournamentDetails, setTournaments } = useGlobalContext();
  const toast = useToast();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cofirmText, setCofirmText] = useState(null);
  const [cofirmCancelAction, setCofirmCancelAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const [cofirmSubmitAction, setCofirmSubmitAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  useEffect(() => {
    tournamentsService
      .getMyTournamentById(route.params.id)
      .then((result) => setTournamentDetails(result));
  }, [route.params.id]);

  const onDeleteAction = () => {
    setCofirmText(
      `Ви впевнені, що хочете видалити '${tournamentDetails?.name}'?`
    );
    setCofirmCancelAction(() => () => {
      setShowConfirmDialog(false);
    });
    setCofirmSubmitAction(() => async () => {

      const result = await tournamentsService.deleteTournament(route.params.id);
      setShowConfirmDialog(false);
      if (result.success === false) {
        toast.show(result.message, {
          type: "danger",
        });
      } else {
        const tournaments = await tournamentsService.getMyTournaments();
        setTournaments(tournaments)
        navigation.navigate("TournamentList");
        toast.show("Турнір успішно видалено", {
          type: "success",
        });
      }
    });

    setShowConfirmDialog(true);
  };
  const onUpdateAction = () => {
    navigation.navigate('UpdateTournament', {tournament: tournamentDetails})
  };

  return (
    <SafeAreaView className="flex-1 pt-6">
      <View className="flex flex-row pl-3">
        <TouchableOpacity onPress={() => navigation.navigate("TournamentList")}>
          <Text>Турніри / </Text>
        </TouchableOpacity>
        <Text>{tournamentDetails?.name}</Text>
      </View>

      <ScrollView className="flex-1">
        <Text className="text-gray-500 text-lg mt-3 mx-3">{"Деталі"}</Text>
        <View className="flex bg-gray-500 mx-3 p-3 rounded-lg">
          <TouchableOpacity
            className="bg-red-400"
            style={{
              position: "absolute",
              top: -20,
              right: 10,
              width: 40,
              height: 40,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => onDeleteAction()}
          >
            <FeatherIcon color="white" name="trash-2" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-400"
            style={{
              position: "absolute",
              top: -20,
              right: 60,
              width: 40,
              height: 40,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10, // Ensure the button is above other elements
            }}
            onPress={() => onUpdateAction()}
          >
            <FeatherIcon color="white" name="edit-2" size={20} />
          </TouchableOpacity>

          <TextRow
            label={"Дата проведення:"}
            value={tournamentDetails?.startDate ?? "-"}
            classes={'mb-2'}
            labelCols={8}
          />
          <TextRow
            label={"Час проведення:"}
            value={tournamentDetails?.startTime ?? "-"}
            classes={'mb-2'}
            labelCols={8}
          />
          <TextRow
            label={"Локації:"}
            value={tournamentDetails?.locations ?? "-"}
            classes={'mb-2'}
            labelCols={8}
          />
          <TextRow
            label={"Максимальна кількість учасників:"}
            value={tournamentDetails?.maxParticipantNumber ?? "-"}
            classes={'mb-2'}
            labelCols={8}
          />
          <TextRow
            label={"Опис:"}
            value={tournamentDetails?.description ?? "-"}
            classes={'mb-2'}
            labelCols={12}
          />
          <TextRow
            label={"Умови участі:"}
            value={tournamentDetails?.startConditions ?? "-"}
            classes={'mb-2'}
            labelCols={12}
          />
        </View>
      </ScrollView>
      <ConfirmationDialog
        visible={showConfirmDialog}
        message={cofirmText}
        onCancel={cofirmCancelAction}
        onConfirm={cofirmSubmitAction}
      />
    </SafeAreaView>
  );
}
