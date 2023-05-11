import React, { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { AppContext } from "../AppContext";

const AppAlert = () => {
  const { alertObj } = useContext(AppContext);
  return (
    alertObj.isShow && (
      <Alert className="alert-top" variant={alertObj.type}>
        {alertObj.text}
      </Alert>
    )
  );
};

export default AppAlert;
