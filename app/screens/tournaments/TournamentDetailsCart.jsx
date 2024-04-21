import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { tournamentsService } from "../../services";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ConfirmationDialog, TextRow } from "../../shared/components";
import { useToast } from "react-native-toast-notifications";
import { useGlobalContext } from "../../context/GlobalContext";

const TournamentDetailsCart = ({ tournamentDetails, navigation }) => {
  const toast = useToast();
  const { setTournaments } = useGlobalContext();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cofirmText, setCofirmText] = useState(null);
  const [cofirmCancelAction, setCofirmCancelAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const [cofirmSubmitAction, setCofirmSubmitAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const onDeleteAction = () => {
    setCofirmText(
      `Ви впевнені, що хочете видалити '${tournamentDetails?.name}'?`
    );
    setCofirmCancelAction(() => () => {
      setShowConfirmDialog(false);
    });
    setCofirmSubmitAction(() => async () => {
      const result = await tournamentsService.deleteTournament(
        tournamentDetails?.id
      );
      setShowConfirmDialog(false);
      if (result.success === false) {
        toast.show(result.message, {
          type: "danger",
        });
      } else {
        const tournaments = await tournamentsService.getMyTournaments();
        setTournaments(tournaments);
        navigation.navigate("TournamentList");
        toast.show("Турнір успішно видалено", {
          type: "success",
        });
      }
    });

    setShowConfirmDialog(true);
  };
  const onUpdateAction = () => {
    navigation.navigate("UpdateTournament", { tournament: tournamentDetails });
  };
  return (
    <ScrollView className='h-full'>
      <View className="flex bg-gray-500 mx-3 p-3 rounded-b-lg">
        <TouchableOpacity
          className="bg-gray-400"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 40,
            height: 40,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => onUpdateAction()}
        >
          <FeatherIcon color="white" name="edit-2" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-400"
          style={{
            position: "absolute",
            top: 55,
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

        <TextRow
          label={"Дата проведення:"}
          value={tournamentDetails?.startDate ?? "-"}
          classes={"mb-2 mt-4"}
          labelCols={8}
        />
        <TextRow
          label={"Час проведення:"}
          value={tournamentDetails?.startTime ?? "-"}
          classes={"mb-2"}
          labelCols={8}
        />
        <TextRow
          label={"Максимальна кількість учасників:"}
          value={tournamentDetails?.maxParticipantNumber ?? "-"}
          classes={"mb-2"}
          labelCols={8}
        />
        <TextRow
          label={"Локації:"}
          value={tournamentDetails?.locations ?? "-"}
          classes={"mb-2"}
          labelCols={8}
        />
        <TextRow
          label={"Опис:"}
          value={tournamentDetails?.description ?? "-"}
          classes={"mb-2"}
          labelCols={12}
        />
        <TextRow
          label={"Умови участі:"}
          value={tournamentDetails?.startConditions ?? "-"}
          classes={"mb-2"}
          labelCols={12}
        />

        <ConfirmationDialog
          visible={showConfirmDialog}
          message={cofirmText}
          onCancel={cofirmCancelAction}
          onConfirm={cofirmSubmitAction}
        />
      </View>
    </ScrollView>
  );
};

export default TournamentDetailsCart;
