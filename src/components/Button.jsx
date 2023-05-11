import React from "react";
import { Button } from "react-bootstrap";

const AppButton = ({
  label,
  variant = "primary",
  type = "submit",
  className,
  click
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      className={`w-100 ${className ? className : ""}`}
      onClick={click}
    >
      {label}
    </Button>
  );
};

AppButton.Add = (props) => {
  return (
    <AppButton
      className="mt-2"
      variant="warning"
      label="Add Item"
      type="button"
      {...props}
    />
  );
};

AppButton.Delete = (props) => {
  return (
    <AppButton
      className="mt-2"
      variant="danger"
      label="Delete"
      type="button"
      {...props}
    />
  );
};

AppButton.Clear = (props) => {
  return (
    <AppButton
      className="mt-2"
      variant="secondary"
      label="Delete"
      type="button"
      {...props}
    />
  );
};

export default AppButton;
