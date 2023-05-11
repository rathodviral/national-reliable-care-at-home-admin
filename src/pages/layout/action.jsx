import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  LINKS,
  STYELS,
  getFormElementsValue,
  getStringifyObject,
  setEmptyFormElementsValue,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";

export const LayoutAction = ({ isEdit, data, events }) => {
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState([]);

  const [isEditContantIndex, setEditContantIndex] = useState(null);
  const contentElements = ["info", "style"];

  useEffect(() => {
    if (data) {
      setDescription(data.content.description);
      setFormElementValue("name", data.name);
      setFormElementValue("buttonLink", data.content.buttonLink);
      setFormElementValue("buttonText", data.content.buttonText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, buttonLink, buttonText } = form.elements;
      const payload = getStringifyObject(name.value, {
        buttonLink: buttonLink.value,
        buttonText: buttonText.value,
        description: description
      });
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteContentItem = (index) => {
    const newContent = [...description];
    if (newContent.length > 1) {
      newContent.splice(index, 1);
      setDescription(newContent);
    }
  };

  const editContentItemStart = (index) => {
    const item = { ...description[index] };
    setEditContantIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-info"].value = item.info;
      form.elements["edit-style"].value = item.style;
    });
  };

  const editContentItemEnd = (index) => {
    const contentItem = { ...description[index] };
    setTimeout(() => {
      const item = getFormElementsValue(contentElements, "edit");
      const newContent = [...description];
      newContent[index] = {
        ...contentItem,
        ...item
      };
      setDescription(newContent);
      setEditContantIndex(null);
    });
  };

  const addContentItem = () => {
    setValidated(false);
    const item = getFormElementsValue(contentElements);
    if (Object.keys(item).some((key) => !item[key])) {
      setValidated(true);
      return;
    }
    const newContent = [...description];
    newContent.push(item);
    setEmptyFormElementsValue(contentElements);
    setDescription(newContent);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <div className="row">
        <div className="col">
          <AppFormControl name="buttonText" label="Button Text" />
        </div>
        <div className="col">
          <AppFormControl
            name="buttonLink"
            type="select"
            options={LINKS}
            label="Button Link"
          />
        </div>
      </div>
      {description.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Description</p>
                {isEditContantIndex !== index ? (
                  <div>
                    <Badge
                      bg="warning"
                      className="me-1 cursor-pointer"
                      onClick={() => editContentItemStart(index)}
                    >
                      Edit
                    </Badge>
                    <Badge
                      bg="danger"
                      className="cursor-pointer"
                      onClick={() => deleteContentItem(index)}
                    >
                      Delete
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge
                      bg="primary"
                      className="me-1 cursor-pointer"
                      onClick={() => editContentItemEnd(index)}
                    >
                      Save
                    </Badge>
                    <Badge
                      bg="secondary"
                      className="cursor-pointer"
                      onClick={() => setEditContantIndex(null)}
                    >
                      Clear
                    </Badge>
                  </div>
                )}
              </div>
              {isEditContantIndex === index ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl name="edit-info" label="Information" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={STYELS}
                        name="edit-style"
                        label="Style"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col">
                      <p className="m-0">
                        <strong>Style - </strong>
                        {item.style}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <p className="m-0">{item.info}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}
      <Card className="w-100 mb-3">
        <Card.Body className="pb-0">
          <div className="row">
            <div className="col">
              <AppFormControl
                name="info"
                label="Information"
                isRequired={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AppFormControl
                type="select"
                options={STYELS}
                isRequired={false}
                name="style"
                label="Style"
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppButton.Add click={() => addContentItem()} />
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {isEdit && <AppButton.Delete click={() => events("delete", true)} />}
    </Form>
  );
};
