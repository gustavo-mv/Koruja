import { View, Text } from "react-native";
import React from "react";
import AuthContext from "../../AuthContext";

const index = () => {
  interface User {
    id: string;
    nome: string;
    email: string;
  }

  const [dados, setDados] = React.useState<User | null>(null);
  const { token } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.attlasoft.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {});

  return (
    <View>
      <Text>Home {dados?.nome}</Text>
    </View>
  );
};

export default index;
