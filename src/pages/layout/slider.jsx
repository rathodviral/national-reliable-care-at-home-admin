/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import AppImage from "../../components/Image";

const LayoutSlider = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState([]);
  const [isContantEditIndex, setContantEditIndex] = useState(null);
  const [menuItemImage, setMenuItemImage] = useState("");
  const [editMenuItemImage, setEditMenuItemImage] = useState("");

  const contentElements = ["image", "information"];

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setFormElementValue("name", data.name);
      setMenuItemImage(imageList[0]);
    }
  }, [data]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name } = form.elements;
      const payload = getStringifyObject(name.value, content);
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteContentItem = (index) => {
    const newContent = [...content];
    if (newContent.length > 1) {
      newContent.splice(index, 1);
      setContent(newContent);
    }
  };

  const editContentItemStart = (index) => {
    const item = { ...content[index] };
    setContantEditIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      setEditMenuItemImage(item.image);
      form.elements["edit-image"].value = item.image;
      form.elements["edit-information"].value = item.information;
    });
  };

  const editContentItemEnd = (index, value) => {
    const contentItem = { ...content[index] };
    setTimeout(() => {
      const item = getFormElementsValue(contentElements, "edit");
      const newContent = [...content];
      newContent[index] = {
        ...contentItem,
        ...item
      };
      setContent(newContent);
      setContantEditIndex(null);
    });
  };

  const addContentItem = () => {
    const newContent = [...content];
    setValidated(false);
    const item = getFormElementsValue(contentElements);
    if (Object.keys(item).some((key) => !item[key])) {
      setValidated(true);
      return;
    }
    newContent.push(item);
    setContent(newContent);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      {content.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0 text-truncate w-50">
                  Content - {item.information}
                </p>
                {isContantEditIndex !== index ? (
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
                      onClick={() => setContantEditIndex(null)}
                    >
                      Clear
                    </Badge>
                  </div>
                )}
              </div>
              {isContantEditIndex === index ? (
                <div>
                  <div className="row">
                    <div className="col-3">
                      <AppImage path={editMenuItemImage} />
                    </div>
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={imageList}
                        onChange={(e) => {
                          setEditMenuItemImage(e.target.value);
                          setFormElementValue("edit-image", e.target.value);
                        }}
                        name="edit-image"
                        label="Icon"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        name="edit-information"
                        label="Information"
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-3">
                    <AppImage path={item.image} />
                  </div>
                  <div className="col">
                    <p className="m-0">
                      <strong>Information</strong>
                      <br />
                      {item.information}
                    </p>
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
            <div className="col-3">
              <AppImage path={menuItemImage} />
            </div>
            <div className="col">
              <AppFormControl
                type="select"
                options={imageList}
                onChange={(e) => setMenuItemImage(e.target.value)}
                isRequired={false}
                name="image"
                label="Icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AppFormControl
                name="information"
                label="Information"
                type="textarea"
                isRequired={false}
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

export default LayoutSlider;
