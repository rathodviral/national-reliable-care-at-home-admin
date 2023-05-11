import React from "react";
import { Card } from "react-bootstrap";

const AppCard = (props) => {
  return (
    <Card className="w-100" {...props}>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
};

AppCard.Title = (props) => {
  <AppCard {...props}>
    <Card.Title className="text-center">{props.title}</Card.Title>
    <hr />
    {props.children}
  </AppCard>;
};

export default AppCard;
