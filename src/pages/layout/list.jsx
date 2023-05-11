import React, { useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AppCard from "../../components/Card";

const LayoutList = ({ list, isPage }) => {
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <AppCard>
        <Button
          variant="primary"
          className="w-100"
          onClick={() => history.push("/layout/add")}
        >
          Add Layout Content
        </Button>
        {!isPage && (
          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={() => history.push("/layout/image")}
          >
            Add Image
          </Button>
        )}
      </AppCard>
      <hr />
      <ListGroup as="ol" numbered={list.length !== 0}>
        {list.length > 0 &&
          list.map((item, index) => (
            <ListGroup.Item
              key={item.name + index}
              as="li"
              className="d-flex justify-content-between align-items-start"
              action
              onClick={() => history.push(`/layout/edit/${item.id}`)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.name}</div>
                {item.type}
              </div>
              {/* <Badge bg="primary" pill>
                14
              </Badge> */}
            </ListGroup.Item>
          ))}
        {list.length === 0 && (
          <ListGroup.Item as="li">
            <div className="fw-bold text-center">No Data Found</div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </React.Fragment>
  );
};

export default LayoutList;
