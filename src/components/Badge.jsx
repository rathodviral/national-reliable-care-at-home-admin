import React from "react";
import { Badge } from "react-bootstrap";

const AppBadge = (props) => {
  return <Badge {...props}>{props.children}</Badge>;
};

AppBadge.Edit = (props) => {
  return (
    <AppBadge bg="warning" className="me-1 cursor-pointer" {...props}>
      Edit
    </AppBadge>
  );
};

AppBadge.Delete = (props) => {
  return (
    <AppBadge bg="danger" className="cursor-pointer" {...props}>
      Delete
    </AppBadge>
  );
};

AppBadge.Save = (props) => {
  return (
    <AppBadge bg="primary" className="me-1 cursor-pointer" {...props}>
      Save
    </AppBadge>
  );
};

AppBadge.Clear = (props) => {
  return (
    <AppBadge bg="secondary" className="cursor-pointer" {...props}>
      Clear
    </AppBadge>
  );
};
export default AppBadge;
