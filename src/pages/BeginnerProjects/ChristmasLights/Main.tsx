import React from "react";

import { Button } from "@material-ui/core";
import { storeContext } from "./context";
import Circle from "./Circle";

const Main: React.FC = () => {
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");

  const { switchOnOf } = store;

  return (
    <>
      <Circle color="rgb(255, 255, 0)" />
      <Circle color="rgb(255, 0, 255)" />
      <Button onClick={switchOnOf} variant="contained" color="primary">
        ON/OFF
      </Button>
    </>
  );
};

export default Main;
