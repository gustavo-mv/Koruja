import React from "react";
import AddCode from "@/screens/config/AddCode";
import AuthContext from "@/app/AuthContext";

const code = () => {
  const { token } = React.useContext(AuthContext);

  return <AddCode token={token} />;
};

export default code;
