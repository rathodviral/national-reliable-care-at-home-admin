import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  getContentList,
  getStringifyObject,
  lowerCase,
  setContentList,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import AppImage from "../../components/Image";

const LayoutContact = ({ isEdit, data, events, imageList }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [formControlList, setFormControlList] = useState([]);

  const [isEditAddressIndex, setEditAddressIndex] = useState(null);

  const formContentElements = ["label", "type", "name"];

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setAddressList(data.content.address.list);
      setFormControlList(data.content.formControl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (content) {
      const { title, map, description, address, buttonText } = content;
      setFormElementValue("name", data.name);
      setFormElementValue("title", title);
      setFormElementValue("mapTitle", map.title);
      setFormElementValue("mapImage", map.image);
      setImage(map.image);
      setFormElementValue("description", description);
      setFormElementValue("addressTitle", address.title);
      setFormElementValue("buttonText", buttonText);
      // addressList.forEach((item) => {
      //   setFormElementValue(`content-address-${lowerCase(item)}`, item);
      // });
      setContentList(formContentElements, formControlList, "content", "name");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const {
        name,
        title,
        mapTitle,
        mapImage,
        description,
        addressTitle,
        buttonText
      } = form.elements;

      const newFormControlList = getContentList(
        formContentElements,
        formControlList,
        "content",
        "name"
      );
      const payload = getStringifyObject(name.value, {
        title: title.value,
        map: {
          title: mapTitle.value,
          image: mapImage.value
        },
        description: description.value,
        buttonText: buttonText.value,
        address: {
          title: addressTitle.value,
          list: addressList
        },
        formControl: newFormControlList
      });
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteAddressItem = (index) => {
    const newList = [...addressList];
    if (newList.length > 1) {
      newList.splice(index, 1);
      setAddressList(newList);
    }
  };

  const editAddressItemStart = (index) => {
    const item = addressList[index];
    setEditAddressIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-address"].value = item;
    });
  };

  const editAddressItemEnd = (index) => {
    setTimeout(() => {
      const form = document.querySelector("form");
      const address = form.elements["edit-address"].value;
      const newList = [...addressList];
      newList[index] = address;
      setAddressList(newList);
      setEditAddressIndex(null);
    });
  };

  const addAddressItem = () => {
    setValidated(false);
    const form = document.querySelector("form");
    const address = form.elements["address"].value;
    if (!address) {
      setValidated(true);
      return;
    }
    const newList = [...addressList];
    newList.push(address);
    form.elements["address"].value = "";
    setAddressList(newList);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <div className="row">
        <div className="col">
          <AppFormControl name="title" label="Title" />
        </div>
        <div className="col">
          <AppFormControl name="buttonText" label="Button Text" />
        </div>
      </div>
      <AppFormControl type="textarea" name="description" label="Description" />
      <Card className="w-100 mb-3">
        <Card.Body className="pb-0">
          <div className="d-flex justify-content-between">
            <p className="m-0">Map</p>
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
                name="mapImage"
                label="Icon"
              />
            </div>
            <div className="col">
              <AppFormControl name="mapTitle" label="Title" />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppFormControl name="addressTitle" label="AddressTitle" />
      {addressList.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <p className="m-0">Address</p>
                {isEditAddressIndex !== index ? (
                  <div>
                    <Badge
                      bg="warning"
                      className="me-1 cursor-pointer"
                      onClick={() => editAddressItemStart(index)}
                    >
                      Edit
                    </Badge>
                    <Badge
                      bg="danger"
                      className="cursor-pointer"
                      onClick={() => deleteAddressItem(index)}
                    >
                      Delete
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge
                      bg="primary"
                      className="me-1 cursor-pointer"
                      onClick={() => editAddressItemEnd(index)}
                    >
                      Save
                    </Badge>
                    <Badge
                      bg="secondary"
                      className="cursor-pointer"
                      onClick={() => setEditAddressIndex(null)}
                    >
                      Clear
                    </Badge>
                  </div>
                )}
              </div>
              <hr />
              {isEditAddressIndex === index ? (
                <div className="row">
                  <div className="col">
                    <AppFormControl type="textarea" name="edit-address" />
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col">
                    <p className="m-0">{item}</p>
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
                name="address"
                label="Address"
                type="textarea"
                isRequired={false}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppButton.Add click={() => addAddressItem()} />
      <hr />
      {formControlList.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body className="pb-0">
              <div className="d-flex justify-content-between">
                <p className="m-0">Control - {item.name}</p>
              </div>
              <div className="row">
                <div className="col">
                  <AppFormControl
                    name={`content-label-${lowerCase(item.name)}`}
                    label="Label"
                  />
                </div>
                <div className="col">
                  <AppFormControl
                    name={`content-type-${lowerCase(item.name)}`}
                    label="Type"
                    isDisabled={true}
                  />
                </div>
                <div className="col">
                  <AppFormControl
                    name={`content-name-${lowerCase(item.name)}`}
                    label="Name"
                    isDisabled={true}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {/* <AppButton.Delete click={() => events("delete", true)} /> */}
    </Form>
  );
};

export default LayoutContact;
