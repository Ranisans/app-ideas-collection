import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import PageWrapper from "../../../components/PageWrapper";

import "./index.scss";

const title = "Dollars To Cents";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Dollars-To-Cents-App.md";

const CENTS_IN_DOLLAR = 100;
const QUARTER = 25;
const DIME = 10;
const NICKEL = 5;

interface ICents {
  quarters: number;
  dimes: number;
  nickels: number;
  pennies: number;
}

const defaultCents: ICents = {
  quarters: 0,
  dimes: 0,
  nickels: 0,
  pennies: 0,
};

const DollarsToCents: React.FC = () => {
  const dollarPattern = /^\d+[.]?([\d*]{0,2})$/;

  const [dollarValue, setDollarValue] = useState("");
  const [cents, setCents] = useState<ICents>(defaultCents);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.match(dollarPattern)) {
      setDollarValue(value);
    }
  };

  const calculateCents = (num: number) => {
    let totalCents = Math.round(num * CENTS_IN_DOLLAR);
    const quarters = Math.floor(totalCents / QUARTER);
    totalCents -= quarters * QUARTER;
    const dimes = Math.floor(totalCents / DIME);
    totalCents -= dimes * DIME;
    const nickels = Math.floor(totalCents / NICKEL);
    const pennies = totalCents - nickels * NICKEL;
    setCents({ quarters, dimes, nickels, pennies });
  };

  const handleCalculate = () => {
    if (dollarValue) {
      const num = parseFloat(dollarValue);
      if (num > 0) {
        calculateCents(num);
      }
    }
  };

  return (
    <div className="dollars_to_cents-container">
      <div className="dollars_to_cents-input_block">
        <TextField
          label="Value in dollars"
          variant="outlined"
          value={dollarValue}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </div>
      <div className="dollars_to_cents-input_block">
        <TextField
          label="Quarters"
          variant="outlined"
          value={cents.quarters}
          inputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Dimes"
          variant="outlined"
          value={cents.dimes}
          inputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Nickels"
          variant="outlined"
          value={cents.nickels}
          inputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Pennies"
          variant="outlined"
          value={cents.pennies}
          inputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};

export default PageWrapper(title, taskLink, DollarsToCents);
