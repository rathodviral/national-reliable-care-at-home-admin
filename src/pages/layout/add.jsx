import React, { useState, useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";
import AppModal from "../../components/Modal";
import { LAYOUT_TYPES, addEditLayout, deleteLayout } from "../../utilities";
import LayoutHeader from "./header";
import LayoutSlider from "./slider";
import LayoutPresentation from "./presentation";
import LayoutService from "./service";
import LayoutWork from "./work";
import LayoutTestimonial from "./testimonial";
import LayoutSocial from "./social";
import LayoutAbout from "./about";
import LayoutContact from "./contact";
import LayoutFooter from "./footer";
import { LayoutAction } from "./action";
import { LayoutServiceDetail } from "./service-detail";
import LayoutPageTitle from "./page-title";
import LayoutPage from "./page";

const AddLayout = ({ isEdit }) => {
  const { showAlertObj, layoutList, getLayoutListData, imageList } =
    useContext(AppContext);
  const { id } = useParams();
  const history = useHistory();

  const [layoutData, setLayoutData] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const data = layoutList.find((item) => item.id === id);
      if (!data) {
        history.replace("/layout");
        return;
      }
      setLayoutData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addlayoutClick = async (payload) => {
    const { status, message } = await addEditLayout(isEdit, {
      ...payload,
      type: layoutData.type,
      id
    });
    if (status) {
      getLayoutListData();
      if (isEdit) {
        history.replace(layoutData.type === "page" ? "/page" : "/layout");
      } else {
        // const form = document.querySelector("form");
        // form.reset();
        history.replace("/layout");
      }
    } else {
      showAlertObj(message, "danger");
    }
  };

  const deleteClick = async (reason) => {
    if (reason === "ok") {
      const { status, message } = await deleteLayout(id);
      if (status) {
        setDeleteModalShow(false);
        getLayoutListData();
        history.replace("/layout");
      } else {
        showAlertObj(message, "danger");
      }
    } else {
      setDeleteModalShow(false);
    }
  };

  const headerEvents = (type, params) => {
    if (type === "delete") {
      setDeleteModalShow(params);
    }
    if (type === "edit") {
      addlayoutClick(params);
    }
  };

  return (
    <React.Fragment>
      <Card className="w-100">
        <Card.Body>
          <Card.Title className="text-center">
            {isEdit ? "Edit" : "Add"}{" "}
            {layoutData && layoutData.type ? layoutData.name : "Layout"}
          </Card.Title>
          <hr />
          {(!layoutData || !layoutData.type) && (
            <div className="row">
              {LAYOUT_TYPES.map((type) => (
                <div
                  key={type.name}
                  className="col-3 d-flex justify-content-center px-1 my-1"
                >
                  <Button
                    className="w-100"
                    onClick={() => {
                      setLayoutData(type);
                    }}
                  >
                    {type.name}
                  </Button>
                </div>
              ))}
            </div>
          )}
          {layoutData && layoutData.type === "header" && (
            <LayoutHeader
              isEdit={isEdit}
              data={layoutData}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "slider" && (
            <LayoutSlider
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "presentation" && (
            <LayoutPresentation
              isEdit={isEdit}
              data={layoutData}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "page-title" && (
            <LayoutPageTitle
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "service" && (
            <LayoutService
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "work" && (
            <LayoutWork
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "testimonial" && (
            <LayoutTestimonial
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "social" && (
            <LayoutSocial
              isEdit={isEdit}
              data={layoutData}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "about" && (
            <LayoutAbout
              isEdit={isEdit}
              data={layoutData}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "contact" && (
            <LayoutContact
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "footer" && (
            <LayoutFooter
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "action" && (
            <LayoutAction
              isEdit={isEdit}
              data={layoutData}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "service-detail" && (
            <LayoutServiceDetail
              isEdit={isEdit}
              data={layoutData}
              imageList={imageList}
              events={headerEvents}
            />
          )}
          {layoutData && layoutData.type === "page" && (
            <LayoutPage
              isEdit={isEdit}
              data={layoutData}
              events={headerEvents}
            />
          )}
        </Card.Body>
      </Card>
      <AppModal
        title="Are you sure?"
        show={deleteModalShow}
        onHide={deleteClick}
      >
        <h5>After Click on Ok this will permenat delete</h5>
      </AppModal>
    </React.Fragment>
  );
};

export default AddLayout;
