/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useHistory, useLocation } from "react-router-dom";
import { AppStorage, APP_STORAGE } from "../utilities";

const AppNavbar = () => {
  const history = useHistory();
  const location = useLocation();
  const [t, title] = location.pathname.split("/");
  const logoutClick = () => {
    AppStorage.removeItemFromStorage(APP_STORAGE);
    history.replace("/");
  };
  return (
    <Navbar bg="light" variant="light" className="mb-2">
      <Container>
        <Navbar.Text className="me-4">
          <a className="cursor-pointer" onClick={() => history.goBack()}>
            Back
          </a>
        </Navbar.Text>
        <Navbar.Brand
          className="text-capitalize cursor-pointer"
          onClick={() => history.push("/home")}
        >
          {title}
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className="text-capitalize" onClick={logoutClick}>
              Logout
            </a>
          </Navbar.Text>
        </Navbar.Collapse> */}
        <Navbar.Text>
          <a className="cursor-pointer" onClick={logoutClick}>
            Logout
          </a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
