import React from "react";
import ReactDOM from "react-dom";

import App from "components/app";
import { getLatestStatus } from "helpers/status";

let component;

window.onload = function onLoad() {
  const contentAnchor = document.getElementById("content-anchor");
  component = ReactDOM.render(<App />, contentAnchor);

  getLatestStatus().then((status) => {
    component = ReactDOM.render(<App {...component.props} status={status} />, contentAnchor);
  }, (error) => {
    component = ReactDOM.render(<App {...component.props} error={true} />, contentAnchor);
  });
};

if (module.hot) {
  module.hot.accept();
}
