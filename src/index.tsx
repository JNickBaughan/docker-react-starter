import React from "react";
import ReactDOM from "react-dom";
import WelcomeCard from "./components/welcome-card";

ReactDOM.render(
  <WelcomeCard
    title={"react starter app"}
    paragraph={"todo: add graphQL next"}
  />,
  document.getElementById("root")
);
