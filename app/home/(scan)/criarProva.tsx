import React from "react";
import CriarProvaScreen from "@/screens/scan/CriarProvaScreen";
import AuthContext from "@/app/AuthContext";

const criarProva = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return <CriarProvaScreen idProf={userGlobalData.id} />;
};

export default criarProva;
