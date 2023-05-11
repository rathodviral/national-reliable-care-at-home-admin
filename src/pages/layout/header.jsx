import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  ICONS,
  LINKS,
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";

const LayoutHeader = ({ isEdit, data, events }) => {
  const [validated, setValidated] = useState(false);
  const [menu, setMenu] = useState([]);
  const [isMenuEditIndex, setMenuEditIndex] = useState(null);

  const menuKeyList = ["icon", "link", "label"];

  useEffect(() => {
    if (data) {
      setMenu(data.content.menu);
      setFormElementValue("name", data.name);
      setFormElementValue("title", data.content.title);
    }
  }, [data]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, title } = form.elements;
      const payload = getStringifyObject(name.value, {
        title: title.value,
        menu: menu
      });
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteMenuItem = (index) => {
    const dMenu = [...menu];
    if (dMenu.length > 1) {
      dMenu.splice(index, 1);
      setMenu(dMenu);
    }
  };

  const addMenuItem = () => {
    const dMenu = [...menu];
    setValidated(false);
    const item = getFormElementsValue(menuKeyList);
    if (Object.keys(item).some((key) => !item[key])) {
      setValidated(true);
      return;
    }
    dMenu.push(item);
    setMenu(dMenu);
  };

  const editMenuItemStart = (index) => {
    const item = { ...menu[index] };
    setMenuEditIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-icon"].value = item.icon;
      form.elements["edit-label"].value = item.label;
      form.elements["edit-link"].value = item.link;
    });
  };

  const editMenuItemEnd = (index) => {
    const menuItem = { ...menu[index] };
    setTimeout(() => {
      const item = getFormElementsValue(menuKeyList, "edit");
      const newMenu = [...menu];
      newMenu[index] = {
        ...menuItem,
        ...item
      };
      setMenu(newMenu);
      setMenuEditIndex(null);
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <AppFormControl name="title" label="Title" />
      {menu.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Menu - {item.label}</p>
                {isMenuEditIndex !== index ? (
                  <div>
                    <Badge
                      className="me-1"
                      bg="warning"
                      onClick={() => editMenuItemStart(index)}
                    >
                      Edit
                    </Badge>
                    <Badge bg="danger" onClick={() => deleteMenuItem(index)}>
                      Delete
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge
                      bg="primary"
                      className="me-1 cursor-pointer"
                      onClick={() => editMenuItemEnd(index)}
                    >
                      Save
                    </Badge>
                    <Badge
                      bg="secondary"
                      className="cursor-pointer"
                      onClick={() => setMenuEditIndex(null)}
                    >
                      Clear
                    </Badge>
                  </div>
                )}
              </div>
              <hr />
              {isMenuEditIndex === index ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={ICONS}
                        name="edit-icon"
                        label="Icon"
                      />
                    </div>
                    <div className="col">
                      <AppFormControl name="edit-label" label="Label" />
                    </div>
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={LINKS}
                        name="edit-link"
                        label="Link"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col">
                    <p className="m-0">
                      <strong>Icon</strong>
                      <br />
                      {item.icon}
                    </p>
                  </div>
                  <div className="col">
                    <p className="m-0">
                      <strong>Label</strong>
                      <br />
                      {item.label}
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
                options={ICONS}
                name="icon"
                label="Icon"
                isRequired={false}
              />
            </div>
            <div className="col">
              <AppFormControl name="label" label="Label" isRequired={false} />
            </div>
            <div className="col">
              <AppFormControl
                type="select"
                options={LINKS}
                name="link"
                label="Link"
                isRequired={false}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppButton.Add click={() => addMenuItem()} />
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {/* {isEdit && <AppButton.Delete click={() => events("delete", true)} />} */}
    </Form>
  );
};

export default LayoutHeader;
