import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AppContext } from "../../AppContext";
import AppNavbar from "../../components/Navbar";
import AddLayout from "./add";
import LayoutList from "./list";
import ImageUpload from "./image-upload";

const Layout = (props) => {
  const { path } = useRouteMatch();
  const { layoutList, getLayoutListData } = useContext(AppContext);

  const [isPage, setPage] = useState(false);

  useEffect(() => {
    getLayoutListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (layoutList.length > 0) {
      setPage(path.includes("page"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutList]);

  return (
    <React.Fragment>
      <AppNavbar />
      <div className="px-2">
        <Switch>
          <Route exact path={`${path}/edit/:id`}>
            <AddLayout {...props} isEdit={true} />
          </Route>
          <Route exact path={`${path}/add`}>
            <AddLayout {...props} isEdit={false} />
          </Route>
          <Route exact path={`${path}`}>
            <LayoutList
              isPage={isPage}
              list={layoutList.filter((item) =>
                isPage ? item.type === "page" : item.type !== "page"
              )}
            />
          </Route>
          <Route exact path={`${path}/image`}>
            <ImageUpload {...props} />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Layout;
