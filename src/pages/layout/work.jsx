import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  LINKS,
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import AppImage from "../../components/Image";

const LayoutWork = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);
  const [isEditContantIndex, setEditContantIndex] = useState(null);
  const [editContantItemImage, setEditContantItemImage] = useState("");

  const contentElements = ["image", "link", "description", "title"];

  useEffect(() => {
    if (data) {
      setFormElementValue("name", data.name);
      setFormElementValue("heading", data.content.heading);
      setList(data.content.list);
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
        list: list
      });
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const editContentItemStart = (index, value) => {
    const item = { ...list[index] };
    setEditContantIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      setEditContantItemImage(item.image);
      form.elements["image"].value = item.image;
      form.elements["title"].value = item.title;
      form.elements["link"].value = item.link;
      form.elements["description"].value = item.description;
    });
  };

  const editContentItemEnd = (index) => {
    const listItem = { ...list[index] };
    setTimeout(() => {
      const item = getFormElementsValue(contentElements);
      const newContent = [...list];
      newContent[index] = {
        ...listItem,
        ...item
      };
      setList(newContent);
      setEditContantIndex(null);
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <AppFormControl name="heading" label="Heading" />
      {list.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Work - {item.title}</p>
                {isEditContantIndex !== index ? (
                  <Badge
                    bg="warning"
                    className="cursor-pointer"
                    onClick={() => editContentItemStart(index)}
                  >
                    Edit
                  </Badge>
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
              <hr />
              {isEditContantIndex === index ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl name="title" label="title" />
                    </div>
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={LINKS}
                        name="link"
                        label="Link"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <AppImage path={editContantItemImage} />
                    </div>
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={imageList}
                        onChange={(e) => {
                          setEditContantItemImage(e.target.value);
                          setFormElementValue("image", e.target.value);
                        }}
                        name="image"
                        label="Image"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="textarea"
                        name="description"
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
                        <strong>Title</strong>
                        <br />
                        {item.title}
                      </p>
                    </div>
                    <div className="col">
                      <p className="m-0">
                        <strong>Link</strong>
                        <br />
                        {item.link}
                      </p>
                    </div>
                    <div className="col">
                      <AppImage path={item.image} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <p className="m-0">
                        <strong>Description</strong>
                        <br />
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {isEdit && <AppButton.Delete click={() => events("delete", true)} />}
    </Form>
  );
};

export default LayoutWork;
