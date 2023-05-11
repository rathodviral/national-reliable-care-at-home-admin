import React from "react";
import { AppBadge } from "../../components";

const AppEditSectionButtonGroup = ({ condition, eventHandler }) => {
  return condition ? (
    <div>
      <AppBadge.Edit onClick={() => eventHandler("edit-start")} />
      <AppBadge.Delete onClick={() => eventHandler("delete")} />
    </div>
  ) : (
    <div>
      <AppBadge.Save onClick={() => eventHandler("edit-end")} />
      <AppBadge.Clear onClick={() => eventHandler("other")} />
    </div>
  );
};

export default AppEditSectionButtonGroup;
