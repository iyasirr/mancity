import React from "react";

import Header from "../components/header-footer/header";
import Footer from "../components/header-footer/footer";

const layout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default layout;
