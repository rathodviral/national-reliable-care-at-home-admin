import React, { createContext, useEffect, useState } from "react";
import {
  AppStorage,
  APP_STORAGE,
  getLayouts,
  readImagesFromDirectory
} from "./utilities";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const [navigationHader, setNavigationHader] = useState("color_1");
  const body = document.querySelector("body");
  // const [windowWidth, setWindowWidth] = useState(0);
  // const [windowHeight, setWindowHeight] = useState(0);

  let resizeWindow = () => {
    // setWindowWidth(window.innerWidth);
    // setWindowHeight(window.innerHeight);
    // window.innerWidth >= 768 && window.innerWidth < 1351
    //   ? body.setAttribute("data-sidebar-style", "mini")
    //   : window.innerWidth <= 768
    //   ? body.setAttribute("data-sidebar-style", "overlay")
    //   : body.setAttribute("data-sidebar-style", "full");
  };

  const getUserObject = () => {
    return (
      AppStorage.getItemFromStorage(APP_STORAGE) || {
        username: null,
        isAdmin: null
      }
    );
  };

  const isAuthorize = () => {
    const { username } = getUserObject();
    return Boolean(username);
  };

  const defaultAlert = {
    isShow: false,
    text: "",
    type: "primary"
  };

  const [alertObj, setAlertObj] = useState(defaultAlert);

  const showAlertObj = (text, type = "primary") => {
    setAlertObj({ text, type, isShow: true });
    setTimeout(() => {
      setAlertObj(defaultAlert);
    }, 3000);
  };

  const hideAlertObj = (event, reason) => {
    setAlertObj(defaultAlert);
  };

  const [layoutList, setLayoutList] = useState([]);

  const getLayoutListData = async () => {
    const data = await getLayouts();
    const parsedData = data
      .map((item) => {
        return {
          ...item,
          content: JSON.parse(item.content),
          other: JSON.parse(item.other)
        };
      })
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setLayoutList(parsedData);
  };

  const [imageList, setImageList] = useState([]);

  const getImageList = async () => {
    const data = await readImagesFromDirectory();
    setImageList(data);
  };

  useEffect(() => {
    //   body.setAttribute("data-typography", "poppins");
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    getImageList();
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <AppContext.Provider
      value={{
        body,
        isAuthorize,
        alertObj,
        showAlertObj,
        hideAlertObj,
        layoutList,
        getLayoutListData,
        imageList,
        getImageList
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
