/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  STYELS,
  SWITCH,
  getFormElementsValue,
  getStringifyObject,
  setEmptyFormElementsValue,
  setFormElementValue
} from "../../utilities";
import { Card, Form } from "react-bootstrap";
import { AppButton, AppImage, AppFormControl } from "../../components";
import AppEditSectionButtonGroup from "./EditSectionButtonGroup";

export const LayoutServiceDetail = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState(null);
  const [isEditContantIndex, setEditContantIndex] = useState(null);
  const contentElements = ["info", "style"];

  useEffect(() => {
    if (data) {
      setDescription(data.content.description);
      setFormElementValue("name", data.name);
      setFormElementValue("image", data.content.image);
      setImage(data.content.image);
      setFormElementValue("title", data.content.title);
      setFormElementValue("isTheme", data.content.isTheme);
      setFormElementValue("isImageLeft", data.content.isImageLeft);
    }
  }, [data]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, image, title, isTheme, isImageLeft } = form.elements;
      const payload = getStringifyObject(name.value, {
        image: image.value,
        title: title.value,
        isTheme: JSON.parse(isTheme.value),
        isImageLeft: JSON.parse(isImageLeft.value),
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

  const editSectionEventHandler = (type, index) => {
    switch (type) {
      case "edit-start":
        editContentItemStart(index);
        break;
      case "edit-end":
        editContentItemEnd(index);
        break;
      case "delete":
        deleteContentItem(index);
        break;
      default:
        setEditContantIndex(null);
        break;
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <AppFormControl name="title" label="Title" />
      <div className="row">
        <div className="col">
          <AppFormControl
            name="isTheme"
            type="select"
            options={SWITCH}
            label="Theme Apply"
          />
        </div>
        <div className="col">
          <AppFormControl
            name="isImageLeft"
            type="select"
            options={SWITCH}
            label="Image Left"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <AppImage path={image} />
        </div>
        <div className="col">
          <AppFormControl
            type="select"
            options={imageList}
            onChange={(e) => setImage(e.target.value)}
            name="image"
            label="Image"
          />
        </div>
      </div>
      {description.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Description</p>
                <AppEditSectionButtonGroup
                  condition={isEditContantIndex !== index}
                  eventHandler={(type) => editSectionEventHandler(type, index)}
                />
              </div>
              {isEditContantIndex === index ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="textarea"
                        name="edit-info"
                        label="Information"
                      />
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
                type="textarea"
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
      <AppButton.Delete click={() => events("delete", true)} />
    </Form>
  );
};
