import React from "react";

import { Button, Slider } from "@material-ui/core";
import { storeContext } from "./context";
import Circle from "./Circle";

import "./circle.css";

const colors = ["#FFFF00", "#FF00FF", "#00FFFF"];
const FLASHLIGHTS_COUNT = 12;

const Main: React.FC = () => {
  const store = React.useContext(storeContext);
  const [tempIntensity, setTempIntensity] = React.useState(1);
  if (!store) throw Error("Store shouldn't be null");

  const { switchOnOf, setIntensity } = store;

  const flashlights: string[] = [];

  let counter = 0;

  for (let i = 0; i < FLASHLIGHTS_COUNT; i += 1) {
    flashlights.push(colors[counter]);
    counter += 1;
    if (counter >= colors.length) {
      counter = 0;
    }
  }

  const handleIntensityChange = (event: any, value: number | number[]) => {
    setTempIntensity(value as number);
  };

  const handleIntensitySet = () => {
    setIntensity(tempIntensity);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {flashlights.map((color, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Circle color={color} key={`${color}-${index}`} />
        ))}
      </div>
      <div className="controls">
        <Button onClick={switchOnOf} variant="contained" color="primary">
          ON/OFF
        </Button>
        <Slider
          value={tempIntensity}
          onChange={handleIntensityChange}
          min={0.5}
          max={5}
          step={0.1}
          valueLabelDisplay="on"
        />
        <Button
          onClick={handleIntensitySet}
          variant="contained"
          color="secondary"
        >
          Set Intensity
        </Button>
      </div>
    </>
  );
};

export default Main;
