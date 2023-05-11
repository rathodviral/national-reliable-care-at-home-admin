import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AppModal = (props) => {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => props.onHide("ok")}>
          Ok
        </Button>
        <Button onClick={() => props.onHide()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;
