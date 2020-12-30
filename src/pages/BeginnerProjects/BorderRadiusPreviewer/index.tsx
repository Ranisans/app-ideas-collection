import React, { useRef, useState } from "react";
import { Grid, Typography, Switch, Card, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import PageWrapper from "../../../components/PageWrapper";
import EightValues from "./EightValues";
import InPixelSize from "./InPixelSize";

const title = "Border-radius Previewer";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Border-Radius-Previewer.md";

const useStyles = makeStyles(() => ({
  checkBoxBlock: {
    width: 250,
  },
  card: {
    width: 400,
    height: 50,
    display: "flex",
    paddingLeft: 10,
    justifyContent: "space-between",
  },
}));

const BorderRadiusPreviewer: React.FC = () => {
  const [state, setState] = useState(false);
  const [style, setStyle] = useState("");
  const resultRef = useRef<HTMLParagraphElement>(null);
  const styles = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
  };

  const handleResult = (result: string) => {
    setStyle(result);
  };

  const handleCopy = () => {
    if (resultRef.current !== null) {
      const text = resultRef.current.textContent || "";
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div>
      <Typography component="div" className={styles.checkBoxBlock}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Measurement: 4</Grid>
          <Grid item>
            <Switch
              checked={state}
              onChange={handleChange}
              name="measurement"
              color="primary"
            />
          </Grid>
          <Grid item>8</Grid>
        </Grid>
      </Typography>
      {state ? (
        <EightValues callback={handleResult} />
      ) : (
        <InPixelSize callback={handleResult} />
      )}
      <Card className={styles.card}>
        <p ref={resultRef}>border-radius: {style}</p>
        <Button variant="contained" color="primary" onClick={handleCopy}>
          Copy
        </Button>
      </Card>
    </div>
  );
};

export default PageWrapper(title, taskLink, BorderRadiusPreviewer);
