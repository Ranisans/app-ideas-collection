import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import { storeContext } from "./context";

const DEFAULT_SIZE = 50;
const DEFAULT_COLOR = "#563260";

interface ICircle {
  color: string;
}

interface IElement extends ICircle {
  size: number;
  isOn: boolean;
  onChangeColor: (color: string) => void;
}

const Element: React.FC<IElement> = (props: IElement) => {
  const { color, size, isOn, onChangeColor } = props;
  let ref: HTMLDivElement | null = null;

  useEffect(() => {
    ref?.style.setProperty("--size", `${size}px`);
    if (isOn) {
      ref?.classList.add("circle_animation");
      ref?.style.setProperty("--color", color);
    } else {
      ref?.style.setProperty("--color", DEFAULT_COLOR);
      ref?.classList.remove("circle_animation");
    }
  }, [color, isOn, ref, size]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    onChangeColor(value);
  };

  return (
    // eslint-disable-next-line no-return-assign
    <div ref={(div) => (ref = div)} className="circle">
      <div className="flashlight_color-wrapper">
        <input
          type="color"
          value={isOn ? color : DEFAULT_COLOR}
          disabled={!isOn}
          className="flashlight_color"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const Circle: React.FC<ICircle> = (props: ICircle) => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [color, setColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    setColor(props.color);
  }, [props]);

  const onChangeColor = (elementColor: string) => {
    setColor(elementColor);
  };

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSize(parseInt(value, 10));
  };

  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");

  return useObserver(() => (
    <div className="circle_container">
      <div className="circle_container-menu">
        <input
          type="range"
          min="40"
          max="60"
          className="circle-width-slider"
          onChange={handleChangeSize}
        />
      </div>
      <Element
        color={color}
        size={size}
        isOn={store.getIsOn}
        onChangeColor={onChangeColor}
      />
    </div>
  ));
};

export default Circle;
