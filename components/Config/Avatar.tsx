import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
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
  userId: string;
}
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const Avatar: React.FC<AvatarProps> = ({ avatarNumber, userId }) => {
  const [selectedAvatar, setSelectedAvatar] = React.useState(avatarNumber);
  const [modalVisible, setModalVisible] = React.useState(false);

  const SelectedAvatar = avatars[selectedAvatar];
  const handleAvatarPress = async (number: number) => {
    setSelectedAvatar(number);
    setModalVisible(false);
    const response = await fetch(`${API_URL}/professores/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nIcone: number,
      }),
    });

    if (!response.ok) {
      console.log("Erro em trocar de ícone");
      throw new Error("Erro ao alterar ícone");
    } else {
      console.log("Troca de ícone realizada");
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.avatarContainer}>
          <SelectedAvatar width={120} height={120} />
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="font-bold text-xl mb-3">Escolha seu avatar</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {Object.keys(avatars).map((key) => {
                const AvatarComponent = avatars[key];
                const isSelected = parseInt(key) === selectedAvatar;
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleAvatarPress(parseInt(key))}
                    style={[
                      styles.avatarOption,
                      isSelected && styles.selectedAvatarOption,
                    ]}
                  >
                    <AvatarComponent width={80} height={80} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatarOption: {
    margin: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedAvatarOption: {
    borderColor: "blue",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 7,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Avatar;
