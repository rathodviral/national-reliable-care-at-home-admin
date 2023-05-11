import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import { getStringifyObject, setFormElementValue } from "../../utilities";
import { Form } from "react-bootstrap";
import AppButton from "../../components/Button";

const LayoutPresentation = ({ isEdit, data, events }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (content) {
      setFormElementValue("name", data.name);
      setFormElementValue("description", content.description);
      setFormElementValue("heading1", content.heading[0]);
      setFormElementValue("heading2", content.heading[1]);
      setFormElementValue("heading3", content.heading[2]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, description, heading1, heading2, heading3 } = form.elements;
      const newContent = {
        description: description.value,
        heading: [heading1.value, heading2.value, heading3.value]
      };
      const payload = getStringifyObject(name.value, newContent);
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <AppFormControl type="textarea" name="description" label="Description" />
      <AppFormControl name="heading1" label="Heading Part 1" />
      <AppFormControl name="heading2" label="Heading Part 2" />
      <AppFormControl name="heading3" label="Heading Part 3" />
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      <AppButton.Delete click={() => events("delete", true)} />
    </Form>
  );
};

export default LayoutPresentation;
