import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/app/AuthContext";

// Importações das imagens PNG
import Avatar0 from "@/assets/avatars/avatar0.png";
import Avatar1 from "@/assets/avatars/avatar1.png";
import Avatar2 from "@/assets/avatars/avatar2.png";
import Avatar3 from "@/assets/avatars/avatar3.png";
import Avatar4 from "@/assets/avatars/avatar4.png";
import Avatar5 from "@/assets/avatars/avatar5.png";
import Avatar6 from "@/assets/avatars/avatar6.png";

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
  const { token } = useContext(AuthContext);

  const [selectedAvatar, setSelectedAvatar] = useState(avatarNumber);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAvatarPress = async (number: number) => {
    setSelectedAvatar(number);
    setModalVisible(false);
    const response = await fetch(`${API_URL}/professores/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  const SelectedAvatar = avatars[selectedAvatar];

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.avatarContainer}>
          {SelectedAvatar ? (
            <Image
              source={SelectedAvatar}
              style={{ width: 140, height: 140 }}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="font-bold text-white text-xl mb-3">
              Escolha seu avatar
            </Text>
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
                    <Image
                      source={AvatarComponent}
                      style={{ width: 95, height: 95 }}
                    />
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
    width: 142,
    height: 140,
    borderRadius: 40,
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
    backgroundColor: "#0b1c36",
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
    margin: 12,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedAvatarOption: {
    borderColor: "orange",
    borderWidth: 3,
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
    fontSize: 18,
  },
});

export default Avatar;
