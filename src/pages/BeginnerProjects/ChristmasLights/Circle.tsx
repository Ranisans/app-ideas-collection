import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import { storeContext } from "./context";

import "./circle.css";

const DEFAULT_SIZE = 50;
const DEFAULT_COLOR = "rgb(86, 50, 96)";

interface ICircle {
  color: string;
}

interface IElement extends ICircle {
  size: number;
  intensity: number;
  isOn: boolean;
}

const Element: React.FC<IElement> = (props: IElement) => {
  const { color, size, intensity, isOn } = props;
  let ref: HTMLDivElement | null = null;

  useEffect(() => {
    ref?.style.setProperty("--size", `${size}px`);
    if (isOn) {
      ref?.style.setProperty("--color", color);
      ref?.style.setProperty("--intensity", `${intensity}s`);
    } else {
      ref?.style.setProperty("--color", DEFAULT_COLOR);
      ref?.style.setProperty("--intensity", `0s`);
    }
  }, [color, intensity, isOn, ref, size]);

  // eslint-disable-next-line no-return-assign
  return <div ref={(div) => (ref = div)} className="circle" />;
};

const Circle: React.FC<ICircle> = (props: ICircle) => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [color, setColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    setColor(props.color);
  }, [props]);

  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");

  return useObserver(() => (
    <Element
      color={color}
      size={size}
      intensity={store.getIntensity}
      isOn={store.getIsOn}
    />
  ));
};

export default Circle;
