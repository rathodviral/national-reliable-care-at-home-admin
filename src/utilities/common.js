import moment from "moment";

export const removeSpaceFromString = (str) =>
  str.replace(/ +/g, "_").replace(/\s\s+/g, "").replace(/_/g, " ");

export const formatDate = (date = new Date(), format = "YYYY-MM-DD") =>
  moment(date).format(format);

export const lowerCase = (str) =>
  str.replace(/ +/g, "").replace(/\s\s+/g, "").toLowerCase();

export const getFormElementValue = (key) => {
  const form = document.querySelector("form");
  return form.elements[key] ? form.elements[key].value : false;
};

export const setFormElementValue = (key, value) => {
  const form = document.querySelector("form");
  form.elements[key].value =
    typeof value !== "string" ? JSON.stringify(value) : value;
};

export const getContentList = (elements, list, prefix, key) => {
  const contect = [];
  list.forEach((item) => {
    const nk = lowerCase(item[key]);
    let obj = {};
    elements.forEach((k) => {
      const formValue = getFormElementValue(`${prefix}-${k}-${nk}`);
      if (formValue) {
        obj[k] = formValue;
      }
    });
    contect.push({ ...item, ...obj });
  });
  return contect;
};

export const setContentList = (elements, list, prefix, key) => {
  list.forEach((item) => {
    const nk = lowerCase(item[key]);
    elements.forEach((k) =>
      item[k] ? setFormElementValue(`${prefix}-${k}-${nk}`, item[k]) : ""
    );
  });
};

export const getFormElementsValue = (keyList = [], prefix = "") => {
  const form = document.querySelector("form");
  const obj = {};
  keyList.forEach((key) => {
    obj[key] = form.elements[prefix ? `${prefix}-${key}` : key].value;
  });
  return obj;
};

// export const setFormElementsValue = (itemObject = {}, prefix = "") => {
//   const form = document.querySelector("form");
//   if (typeof itemObject === "object") {
//     return Object.keys(itemObject).forEach((key) => {
//       const value = itemObject[key];
//       form.elements[prefix ? `${prefix}-${key}` : key].value = value;
//     });
//   }
// };

export const setEmptyFormElementsValue = (keyList = {}, prefix = "") => {
  const form = document.querySelector("form");
  keyList.forEach((key) => {
    form.elements[prefix ? `${prefix}-${key}` : key].value = "";
  });
};

export const getStringifyObject = (name, obj) => ({
  name,
  content: removeSpaceFromString(JSON.stringify(obj)),
  other: removeSpaceFromString(JSON.stringify(obj))
});
