import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import avatar from "../../assets/fisherman.png";
import { ConfirmationDialog } from "../shared/components";

import { getAuthTestData } from "../services/authService";
import { BaseButton } from "../shared/components";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "../context/GlobalContext";
import { accountService } from "../services/accountService";

export default function Settings({navigation}) {
  const { logout } = useAuth();

  const profile = `
  p-6
  flex
  flex-col
  items-center
  justify-center
`;

  const profileAvatarWrapper = `
  relative
`;

  const profileAvatar = `
  w-24
  h-24
  rounded-full
  bg-gray-300
`;

  const profileAction = `
  absolute
  right-0
  bottom-0
  flex
  items-center
  justify-center
  w-7
  h-7
  rounded-full
  bg-sky-400
`;

  const profileName = `
  mt-5
  text-lg
  font-semibold
  text-gray-700
  text-center
`;

  const profileAddress = `
  mt-1
  text-base
  text-gray-500
  text-center
`;

  const { userInfo, setUserInfo } = useGlobalContext();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cofirmText, setCofirmText] = useState(null);
  const [cofirmCancelAction, setCofirmCancelAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });
  const [cofirmSubmitAction, setCofirmSubmitAction] = useState(() => () => {
    setShowConfirmDialog(false);
  });

  useEffect(() => {
    const sendAuthRequest = async () => {
      const response = await getAuthTestData();
      console.info("Response: ", response);
      const accountInfo = await accountService.getUserInfo();
      setUserInfo(accountInfo)
    };

    sendAuthRequest();
  }, []);

  const onLogoutAction = () => {
    setCofirmText("Ви впевнені, що хочете вийти з облікового запису ?");
    setCofirmCancelAction(() => () => {
      setShowConfirmDialog(false);
    });
    setCofirmSubmitAction(() => () => {
      logout();
      setShowConfirmDialog(false);
    });
    setShowConfirmDialog(true);
  };

  return (
    <SafeAreaView className="flex-1 pt-6">
      <View className={profile}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <View className={profileAvatarWrapper}>
            <Image alt="" source={avatar} className={profileAvatar} />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SettingsUserInfo");
              }}
            >
              <View className={profileAction}>
                <FeatherIcon color="white" name="edit-2" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View>
          <Text className={profileName}>{userInfo?.fullName??"-"}</Text>

          <Text className={profileAddress}>
            {userInfo?.email??"-"}
          </Text>
        </View>
      </View>
      <View className="flex-1 justify-center p-4">
        <BaseButton label={"Вийти з акаунта"} onPress={onLogoutAction} />
      </View>
      <ConfirmationDialog
        visible={showConfirmDialog}
        message={cofirmText}
        onCancel={cofirmCancelAction}
        onConfirm={cofirmSubmitAction}
      />
    </SafeAreaView>
  );
}
