/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  ICONS,
  getFormElementsValue,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Badge, Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import AppImage from "../../components/Image";

const LayoutFooter = ({ isEdit, data, events, imageList: imgList }) => {
  const [validated, setValidated] = useState(false);
  const [content, setContent] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [blogList, setBlogList] = useState([]);

  const [isEditBlogIndex, setEditBlogIndex] = useState(null);
  const [isEditImageIndex, setEditImageIndex] = useState(null);
  const [editImageListItemImage, setEditImageListItemImage] = useState("");
  const [isEditAddressIndex, setEditAddressIndex] = useState(null);

  const imageListElements = ["link", "image"];

  useEffect(() => {
    if (data) {
      setContent(data.content);
      setFormElementValue("name", data.name);
      setEditImageListItemImage(imgList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (content.length > 0) {
      const [about, newest, album, contact] = content;
      setAddressList(contact.address);
      setBlogList(newest.blog);
      setImageList(album.images);
      setFormElementValue("aboutTitle", about.title);
      setFormElementValue("aboutLink", about.link);
      setFormElementValue("aboutInformation", about.information);
      setFormElementValue("newestTitle", newest.title);
      setFormElementValue("albumTitle", album.title);
      setFormElementValue("contactTitle", contact.title);
    }
  }, [content]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const {
        name,
        aboutTitle,
        aboutLink,
        aboutInformation,
        newestTitle,
        albumTitle,
        contactTitle
      } = form.elements;
      const payload = getStringifyObject(name.value, [
        {
          title: aboutTitle.value,
          information: aboutInformation.value,
          link: aboutLink.value
        },
        { title: newestTitle.value, blog: blogList },
        { title: albumTitle.value, images: imageList },
        { title: contactTitle.value, address: addressList }
      ]);
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteBlogItem = (index) => {
    const newList = [...blogList];
    if (newList.length > 1) {
      newList.splice(index, 1);
      setBlogList(newList);
    }
  };

  const editBlogItemStart = (index) => {
    const item = blogList[index];
    setEditBlogIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-blog"].value = item;
    });
  };

  const editBlogItemEnd = (index) => {
    setTimeout(() => {
      const form = document.querySelector("form");
      const item = form.elements["edit-blog"].value;
      const newBlogList = [...blogList];
      newBlogList[index] = item;
      setBlogList(newBlogList);
      setEditBlogIndex(null);
    });
  };

  const addBlogItem = () => {
    setValidated(false);
    const form = document.querySelector("form");
    const blog = form.elements["blog"].value;
    if (!blog) {
      setValidated(true);
      return;
    }
    const newList = [...blogList];
    newList.push(blog);
    form.elements["blog"].value = "";
    setBlogList(newList);
  };

  const deleteImageListItem = (index) => {
    const newList = [...imageList];
    if (newList.length > 1) {
      newList.splice(index, 1);
      setImageList(newList);
    }
  };

  const editImageListItemStart = (index) => {
    const item = { ...imageList[index] };
    setEditImageIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      setEditImageListItemImage(item.image);
      form.elements["edit-image"].value = item.image;
      form.elements["edit-link"].value = item.link;
    });
  };

  const editImageListItemEnd = (index) => {
    const imageListItem = { ...imageList[index] };
    setTimeout(() => {
      const item = getFormElementsValue(imageListElements, "edit");
      const newList = [...imageList];
      newList[index] = {
        ...imageListItem,
        ...item
      };
      setImageList(newList);
      setEditImageIndex(null);
    });
  };

  const addImageListItem = () => {
    setValidated(false);
    const item = getFormElementsValue(imageListElements);
    if (Object.keys(item).some((key) => !item[key])) {
      setValidated(true);
      return;
    }
    const newList = [...imageList];
    newList.push(item);
    setImageList(newList);
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
      form.elements["edit-icon"].value = item.icon;
      form.elements["edit-information"].value = item.information;
      if (item.email) {
        form.elements["edit-email"].value = item.email;
      }
    });
  };

  const editAddressItemEnd = (index) => {
    const addressItem = { ...addressList[index] };
    setTimeout(() => {
      const form = document.querySelector("form");
      const icon = form.elements["edit-icon"].value;
      const information = form.elements["edit-information"].value;
      let email;
      if (form.elements["edit-email"]) {
        email = form.elements["edit-email"].value;
      }
      const newList = [...addressList];
      newList[index] = { ...addressItem, icon, information, email };
      setAddressList(newList);
      setEditAddressIndex(null);
    });
  };

  const addAddressItem = () => {
    setValidated(false);
    const form = document.querySelector("form");
    const icon = form.elements["icon"].value;
    const information = form.elements["information"].value;
    let email;
    if (form.elements["email"]) {
      email = form.elements["email"].value;
    }
    if (!icon || !information) {
      setValidated(true);
      return;
    }
    const newList = [...addressList];
    newList.push({
      information,
      icon,
      email
    });
    form.elements["icon"].value = "";
    form.elements["information"].value = "";
    form.elements["email"].value = "";
    setAddressList(newList);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <Card className="w-100 mb-3">
        <Card.Body className="pb-0">
          <div className="d-flex justify-content-between">
            <p className="m-0">About</p>
          </div>
          <div className="row">
            <div className="col">
              <AppFormControl name="aboutTitle" label="Title" />
            </div>
            <div className="col">
              <AppFormControl name="aboutLink" label="Link" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AppFormControl
                type="textarea"
                name="aboutInformation"
                label="Infomation"
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppFormControl name="newestTitle" label="Newest Title" />
      {blogList.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <p className="m-0">Blogs</p>
                {isEditBlogIndex !== index ? (
                  <div>
                    <Badge
                      bg="warning"
                      className="me-1 cursor-pointer"
                      onClick={() => editBlogItemStart(index)}
                    >
                      Edit
                    </Badge>
                    <Badge
                      bg="danger"
                      className="cursor-pointer"
                      onClick={() => deleteBlogItem(index)}
                    >
                      Delete
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge
                      bg="primary"
                      className="me-1 cursor-pointer"
                      onClick={() => editBlogItemEnd(index)}
                    >
                      Save
                    </Badge>
                    <Badge
                      bg="secondary"
                      className="cursor-pointer"
                      onClick={() => setEditBlogIndex(null)}
                    >
                      Clear
                    </Badge>
                  </div>
                )}
              </div>
              <hr />
              {isEditBlogIndex === index ? (
                <div className="row">
                  <div className="col">
                    <AppFormControl
                      type="textarea"
                      name="edit-blog"
                      label="Blog"
                    />
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
                type="textarea"
                name="blog"
                label="Blog"
                isRequired={false}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppButton.Add label="Add Blog" click={() => addBlogItem()} />
      <hr />
      <AppFormControl name="albumTitle" label="Album Title" />
      {imageList.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Album</p>
                {isEditImageIndex !== index ? (
                  <div>
                    <Badge
                      bg="warning"
                      className="me-1 cursor-pointer"
                      onClick={() => editImageListItemStart(index)}
                    >
                      Edit
                    </Badge>
                    <Badge
                      bg="danger"
                      className="cursor-pointer"
                      onClick={() => deleteImageListItem(index)}
                    >
                      Delete
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge
                      bg="primary"
                      className="me-1 cursor-pointer"
                      onClick={() => editImageListItemEnd(index)}
                    >
                      Save
                    </Badge>
                    <Badge
                      bg="secondary"
                      className="cursor-pointer"
                      onClick={() => setEditImageIndex(null)}
                    >
                      Clear
                    </Badge>
                  </div>
                )}
                <hr />
              </div>
              {isEditImageIndex === index ? (
                <div className="row">
                  <div className="col-3">
                    <AppImage path={editImageListItemImage} />
                  </div>
                  <div className="col">
                    <AppFormControl
                      type="select"
                      options={imgList}
                      onChange={(e) => {
                        setEditImageListItemImage(e.target.value);
                        setFormElementValue("edit-image", e.target.value);
                      }}
                      name="edit-image"
                      label="Icon"
                    />
                  </div>
                  <div className="col">
                    <AppFormControl name="edit-link" label="Link" />
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-3">
                    <AppImage path={item.image} />
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
            <div className="col-3">
              <AppImage path={editImageListItemImage} />
            </div>
            <div className="col">
              <AppFormControl
                type="select"
                options={imgList}
                onChange={(e) => {
                  setEditImageListItemImage(e.target.value);
                  setFormElementValue("image", e.target.value);
                }}
                isRequired={false}
                name="image"
                label="Image"
              />
            </div>
            <div className="col">
              <AppFormControl isRequired={false} name="link" label="Link" />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppButton.Add label="Add Image" click={() => addImageListItem()} />
      <hr />
      <AppFormControl name="contactTitle" label="Contact Title" />
      {addressList.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
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
                <div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="select"
                        name="edit-icon"
                        label="Icon"
                        options={ICONS}
                      />
                    </div>
                    <div className="col">
                      {item.email && (
                        <AppFormControl
                          type="email"
                          name="edit-email"
                          label="Email"
                        />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="textarea"
                        name="edit-information"
                        label="Information"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col">
                      <p className="m-0">
                        <strong>Icon</strong>
                        <br />
                        {item.icon}
                      </p>
                    </div>
                    <div className="col">
                      {item.email && (
                        <p className="m-0">
                          <strong>Email</strong>
                          <br />
                          {item.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="m-0">{item.information}</p>
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
                type="select"
                options={ICONS}
                isRequired={false}
                name="icon"
                label="Icon"
              />
            </div>
            <div className="col">
              <AppFormControl
                isRequired={false}
                type="email"
                name="email"
                label="Email"
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
      <AppButton.Add label="Add Address" click={() => addAddressItem()} />
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {/* <AppButton.Delete label="Delete" click={() => events("delete", true)} /> */}
    </Form>
  );
};

export default LayoutFooter;
