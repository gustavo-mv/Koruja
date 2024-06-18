import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const InfoCriarQuestoesScreen: React.FC<CriarProvaInfo> = (disciplina) => {
  const [questoes, setQuestoes] = React.useState<number | null>(null);
  const [alternativas, setAlternativas] = React.useState<number | null>(null);
  const [disabledNext, setDisabledNext] = React.useState<boolean>(true);

  React.useEffect(() => {
    setDisabledNext(questoes === null || alternativas === null);
  }, [questoes, alternativas]);

  const questoesOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const alternativasOptions = [
    { label: "A, B", value: 2 },
    { label: "A, B, C", value: 3 },
    { label: "A, B, C, D", value: 4 },
    { label: "A, B, C, D, E", value: 5 },
    { label: "A, B, C, D, E, F", value: 6 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{disciplina.nomeProva}</Text>
        <Text style={styles.subtitle}>{disciplina.assunto}</Text>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Questões:</Text>
            <Picker
              selectedValue={questoes}
              onValueChange={(itemValue) => setQuestoes(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione" value={null} />
              {questoesOptions.map((option) => (
                <Picker.Item
                  key={option}
                  label={option.toString()}
                  value={option}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Alternativas:</Text>
            <Picker
              selectedValue={alternativas}
              onValueChange={(itemValue) => setAlternativas(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione" value={null} />
              {alternativasOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Link
          asChild
          href={{
            pathname: "/home/(scan)/selecionarVariacoes",
            params: {
              turmaId: disciplina.turmaId,
              disciplinaNome: disciplina.disciplinaNome,
              disciplinaId: disciplina.disciplinaId,
              assunto: disciplina.assunto,
              nomeProva: disciplina.nomeProva,
              nQuestoes: questoes,
              nAlternativas: alternativas,
            },
          }}
        >
          <TouchableOpacity
            disabled={disabledNext}
            style={[styles.button, disabledNext && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: 200,
    textAlign: "center",
    backgroundColor: "#A5D6A7",
    fontSize: 24,
    borderRadius: 8,
    padding: 12,
    color: "black",
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    width: 200,
    textAlign: "center",
    color: "#BDBDBD",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 32,
  },
  pickerContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 28,
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  pickerLabel: {
    paddingRight: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  picker: {
    width: 180,
    backgroundColor: "white",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#66BB6A",
    width: 128,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InfoCriarQuestoesScreen;
