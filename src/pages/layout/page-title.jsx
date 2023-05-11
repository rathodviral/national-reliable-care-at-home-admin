import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  ICONS,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import { AppImage } from "../../components";

const LayoutPageTitle = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState(null);
  const [editImage, setImage] = useState("");

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
      setFormElementValue("icon", content.icon);
      setFormElementValue("title", content.title);
      setFormElementValue("image", content.image || "pattern.jpg");
      setImage(content.image || "pattern.jpg");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, description, icon, title, image } = form.elements;
      const newContent = {
        description: description.value,
        icon: icon.value,
        title: title.value,
        image: image.value
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
      <AppFormControl name="title" label="Title" />
      <AppFormControl name="icon" label="Icon" type="select" options={ICONS} />
      <div className="row">
        <div className="col-3">
          <AppImage path={editImage} />
        </div>
        <div className="col">
          <AppFormControl
            type="select"
            options={imageList}
            onChange={(e) => setImage(e.target.value)}
            isRequired={false}
            name="image"
            label="Backgroung Image"
          />
        </div>
      </div>
      <AppFormControl type="textarea" name="description" label="Description" />

      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {isEdit && <AppButton.Delete click={() => events("delete", true)} />}
    </Form>
  );
};

export default LayoutPageTitle;
