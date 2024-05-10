import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";

import publicTournamentsBlack from "../../../assets/public-tournaments-black.png";
import publicTournamentsWhite from "../../../assets/public-tournaments-white.png";

import tournamentBlack from "../../../assets/tournaments-black.png";
import tournamentsWhite from "../../../assets/tournaments-white.png";

export default function NavigationButtons() {
  const [activePage, setActivePage] = useState("PublicTournamentTabs");
  const navigation = useNavigation();

  const handleNavigate = (screenName) => {
    setActivePage(screenName);
    navigation.navigate(screenName);
  };
  const buttonClasses = "p-2 rounded-full";
  const iconSize = 35;
  const getBgClass = (screenNameButton) => {
    return screenNameButton === activePage ? "bg-sky-400" : "";
  };
  return (
    <View className="flex-row bg-gray-300 px-6 py-3 justify-between">
      <TouchableOpacity
        className={`${buttonClasses} ml-6 ${getBgClass("TournamentList")}`}
        onPress={() => handleNavigate("TournamentList")}
      >
        <Image
          source={
            activePage === "TournamentList" ? tournamentsWhite : tournamentBlack
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </TouchableOpacity>
      <TouchableOpacity className={`${buttonClasses} ${getBgClass("PublicTournamentTabs")}`} onPress={() => handleNavigate("PublicTournamentTabs")}>
        <Image
          source={
            activePage === "PublicTournamentTabs" ? publicTournamentsWhite : publicTournamentsBlack
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className={`${buttonClasses} mr-6 ${getBgClass("Settings")}`}
        onPress={() => handleNavigate("Settings")}
      >
        <FeatherIcon color={activePage === "Settings" ? 'white' : 'black'} name="settings" size={iconSize} />
      </TouchableOpacity>
    </View>
  );
}
