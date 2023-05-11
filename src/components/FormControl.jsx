import React from "react";
import { Form } from "react-bootstrap";

const AppFormControl = ({
  type = "text",
  name,
  label,
  options = [],
  onChange,
  isDisabled = false,
  isRequired = true
}) => {
  const hasOptionTypeObj =
    type === "select" && options.length > 0
      ? typeof options[0] !== "string"
      : false;
  const getFormControl = () => {
    switch (type) {
      case "select":
        return (
          <Form.Select
            onChange={onChange}
            required={isRequired}
            disabled={isDisabled}
          >
            {hasOptionTypeObj
              ? options.map((opt, index) => (
                  <option key={index} value={opt.value}>
                    {opt.name}
                  </option>
                ))
              : options.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
          </Form.Select>
        );
      case "textarea":
        return (
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={`Enter ${label}`}
            required={isRequired}
            disabled={isDisabled}
          />
        );
      default:
        return (
          <Form.Control
            type={type}
            placeholder={`Enter ${label}`}
            required={isRequired}
            disabled={isDisabled}
          />
        );
    }
  };
  return (
    <Form.Group className="mb-3" controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      {getFormControl()}
      <Form.Control.Feedback type="invalid">
        Please choose a {name}.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AppFormControl;
