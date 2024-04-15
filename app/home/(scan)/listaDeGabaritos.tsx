import React from "react";
import AuthContext from "@/app/AuthContext";
import ListaDeGabaritosScreen from "@/screens/scan/ListaDeGabaritosScreen";

const listaDeGabaritos = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return <ListaDeGabaritosScreen idProf={userGlobalData.id} />;
};

export default listaDeGabaritos;
