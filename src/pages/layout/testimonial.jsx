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

const LayoutTestimonial = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState([]);
  const [isEditContantIndex, setEditContantIndex] = useState(null);
  const [editContantItemImage, setEditContantItemImage] = useState("");

  const contentElements = ["from", "image", "description"];

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setFormElementValue("name", data.name);
      setEditContantItemImage(imageList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setEditContantIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      setEditContantItemImage(item.image);
      form.elements["edit-image"].value = item.image;
      form.elements["edit-from"].value = item.from;
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
      {content.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Testimonial - {index + 1}</p>
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
                    <div className="col-3">
                      <AppImage path={editContantItemImage} />
                    </div>
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={imageList}
                        onChange={(e) => {
                          setEditContantItemImage(e.target.value);
                          setFormElementValue("edit-image", e.target.value);
                        }}
                        name="edit-image"
                        label="Icon"
                      />
                    </div>
                    <div className="col">
                      <AppFormControl name="edit-from" label="From" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        name="edit-description"
                        label="Description"
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col-3">
                      <AppImage path={item.image} />
                    </div>
                    <div className="col">
                      <p className="m-0">
                        <strong>from</strong>
                        <br />
                        {item.from}
                      </p>
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
      <Card className="w-100 mb-3">
        <Card.Body className="pb-0">
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
                isRequired={false}
                name="image"
                label="Image"
              />
            </div>
            <div className="col">
              <AppFormControl isRequired={false} name="from" label="From" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AppFormControl
                name="description"
                label="Description"
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

export default LayoutTestimonial;
