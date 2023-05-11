import React from "react";

const AppText = (props) => {
  return (
    <p className="m-0" {...props}>
      {props.children}
    </p>
  );
};
AppText.Title = (props) => {
  return (
    <AppText {...props}>
      <strong>{props.title} - </strong>
      {props.children}
    </AppText>
  );
};
export default AppText;
