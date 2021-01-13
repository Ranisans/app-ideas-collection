import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import PageWrapper from "../../../components/PageWrapper";

import "./index.scss";
import { CSVToJSON, JSONToCSV } from "./logic";

const title = "CSV2JSON";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/CSV2JSON-App.md";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CSV2JSON: React.FC = () => {
  const [isSourceJSON, setIsSourceJSON] = useState(false);
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSourceJSON(event.target.checked);
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSource(value);
  };

  const handleTransform = () => {
    if (source.length === 0) {
      // error
      setOpen(true);
      return;
    }
    let transformResult: string | null;
    if (isSourceJSON) {
      transformResult = JSONToCSV(source);
    } else {
      transformResult = CSVToJSON(source);
    }

    if (transformResult && transformResult !== "[]") {
      setResult(transformResult);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="csv2json-container">
      <Typography component="div" className="csv2json-slider">
        <Grid component="label" container alignItems="flex-start" spacing={1}>
          <Grid item>CSV</Grid>
          <Grid item>
            <FormControlLabel
              value="top"
              control={
                <Switch
                  color="default"
                  checked={isSourceJSON}
                  onChange={handleChange}
                  name="checkedC"
                />
              }
              label="source"
              labelPlacement="top"
            />
          </Grid>
          <Grid item>JSON</Grid>
        </Grid>
      </Typography>
      <div className="csv2json-body">
        <div className="csv2json-data_box">
          <TextField
            multiline
            className="csv2json-text"
            variant="outlined"
            label="Source"
            rows={15}
            value={source}
            onChange={handleSourceChange}
          />
          <Button
            className="csv2json-button"
            variant="contained"
            color="primary"
          >
            Load
          </Button>
        </div>
        <Button className="csv2json-transform_button" onClick={handleTransform}>
          {">>"}
        </Button>
        <div className="csv2json-data_box">
          <TextField
            multiline
            className="csv2json-text"
            variant="outlined"
            label="Result"
            rows={15}
            value={result}
          />
          <Button
            className="csv2json-button"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Wrong Data!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageWrapper(title, taskLink, CSV2JSON);
