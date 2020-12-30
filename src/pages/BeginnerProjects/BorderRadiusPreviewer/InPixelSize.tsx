import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import clsx from "clsx";
import { IComponentProps } from "./type";

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "60px 85px 60px",
    gridTemplateRows: "45px 85px 45px",
    gridGap: 10,
  },
  lt: {
    gridRow: 1,
    gridColumn: 1,
  },
  rt: {
    gridRow: 1,
    gridColumn: 3,
  },
  rb: {
    gridRow: 3,
    gridColumn: 3,
  },
  lb: {
    gridRow: 3,
    gridColumn: 1,
  },
  input: {
    width: 40,
    height: 30,
  },
  subject: {
    gridRow: 2,
    gridColumn: 2,
    width: 80,
    height: 80,
    border: "2px solid gray",
  },
}));

interface IBorderValue {
  lt: number;
  rt: number;
  rb: number;
  lb: number;
  [key: string]: number;
}

const defaultValue: IBorderValue = {
  lt: 0,
  rt: 0,
  rb: 0,
  lb: 0,
};

const InPixelSize: React.FC<IComponentProps> = (props: IComponentProps) => {
  const { callback } = props;
  const [value, setValue] = useState<IBorderValue>(defaultValue);
  const [borderValue, setRadiusValue] = useState(`0px 0px 0px 0px`);

  const styles = useStyles();

  const handleChange = (key: string) => (
    element: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue({ ...value, [key]: parseInt(element.target.value, 10) });
  };

  useEffect(() => {
    const style = `${value.lt}px ${value.rt}px ${value.rb}px ${value.lb}px`;
    setRadiusValue(style);
    callback(style);
  }, [callback, value]);

  return (
    <div>
      <div className={styles.container}>
        <input
          name="lt"
          className={clsx(styles.lt, styles.input)}
          value={value.lt}
          onChange={handleChange("lt")}
        />
        <input
          name="rt"
          className={clsx(styles.rt, styles.input)}
          value={value.rt}
          onChange={handleChange("rt")}
        />
        <div
          className={styles.subject}
          style={{
            borderRadius: borderValue,
          }}
        />
        <input
          name="rb"
          className={clsx(styles.rb, styles.input)}
          value={value.rb}
          onChange={handleChange("rb")}
        />
        <input
          name="lb"
          className={clsx(styles.lb, styles.input)}
          value={value.lb}
          onChange={handleChange("lb")}
        />
      </div>
    </div>
  );
};

export default InPixelSize;
