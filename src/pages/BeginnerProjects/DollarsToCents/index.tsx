import React, { useState } from "react";
import { TextField } from "@material-ui/core";

import PageWrapper from "../../../components/PageWrapper";

import "./index.scss";

const title = "Dollars To Cents";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Dollars-To-Cents-App.md";

const DollarsToCents: React.FC = () => {
  const dollarPattern = /^\d+[.]?([\d*]{0,2})$/;

  const [dollarValue, setDollarValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.match(dollarPattern)) {
      setDollarValue(value);
    }
  };

  return (
    <div className="dollars_to_cents-container">
      <div className="dollars_to_cents-input_block">
        <TextField
          className="dollars_to_cents-base-input"
          label="Value in dollars"
          variant="outlined"
          value={dollarValue}
          onChange={handleChange}
        />
      </div>
      <div className="dollars_to_cents-output_block">
        <TextField
          className="dollars_to_cents-result_input"
          label="Quarters"
          variant="outlined"
          inputProps={{
            readOnly: true,
          }}
        />
        <TextField
          className="dollars_to_cents-result_input"
          label="Dimes"
          variant="outlined"
          inputProps={{
            readOnly: true,
          }}
        />
        <TextField
          className="dollars_to_cents-result_input"
          label="Nickels"
          variant="outlined"
          inputProps={{
            readOnly: true,
          }}
        />
        <TextField
          className="dollars_to_cents-result_input"
          label="Pennies"
          variant="outlined"
          inputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};

export default PageWrapper(title, taskLink, DollarsToCents);
