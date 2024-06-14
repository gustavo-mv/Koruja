import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import Avatar0 from "@/assets/avatars/avatar0.svg";
import Avatar1 from "@/assets/avatars/avatar1.svg";
import Avatar2 from "@/assets/avatars/avatar2.svg";
import Avatar3 from "@/assets/avatars/avatar3.svg";
import Avatar4 from "@/assets/avatars/avatar4.svg";
import Avatar5 from "@/assets/avatars/avatar5.svg";
import Avatar6 from "@/assets/avatars/avatar6.svg";

const avatars: any = {
  0: Avatar0,
  1: Avatar1,
  2: Avatar2,
  3: Avatar3,
  4: Avatar4,
  5: Avatar5,
  6: Avatar6,
};

interface AvatarProps {
  avatarNumber: number;
}

const Avatar: React.FC<AvatarProps> = ({ avatarNumber }) => {
  const SelectedAvatar = avatars[avatarNumber];
  return (
    <View style={styles.avatarContainer}>
      <SelectedAvatar width={120} height={120} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 119,
    height: 122,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
  },
});

export default Avatar;
