import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { matchesService } from "../../services";
import {
  TextRow,
  ConfirmationDialog,
} from "../../shared/components";
import { useToast } from "react-native-toast-notifications";
import { useGlobalContext } from "../../context/GlobalContext";
import { getFormattedDate, getFormattedTime } from "../../shared";
import FeatherIcon from "react-native-vector-icons/Feather";

export function MatchDetailsCard({ match, tournament, navigation }) {
  const toast = useToast();
  const labelCols = 6;

  const markerData = { ...match };
  const { setMatches } = useGlobalContext();
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
      `Ви впевнені, що хочете видалити матч '${match?.locationName}'?`
    );
    setCofirmCancelAction(() => () => {
      setShowConfirmDialog(false);
    });
    setCofirmSubmitAction(() => async () => {
      const result = await matchesService.deleteMatch(match?.id);
      setShowConfirmDialog(false);
      if (result.success === false) {
        toast.show(result.message, {
          type: "danger",
        });
      } else {
        const matches = await matchesService.getMatches({
          tournamentId: tournament.id,
        });
        setMatches(matches);
        navigation.navigate("TournamentDetails", { id: tournament.id });
        toast.show("Турнір успішно видалено", {
          type: "success",
        });
      }
    });

    setShowConfirmDialog(true);
  };

  const onEditAction = () => {
    navigation.navigate("MatchCreate", { tournament: tournament, match });
  };
  return (
    <View className="flex-1 pt-3">
      <View className="flex-1 mt-6">
        <MapView
          showsUserLocation={true}
          initialRegion={markerData}
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={markerData} />
        </MapView>
      </View>
      <View className="flex-1 px-3">
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("TournamentList")}
          >
            <Text>Турніри / </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TournamentDetails", { id: tournament.id })
            }
          >
            <Text>{tournament.name} / </Text>
          </TouchableOpacity>
          <Text>Матчі / </Text>
          <Text>{match.locationName}</Text>
        </View>
        <View className="my-3 flex-row justify-between">
          <TouchableOpacity
            onPress={onDeleteAction}
            className="flex-row p-2 bg-red-500 rounded-lg items-center"
          >
            <Text className="text-white">Видалити</Text>
            <FeatherIcon color="white" name="trash-2" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onEditAction}
            className="flex-row p-2 bg-gray-200 rounded-lg items-center"
          >
            <Text className="">Редагувати</Text>
            <FeatherIcon color="black" name="edit-2" size={16} />
          </TouchableOpacity>
        </View>
        <TextRow
          label={"Назва локації:"}
          value={match?.locationName ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Адреса локації:"}
          value={match?.actualAddressName ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Дата проведення:"}
          value={getFormattedDate(match?.startDateTime) ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
        <TextRow
          label={"Час проведення:"}
          value={getFormattedTime(match?.startDateTime) ?? "-"}
          classes={"my-2"}
          labelCols={labelCols}
        />
      </View>
      <ConfirmationDialog
        visible={showConfirmDialog}
        message={cofirmText}
        onCancel={cofirmCancelAction}
        onConfirm={cofirmSubmitAction}
      />
    </View>
  );
}
