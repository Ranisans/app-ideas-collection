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
  const [openError, setOpenError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [linkRef, setRef] = useState<HTMLAnchorElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSourceJSON(event.target.checked);
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSource(value);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const text = e.target.result;
        if (typeof text === "string") {
          setSource(text);
        }
      }
    };

    if (event.target?.files) {
      reader.readAsText(event.target.files[0]);
    } else {
      setErrorText("Cannot Read File!");
      setOpenError(true);
    }
  };

  const saveFile = (text: string) => {
    if (linkRef) {
      const file = new Blob([text], { type: "text/plain" });
      linkRef.href = URL.createObjectURL(file);
      linkRef.download = "result.txt";
    }
  };

  const handleTransform = () => {
    if (source.length === 0) {
      // error
      setOpenError(true);
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
      saveFile(transformResult);
    } else {
      setErrorText("Wrong Data!");
      setOpenError(true);
    }
  };

  return (
    <div className="csv2json-container">
      <Typography component="div" className="csv2json-slider">
        <Grid component="label" container alignItems="flex-start" spacing={1}>
          <Grid item xs>
            <div className={!isSourceJSON ? "csv2json-active_type" : ""}>
              CSV
            </div>
          </Grid>
          <Grid item xs>
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
          <Grid item xs>
            <div className={isSourceJSON ? "csv2json-active_type" : ""}>
              JSON
            </div>
          </Grid>
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
          <label
            htmlFor="upload-file"
            className="csv2json-button_wrapper"
            style={{
              marginLeft: "auto",
            }}
          >
            <input
              style={{ display: "none" }}
              id="upload-file"
              name="upload-file"
              type="file"
              onChange={handleChangeFile}
            />

            <Button
              color="primary"
              variant="contained"
              component="span"
              className="csv2json-button"
            >
              Load
            </Button>
          </label>
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
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            ref={(ref) => setRef(ref)}
            className="csv2json-button_wrapper"
            href=""
            id="download-file"
          >
            <Button
              className="csv2json-button"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </a>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageWrapper(title, taskLink, CSV2JSON);
