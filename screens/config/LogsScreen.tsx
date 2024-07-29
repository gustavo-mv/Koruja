import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import AuthContext from "@/app/AuthContext"; // Certifique-se de ajustar o caminho conforme necessário

interface Log {
  id: number;
  action: string;
  description: string;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
}

const LogIcon: React.FC<{ action: string }> = ({ action }) => {
  switch (action) {
    case "CRIAR_PROVA":
      return <FontAwesome name="file" size={24} color="black" />;
    case "ATUALIZAR_PROVA":
      return <MaterialIcons name="update" size={24} color="black" />;
    case "REMOVER_PROVA":
      return <FontAwesome name="trash" size={24} color="black" />;
    case "CRIAR_ASSINATURA_MENSAL":
      return <FontAwesome name="credit-card" size={24} color="black" />;
    case "CADASTRAR_USUARIO_ASAAS":
      return <FontAwesome name="user-plus" size={24} color="black" />;
    /*
    case "ATUALIZAR_DISCIPLINA":
      return <Ionicons name="md-book" size={24} color="black" />;
    case "CRIAR_DISCIPLINA":
      return <Ionicons name="md-bookmark" size={24} color="black" />;
    case "CODIGO_RESGATADO":
      return <Ionicons name="md-gift" size={24} color="black" />;
    case "ATUALIZAR_TURMA":
      return <Ionicons name="md-people" size={24} color="black" />;
    case "REMOVER_TURMA":
      return <Ionicons name="md-person-remove" size={24} color="black" />;
    case "CRIAR_TURMA":
      return <Ionicons name="md-person-add" size={24} color="black" />;
    case "RESGATAR_ASSINATURA":
      return <FontAwesome name="ticket" size={24} color="black" />;
      */
    default:
      return <FontAwesome name="question" size={24} color="black" />;
  }
};

const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const LogsScreen: React.FC = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${API_URL}/logs-de-atividade`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLogs(data.logs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="p-3 bg-ciano">
      {logs.map((log) => (
        <View key={log.id} style={styles.card}>
          <View style={styles.iconContainer}>
            <LogIcon action={log.action} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{log.description}</Text>
            <Text style={styles.date}>{formatDate(log.createdAt)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LogsScreen;
