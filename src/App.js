import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { Row, Container, Col } from "react-bootstrap";
import AppContextProvider from "./AppContext";
import AppAlert from "./components/Alert";
import Layout from "./pages/layout";
import Home from "./pages/Home";

function App() {
  return (
    <AppContextProvider>
      <Container>
        <Row>
          <Col></Col>
          <Col md={5} className="height-100vh">
            <AppAlert />
            <Switch>
              <Route path="/layout">
                <Layout />
              </Route>
              <Route path="/page">
                <Layout />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Login />
              </Route>
            </Switch>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </AppContextProvider>
  );
}

export default App;
