import React, { useEffect, useState } from "react";
import { AppFormControl, AppButton } from "../../components";
import {
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";

const LayoutAbout = ({ isEdit, data, events }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState([]);
  const [isEditContantIndex, setEditContantIndex] = useState(null);
  const contentElements = ["title", "description"];

  useEffect(() => {
    if (data) {
      setContent(data.content.list);
      setFormElementValue("name", data.name);
      setFormElementValue("heading", data.content.heading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, heading } = form.elements;
      const payload = getStringifyObject(name.value, {
        heading: heading.value,
        list: content
      });
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
    setEditContantIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-title"].value = item.title;
      form.elements["edit-description"].value = item.description;
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
    const newContent = [...content];
    newContent.push(item);
    setContent(newContent);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <AppFormControl name="heading" label="Heading" />
      {content.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Content - {item.title}</p>
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
                      <AppFormControl name="edit-title" label="Link" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="textarea"
                        name="edit-description"
                        label="Description"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col">
                      <p className="m-0">
                        <strong>Title</strong> - {item.title}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="m-0">{item.description}</p>
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
              <AppFormControl name="title" label="Title" isRequired={false} />
            </div>
            <div className="col">
              <AppFormControl
                isRequired={false}
                type="textarea"
                name="description"
                label="Description"
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

export default LayoutAbout;
