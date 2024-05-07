import { View, ScrollView, Text, RefreshControl } from "react-native";
import React, { useState } from "react";
import {
  FloatingAddButton,
  MatchResultListItem,
  ConfirmationDialog
} from "../../shared/components";
import { useGlobalContext } from "../../context/GlobalContext";
import { matchResultsService } from "../../services";
import { useToast } from "react-native-toast-notifications";

export function MatchResults({ tournament, match, navigation }) {
  const toast = useToast();
  const { setMatchResults, matchResults } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await matchResultsService.getMatchResults(match.id);
    setMatchResults(result);
    setRefreshing(false);
  };

  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cofirmText, setCofirmText] = useState(null);
  const [cofirmCancelAction, setCofirmCancelAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const [cofirmSubmitAction, setCofirmSubmitAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });

  const onDelete = async (result) => {
    setCofirmText(
      `Ви впевнені, що хочете видалити результат для '${result?.player.fullName}'?`
    );
    setCofirmCancelAction(() => () => {
      setShowConfirmDialog(false);
    });
    setCofirmSubmitAction(() => async () => {
      setShowConfirmDialog(false);
      const response = await matchResultsService.deleteMatchResult(result?.id);
      if (response.success === false) {
        toast.show(response.message, {
          type: "danger",
        });
      } else {
        const results = await matchResultsService.getMatchResults(match.id);
        setMatchResults(results);
        toast.show("Результат успішно видалено", {
          type: "success",
        });
      }
    });

    setShowConfirmDialog(true);
  }
  return (
    <View className="flex-1 bg-white p-3">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {matchResults?.totalCount ? (
          matchResults.items.map((x) => (
            <MatchResultListItem
              result={x}
              tournamentRatingCriteria={tournament.ratingCriteria}
              onPress={onDelete}
              key={x.id}
            />
          ))
        ) : (
          <Text>{"Матч ще не має результатів"}</Text>
        )}
      </ScrollView>
      <FloatingAddButton
        onPress={() => {
          navigation.navigate("MatchResultAdd", { tournament, match });
        }}
      />
      <ConfirmationDialog
        visible={showConfirmDialog}
        message={cofirmText}
        onCancel={cofirmCancelAction}
        onConfirm={cofirmSubmitAction}
      />
    </View>
  );
}
