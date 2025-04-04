import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { tournamentsService } from "../../services";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ConfirmationDialog, TextRow } from "../../shared/components";
import { useToast } from "react-native-toast-notifications";
import { useGlobalContext } from "../../context/GlobalContext";
import { getFormattedDate, getFormattedTime } from "../../shared";

const TournamentDetailsCart = ({ tournamentDetails, navigation }) => {
  const toast = useToast();
  const labelCols = 6;
  const { setTournaments, setTournamentDetails } = useGlobalContext();
  const ratingСriterions = [
    { label: "Вага", value: 0 },
    { label: "Довжина", value: 1 },
  ];

  const [loading, setLoading] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cofirmText, setCofirmText] = useState(null);
  const [cofirmCancelAction, setCofirmCancelAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const [cofirmSubmitAction, setCofirmSubmitAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const onDeleteAction = () => {
    setLoading(true);
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
        const tournaments = await tournamentsService.getMyTournaments({actual:true});
        setTournaments(tournaments);
        navigation.navigate("TournamentList");
        toast.show("Турнір успішно видалено", {
          type: "success",
        });
      }
      setLoading(false);
    });

    setShowConfirmDialog(true);
  };
  const onUpdateAction = () => {
    navigation.navigate("UpdateTournament", { tournament: tournamentDetails });
  };

  const onTogglePublishTournament = async () => {
    setLoading(true);
    const result = await tournamentsService.publishTournament(
      tournamentDetails.id
    );

    if (result.success === false) {
      toast.show(result.message, {
        type: "danger",
      });
      setLoading(false);
      return;
    } else {
      const updatedTournament = {
        ...tournamentDetails,
        isPublished: !tournamentDetails.isPublished,
      };
      setTournamentDetails(updatedTournament);
    }
    toast.show(tournamentDetails.isPublished ? "Турнір успішно приховано" : "Турнір успішно опубліковано", {
      type: "success",
    });
    setLoading(false);
  };

  return (
    <View className="flex bg-white p-3">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg">{"Турнір " + tournamentDetails.name}</Text>
        <View className="flex-row">
          <TouchableOpacity
            className="bg-red-400 p-2 rounded-full mr-2"
            onPress={onDeleteAction}
            disabled={loading}
          >
            <FeatherIcon color="white" name="trash-2" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-sky-400 p-2 rounded-full mr-2"
            onPress={onTogglePublishTournament}
            disabled={loading}
          >
            <FeatherIcon color="white" name={ tournamentDetails.isPublished ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-sky-400 p-2 rounded-full"
            onPress={onUpdateAction}
            disabled={loading}
          >
            <FeatherIcon color="white" name="edit-2" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TextRow
          label={"Опублікований:"}
          value={tournamentDetails?.isPublished ? "Так" : "Ні"}
          classes={"mb-2 mt-4"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Дата проведення:"}
          value={getFormattedDate(tournamentDetails?.startDate) ?? "-"}
          classes={"mb-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Час проведення:"}
          value={getFormattedTime(tournamentDetails?.startDate) ?? "-"}
          classes={"mb-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Максимальна кількість учасників:"}
          value={tournamentDetails?.maxParticipantNumber ?? "-"}
          classes={"mb-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Критерій оцінювання:"}
          value={
            ratingСriterions.find(
              (x) => x.value === tournamentDetails.ratingСriterion
            )?.label ?? "-"
          }
          classes={"mb-2"}
          labelCols={labelCols}
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
      </ScrollView>
    </View>
  );
};

export default TournamentDetailsCart;
