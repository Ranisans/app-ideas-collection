import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import clsx from "clsx";

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

const InPixelSize: React.FC = () => {
  const [borderValue, setBorderValue] = useState<IBorderValue>({
    lt: 0,
    rt: 0,
    rb: 0,
    lb: 0,
  });

  const styles = useStyles();

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = element.target;
    setBorderValue({ ...borderValue, [name]: parseInt(value, 10) });
  };

  return (
    <div>
      <div className={styles.container}>
        <input
          name="lt"
          className={clsx(styles.lt, styles.input)}
          value={borderValue.lt}
          onChange={handleChange}
        />
        <input
          name="rt"
          className={clsx(styles.rt, styles.input)}
          value={borderValue.rt}
          onChange={handleChange}
        />
        <div
          className={styles.subject}
          style={{
            borderRadius: `${borderValue.lt}px ${borderValue.rt}px ${borderValue.rb}px ${borderValue.lb}px`,
          }}
        />
        <input
          name="rb"
          className={clsx(styles.rb, styles.input)}
          value={borderValue.rb}
          onChange={handleChange}
        />
        <input
          name="lb"
          className={clsx(styles.lb, styles.input)}
          value={borderValue.lb}
          onChange={handleChange}
        />
      </div>
      <div>
        border-radius:
        {` ${borderValue.lt}px ${borderValue.rt}px ${borderValue.rb}px ${borderValue.lb}px`}
      </div>
    </div>
  );
};

export default InPixelSize;
