/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  SOCIAL_ICONS,
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";

const LayoutSocial = ({ isEdit, data, events }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState([]);
  const [isEditContantIndex, setEditContantIndex] = useState(null);

  const contentElements = ["icon", "link"];

  useEffect(() => {
    if (data) {
      setContent(data.content.list);
      setFormElementValue("name", data.name);
      setFormElementValue("copyright1", data.content.copyright[0]);
      setFormElementValue("copyright2", data.content.copyright[1]);
      setFormElementValue("copyright3", data.content.copyright[2]);
    }
  }, [data]);

  useEffect(() => {
    if (content.length > 0) {
      // setContentList(formContentElements, content, "content", "link");
    }
  }, [content]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, copyright1, copyright2, copyright3 } = form.elements;
      const payload = getStringifyObject(name.value, {
        copyright: [copyright1.value, copyright2.value, copyright3.value],
        list: content
      });
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteContentItem = (index) => {
    const newContect = [...content];
    if (newContect.length > 1) {
      newContect.splice(index, 1);
      setContent(newContect);
    }
  };

  const editContentItemStart = (index) => {
    const item = { ...content[index] };
    setEditContantIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-icon"].value = item.icon;
      form.elements["edit-link"].value = item.link;
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
      <AppFormControl name="copyright1" label="Copyright Part 1" />
      <AppFormControl name="copyright2" label="Copyright Part 2" />
      <AppFormControl name="copyright3" label="Copyright Part 3" />
      {content.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Social Icon - {item.icon}</p>
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
                <div className="row">
                  <div className="col">
                    <AppFormControl
                      type="select"
                      options={SOCIAL_ICONS}
                      name="edit-icon"
                      label="Icon"
                    />
                  </div>
                  <div className="col">
                    <AppFormControl name="edit-link" label="From" />
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-4">
                    <p className="m-0">
                      <strong>Icon</strong>
                      <br />
                      {item.icon}
                    </p>
                  </div>
                  <div className="col">
                    <p className="m-0">
                      <strong>Link</strong>
                      <br />
                      {item.link}
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
            <div className="col">
              <AppFormControl
                type="select"
                options={SOCIAL_ICONS}
                isRequired={false}
                name="icon"
                label="Icon"
              />
            </div>
            <div className="col">
              <AppFormControl isRequired={false} name="link" label="Link" />
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

export default LayoutSocial;
