import React, { useContext, useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../AppContext";
import AppButton from "../components/Button";
import AppFormControl from "../components/FormControl";
import { AppStorage } from "../utilities";
import { APP_STORAGE } from "../utilities/constant";

const Login = () => {
  const history = useHistory();
  const { showAlertObj, isAuthorize } = useContext(AppContext);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isAuthorize()) {
      history.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const {
        username: { value: username },
        password: { value: password }
      } = form.elements;
      if (username === "admin" && password === "admin@123") {
        AppStorage.setItemInStorage(APP_STORAGE, { username, password });
        history.replace("/home");
      } else {
        showAlertObj("Log Failed", "danger");
      }
    } else {
      setValidated(true);
    }
  };
  return (
    <div className="flex-align-center px-2">
      <Card className="w-100">
        <Card.Body>
          <Card.Title>Login for Admin Access</Card.Title>
          <hr />
          <Form noValidate validated={validated} onSubmit={submitClick}>
            <AppFormControl name="username" label="Username" />
            <AppFormControl type="password" name="password" label="Password" />
            <hr />
            <AppButton label="Login" />
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
