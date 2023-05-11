import AppApiFetch from "./api";
import { APP_LAYOUT_SERVICE } from "./constant";

export const getLayouts = async () => {
  const options = {
    method: "GET"
  };
  const response = await AppApiFetch(APP_LAYOUT_SERVICE.list, options);
  const { status, data } = await response.json();
  return status ? data : [];
};

export const addEditLayout = async (isEdit, data) => {
  const options = {
    method: isEdit ? "PUT" : "POST",
    body: data,
    queryParams: isEdit ? { id: data.id } : undefined
  };
  const path = isEdit ? APP_LAYOUT_SERVICE.edit : APP_LAYOUT_SERVICE.add;
  const response = await AppApiFetch(path, options);
  const json = await response.json();
  return json;
};

export const deleteLayout = async (id) => {
  const options = {
    method: "DELETE",
    queryParams: { id: id }
  };
  const response = await AppApiFetch(APP_LAYOUT_SERVICE.delete, options);
  const json = await response.json();
  return json;
};

export const uploadImage = async (formData) => {
  const options = {
    method: "POST",
    body: formData,
    setContentType: false,
    isTypeJson: false
  };
  const response = await AppApiFetch(APP_LAYOUT_SERVICE.uploadImage, options);
  const json = await response.json();
  return json;
};

export const readImagesFromDirectory = async (formData) => {
  const options = {
    method: "GET"
  };
  const response = await AppApiFetch(APP_LAYOUT_SERVICE.readImage, options);
  const { status, list } = await response.json();
  return status ? list : [];
};
