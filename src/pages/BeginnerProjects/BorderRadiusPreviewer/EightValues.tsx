import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Slider } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { IComponentProps } from "./type";

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "20px 150px 150px 20px",
    gridTemplateRows: "20px 150px 150px 20px",
    gridGap: 20,
  },
  tlx: {
    gridRow: 1,
    gridColumn: 2,
  },
  trx: {
    gridRow: 1,
    gridColumn: 3,
  },
  try: {
    gridRow: 2,
    gridColumn: 4,
  },
  bry: {
    gridRow: 3,
    gridColumn: 4,
  },
  brx: {
    gridRow: 4,
    gridColumn: 3,
  },
  blx: {
    gridRow: 4,
    gridColumn: 2,
  },
  bly: {
    gridRow: 3,
    gridColumn: 1,
  },
  tly: {
    gridRow: 2,
    gridColumn: 1,
  },
  experimental: {
    gridRow: "2 / span 2",
    gridColumn: "2 / span 2",
    boxSizing: "border-box",
    border: "2px solid gray",
  },
}));

type TOnChange = (event: any, newValue: number | number[]) => void;

interface IState {
  tlx: number;
  trx: number;
  try: number;
  bry: number;
  brx: number;
  blx: number;
  bly: number;
  tly: number;
  [key: string]: number;
}

const defaultValue: IState = {
  tlx: 0,
  trx: 100,
  try: 100,
  bry: 0,
  brx: 100,
  blx: 0,
  bly: 0,
  tly: 100,
};

const StyledSlider = withStyles(() => ({
  root: {
    width: 150,
    height: 20,
    margin: 0,
  },
}))(Slider);

const EightValues: React.FC<IComponentProps> = (props: IComponentProps) => {
  const { callback } = props;
  const styles = useStyles();

  const [value, setValue] = useState(defaultValue);
  const [borderValue, setRadiusValue] = useState(`0% 0% 0% 0% / 0% 0% 0% 0%`);

  const handleChange = (key: string): TOnChange => (event, newValue) => {
    setValue({ ...value, [key]: newValue as number });
  };

  useEffect(() => {
    const style = `${value.tlx}% ${100 - value.trx}% ${100 - value.brx}% ${
      value.blx
    }% / ${100 - value.tly}% ${100 - value.try}% ${value.bry}% ${value.bly}%`;
    setRadiusValue(style);
    callback(style);
  }, [callback, value]);

  return (
    <div>
      <div className={styles.container}>
        <StyledSlider
          track={false}
          value={value.tlx}
          onChange={handleChange("tlx")}
          className={styles.tlx}
        />
        <StyledSlider
          track={false}
          value={value.trx}
          onChange={handleChange("trx")}
          className={styles.trx}
        />
        <StyledSlider
          track={false}
          value={value.try}
          onChange={handleChange("try")}
          className={styles.try}
          orientation="vertical"
        />
        <StyledSlider
          track={false}
          value={value.bry}
          onChange={handleChange("bry")}
          className={styles.bry}
          orientation="vertical"
        />
        <StyledSlider
          track={false}
          value={value.brx}
          onChange={handleChange("brx")}
          className={styles.brx}
        />
        <StyledSlider
          track={false}
          value={value.blx}
          onChange={handleChange("blx")}
          className={styles.blx}
        />
        <StyledSlider
          track={false}
          value={value.bly}
          onChange={handleChange("bly")}
          className={styles.bly}
          orientation="vertical"
        />
        <StyledSlider
          track={false}
          value={value.tly}
          onChange={handleChange("tly")}
          className={styles.tly}
          orientation="vertical"
        />
        <div
          className={styles.experimental}
          style={{
            borderRadius: borderValue,
          }}
        />
      </div>
    </div>
  );
};

export default EightValues;
