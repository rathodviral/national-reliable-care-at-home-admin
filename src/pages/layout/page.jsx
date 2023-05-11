/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import AppFormControl from "../../components/FormControl";
import {
  CLASSNAMES,
  PAGE_TYPES,
  SECTION_TYPES,
  SWITCH,
  getStringifyObject,
  setFormElementValue
} from "../../utilities";
import { Card, Form } from "react-bootstrap";
import AppButton from "../../components/Button";
import { AppContext } from "../../AppContext";
import AppEditSectionButtonGroup from "./EditSectionButtonGroup";

const LayoutPage = ({ isEdit, data, events }) => {
  const { layoutList: list } = useContext(AppContext);
  const layoutPageList = list
    .filter((item) => item.type === "page")
    .map((item) => item.content.page);
  const layoutList = list
    .filter((item) => item.type !== "page")
    .map((item) => ({
      name: item.name,
      type: item.type,
      value: item.id
    }));
  const [validated, setValidated] = useState(false);
  const [section, setSection] = useState([]);
  const [pageSubList, setPageSubList] = useState([]);
  const [sectionEditPageSubList, setSectionEditPageSubList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [sectionEditIndex, setSectionEditIndex] = useState(null);

  useEffect(() => {
    if (data) {
      setSection(data.content.section);
      setFormElementValue("name", data.name);
      setFormElementValue("title", data.content.title);
      setFormElementValue("page", data.content.page);
    }
  }, [data]);

  useEffect(() => {
    if (layoutList && layoutList.length > 0) {
      createSubList(SECTION_TYPES[0]);
      const nPageList = [];
      PAGE_TYPES.forEach((page) => {
        if (!layoutPageList.some((item) => item === page)) {
          nPageList.push(page);
          setPageList(nPageList);
        }
      });
    }
  }, [list]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { name, title, page } = form.elements;
      const payload = getStringifyObject(name.value, {
        title: title.value,
        page: page.value,
        section: section
      });
      events("edit", payload);
    } else {
      setValidated(true);
    }
  };

  const deleteSectionItem = (index) => {
    const newSection = [...section];
    if (newSection.length > 0) {
      newSection.splice(index, 1);
      setSection(newSection);
    }
  };

  const addSectionItem = () => {
    const {
      elements: {
        type: { value: type },
        isShow: { value: isShow },
        className: { value: className }
      }
    } = document.querySelector("form");
    const newSection = [...section];
    const typeObj = layoutList.find((item) => item.value === type);
    newSection.push({
      type: typeObj.type,
      id: typeObj.value,
      isShow,
      className
    });
    setSection(newSection);
  };

  const createSubList = (value, isSecEdit = false) => {
    const subList = layoutList.filter((sub) => sub.type === value);
    isSecEdit ? setSectionEditPageSubList(subList) : setPageSubList(subList);
  };

  const editSectionItemStart = (index) => {
    const item = { ...section[index] };
    setSectionEditIndex(index);
    setTimeout(() => {
      const form = document.querySelector("form");
      form.elements["edit-pageSubList"].value = item.type;
      createSubList(item.type, true);
      form.elements["edit-type"].value = item.id;
      form.elements["edit-isShow"].value = item.isShow;
      form.elements["edit-className"].value = item.className;
    });
  };

  const editSectionItemEnd = (index) => {
    const item = { ...section[index] };
    const { elements } = document.querySelector("form");
    setTimeout(() => {
      const type = elements["edit-type"].value;
      const isShow = elements["edit-isShow"].value;
      const className = elements["edit-className"].value;
      const newSection = [...section];
      const typeObj = layoutList.find((item) => item.value === type);
      newSection[index] = {
        ...item,
        ...{ type: typeObj.type, id: typeObj.value, isShow, className }
      };
      setSection(newSection);
      setSectionEditIndex(null);
    });
  };

  const editSectionEventHandler = (type, index) => {
    switch (type) {
      case "edit-start":
        editSectionItemStart(index);
        break;
      case "edit-end":
        editSectionItemEnd(index);
        break;
      case "delete":
        deleteSectionItem(index);
        break;
      default:
        setSectionEditIndex(null);
        break;
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <AppFormControl name="name" label="Name" />
      <div className="row">
        <div className="col">
          <AppFormControl name="title" label="Title" />
        </div>
        <div className="col">
          <AppFormControl
            type="select"
            options={isEdit ? PAGE_TYPES : pageList}
            name="page"
            label="For Page"
            isDisabled={isEdit}
          />
        </div>
      </div>
      {section.map((item, index) => {
        return (
          <Card className="w-100 mb-3" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <p className="m-0">Section - {item.type}</p>
                <div>
                  <AppEditSectionButtonGroup
                    condition={sectionEditIndex !== index}
                    eventHandler={(type) =>
                      editSectionEventHandler(type, index)
                    }
                  />
                </div>
              </div>
              <hr />
              {sectionEditIndex === index ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={SECTION_TYPES}
                        name="edit-pageSubList"
                        label="Type"
                        onChange={(e) => createSubList(e.target.value, true)}
                      />
                    </div>
                    <div className="col">
                      {pageSubList && pageSubList.length > 0 && (
                        <AppFormControl
                          type="select"
                          options={sectionEditPageSubList}
                          name="edit-type"
                          label="Type"
                        />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={SWITCH}
                        name="edit-isShow"
                        label="Is Show"
                      />
                    </div>
                    <div className="col">
                      <AppFormControl
                        type="select"
                        options={CLASSNAMES}
                        name="edit-className"
                        label="Class"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col">
                    <p className="m-0">
                      <strong>Type</strong>
                      <br />
                      {item.type} - {item.id}
                    </p>
                  </div>
                  <div className="col">
                    <p className="m-0">
                      <strong>Show</strong>
                      <br />
                      {item.isShow ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="col">
                    <p className="m-0">
                      <strong>Class Name</strong>
                      <br />
                      {item.className || "No Class"}
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
                options={SECTION_TYPES}
                name="pageSubList"
                label="Type"
                onChange={(e) => createSubList(e.target.value)}
                isRequired={false}
              />
            </div>
            <div className="col">
              {pageSubList && pageSubList.length > 0 && (
                <AppFormControl
                  type="select"
                  options={pageSubList}
                  name="type"
                  label="Type"
                  isRequired={false}
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AppFormControl
                type="select"
                options={SWITCH}
                name="isShow"
                label="Is Show"
                isRequired={false}
              />
            </div>
            <div className="col">
              <AppFormControl
                type="select"
                options={CLASSNAMES}
                name="className"
                label="Class"
                isRequired={false}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppButton.Add click={() => addSectionItem()} />
      <hr />
      <AppButton label={isEdit ? "Edit" : "Add"} />
      {isEdit && <AppButton.Delete click={() => events("delete", true)} />}
    </Form>
  );
};

export default LayoutPage;
