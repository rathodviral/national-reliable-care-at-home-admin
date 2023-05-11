import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  ICONS,
  LINKS,
  SWITCH,
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import AppImage from "../../components/Image";

const LayoutService = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState([]);
  const [isIconShow, setIconShow] = useState(true);

  const [isEditContantIndex, setEditContantIndex] = useState(null);
  const [editContantItemImage, setEditContantItemImage] = useState("");

  const contentElements = [
    "buttonLink",
    "buttonText",
    "description",
    "icon",
    "title"
  ];

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setFormElementValue("name", data.name);
    }
  }, [data]);

  useEffect(() => {
    if (content.length > 0) {
      const isImg = content.every(
        (item) => item.icon.includes(".jp") || item.icon.includes(".pn")
      );
      setIconShow(!isImg);
      setFormElementValue("showIcon", !isImg);
    }
  }, [content]);

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

  const editContentItemStart = (index, value) => {
    const item = { ...content[index] };
    setEditContantIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      if (!isIconShow) {
        setEditContantItemImage(item.icon);
      }
      form.elements["icon"].value = item.icon;
      form.elements["title"].value = item.title;
      form.elements["buttonLink"].value = item.buttonLink;
      form.elements["buttonText"].value = item.buttonText;
      form.elements["description"].value = item.description;
    });
  };

  const editContentItemEnd = (index) => {
    const contentItem = { ...content[index] };
    setTimeout(() => {
      const item = getFormElementsValue(contentElements);
      const newContent = [...content];
      newContent[index] = {
        ...contentItem,
        ...item
      };
      setContent(newContent);
      setEditContantIndex(null);
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <AppFormControl
        type="select"
        options={SWITCH}
        label="Show icon"
        name="showIcon"
        onChange={(e) => setIconShow(JSON.parse(e.target.value))}
      />
      {content.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Content - {item.title}</p>
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
                    {!isIconShow && (
                      <div className="col-3">
                        <AppImage path={editContantItemImage} />
                      </div>
                    )}
                    <div className="col">
                      {isIconShow ? (
                        <AppFormControl
                          type="select"
                          options={ICONS}
                          name="icon"
                          label="Icon"
                        />
                      ) : (
                        <AppFormControl
                          type="select"
                          options={imageList}
                          onChange={(e) => {
                            setEditContantItemImage(e.target.value);
                            setFormElementValue("icon", e.target.value);
                          }}
                          name="icon"
                          label="Image"
                        />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={LINKS}
                        name="buttonLink"
                        label="Button Link"
                      />
                    </div>
                    <div className="col">
                      <AppFormControl name="buttonText" label="Button Text" />
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
                        <strong>Button Text</strong>
                        <br />
                        {item.buttonText}
                      </p>
                    </div>
                    <div className="col">
                      <p className="m-0">
                        <strong>Button Link</strong>
                        <br />
                        {item.buttonLink}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-4">
                      {isIconShow ? (
                        <p className="m-0">
                          <strong>Information</strong>
                          <br />
                          {item.icon}
                        </p>
                      ) : (
                        <AppImage path={item.icon} />
                      )}
                    </div>
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

export default LayoutService;
