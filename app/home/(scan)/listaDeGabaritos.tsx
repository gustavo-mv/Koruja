import React from "react";
import AuthContext from "@/app/AuthContext";
import ListaDeGabaritosScreen from "@/screens/scan/ListaDeGabaritosScreen";

const listaDeGabaritos = () => {
  const { userGlobalData, token } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  if (token) {
    return <ListaDeGabaritosScreen idProf={userGlobalData.id} token={token} />;
  } else {
    return null;
  }
};

export default listaDeGabaritos;
