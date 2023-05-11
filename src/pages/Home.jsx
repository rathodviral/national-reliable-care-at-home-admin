import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../AppContext";
import AppNavbar from "../components/Navbar";

const Home = () => {
  const history = useHistory();
  const { isAuthorize } = useContext(AppContext);
  useEffect(() => {
    const isAuth = isAuthorize();
    if (!isAuth) {
      history.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <AppNavbar />
      <div className="px-2">
        <Card className="w-100">
          <Card.Body>
            <Card.Title className="text-center">Home</Card.Title>
            <hr />
            <Card className="w-100">
              <Card.Body>
                {/* <h1 className="text-center">{layoutList.length}</h1>
                <hr /> */}
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => history.push("layout")}
                >
                  Layouts
                </Button>
              </Card.Body>
            </Card>
            <Card className="w-100 mt-3">
              <Card.Body>
                {/* <h1 className="text-center">{layoutList.length}</h1>
                <hr /> */}
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => history.push("page")}
                >
                  Pages
                </Button>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Home;
