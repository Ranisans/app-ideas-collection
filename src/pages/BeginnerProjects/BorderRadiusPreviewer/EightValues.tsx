import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Slider } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "20px 150px 150px 20px",
    gridTemplateRows: "20px 150px 150px 20px",
    gridGap: 10,
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
  range: {
    width: 150,
    height: 20,
    margin: 0,
  },
}));

interface ITaskSlider {
  className: string;
  isVertical?: boolean;
}

const TaskSlider: React.FC<ITaskSlider> = (data: ITaskSlider) => {
  const { className, isVertical } = data;
  const StyledSlider = withStyles(() => ({
    root: {
      width: 150,
      height: 20,
      margin: 0,
    },
  }))(Slider);

  return (
    <StyledSlider
      track={false}
      className={className}
      {...(isVertical && { orientation: "vertical" })}
    />
  );
};

const EightValues: React.FC = () => {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.container}>
        <TaskSlider className={styles.tlx} />
        <TaskSlider className={styles.trx} />
        <TaskSlider className={styles.try} isVertical />
        <TaskSlider className={styles.bry} isVertical />
        <TaskSlider className={styles.brx} />
        <TaskSlider className={styles.blx} />
        <TaskSlider className={styles.bly} isVertical />
        <TaskSlider className={styles.tly} isVertical />
      </div>
    </div>
  );
};

export default EightValues;
