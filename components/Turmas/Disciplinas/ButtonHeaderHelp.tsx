import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PropsStyleButtons {
  titulo: string;
  bg: string;
  icon: any;
}

const ButtonHeaderHelp: React.FC<PropsStyleButtons> = ({
  titulo,
  bg,
  icon,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row w-44 rounded-lg m-1 h-12 items-center pl-2  `}
      style={{ backgroundColor: `${bg}` }}
    >
      <MaterialCommunityIcons name={`${icon}`} size={24} color="black" />
      <Text className="pl-3 w-32 font-medium">{titulo}</Text>
    </TouchableOpacity>
  );
};

export default ButtonHeaderHelp;
