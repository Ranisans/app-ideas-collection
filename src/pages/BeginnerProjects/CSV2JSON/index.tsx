import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import PageWrapper from "../../../components/PageWrapper";

import "./index.scss";

const title = "CSV2JSON";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/CSV2JSON-App.md";

const CSV2JSON: React.FC = () => {
  const [isSourceJSON, setIsSourceJSON] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSourceJSON(event.target.checked);
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
          />
          <Button
            className="csv2json-button"
            variant="contained"
            color="primary"
          >
            Load
          </Button>
        </div>
        <Button className="csv2json-transform_button">{">>"}</Button>
        <div className="csv2json-data_box">
          <TextField
            multiline
            className="csv2json-text"
            variant="outlined"
            label="Result"
            rows={15}
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
    </div>
  );
};

export default PageWrapper(title, taskLink, CSV2JSON);
