import React from "react";

import { Button } from "@material-ui/core";
import { storeContext } from "./context";
import Circle from "./Circle";

import "./circle.css";

const colors = ["#FFFF00", "#FF00FF", "#00FFFF"];
const FLASHLIGHTS_COUNT = 12;

const Main: React.FC = () => {
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");

  const { switchOnOf } = store;

  const flashlights: string[] = [];

  let counter = 0;

  for (let i = 0; i < FLASHLIGHTS_COUNT; i += 1) {
    flashlights.push(colors[counter]);
    counter += 1;
    if (counter >= colors.length) {
      counter = 0;
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        {flashlights.map((color, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Circle color={color} key={`${color}-${index}`} />
        ))}
      </div>
      <Button onClick={switchOnOf} variant="contained" color="primary">
        ON/OFF
      </Button>
    </>
  );
};

export default Main;
