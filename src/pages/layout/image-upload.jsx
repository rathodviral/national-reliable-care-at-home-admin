import React, { useContext } from "react";
import { Card, Form, ListGroup } from "react-bootstrap";
import { AppButton, AppImage } from "../../components";
import { AppContext } from "../../AppContext";
import { uploadImage } from "../../utilities";

const ImageUpload = () => {
  const { showAlertObj, getImageList, imageList } = useContext(AppContext);
  const uploadImageClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { image } = form.elements;
      if (image && image.files[0]) {
        const formData = new FormData();
        formData.append("image", image.files[0]);
        const imageResponse = await uploadImage({ formData });
        if (imageResponse.status) {
          getImageList();
          form.elements.image.value = "";
          form.reset();
          showAlertObj(`${imageResponse.imagePath} upload Succussfully`);
        } else {
          showAlertObj(imageResponse.message, "warning");
        }
      }
    }
  };
  return (
    <React.Fragment>
      <Card className="width-100P">
        <Card.Body>
          {/* <Card.Title className="text-center">Upload Image</Card.Title> */}
          {/* <hr /> */}
          <Form noValidate onSubmit={uploadImageClick}>
            <Form.Group controlId="image" className="mb-3">
              {/* <Form.Label>Upload Image</Form.Label> */}
              <Form.Control type="file" />
            </Form.Group>
            <AppButton label="Upload Image" />
          </Form>
        </Card.Body>
      </Card>
      <hr />
      <ListGroup>
        {imageList.length > 0 &&
          imageList.map((item, index) => (
            <ListGroup.Item key={item + index} as="li" action>
              <div className="row">
                <div className="col-3">
                  <AppImage path={item} />
                </div>
                <div className="col d-flex align-items-center">
                  <div className="fw-bold">{item}</div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        {imageList.length === 0 && (
          <ListGroup.Item as="li">
            <div className="fw-bold text-center">No Data Found</div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </React.Fragment>
  );
};

export default ImageUpload;
