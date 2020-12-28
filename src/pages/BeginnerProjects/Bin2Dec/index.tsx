import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Bin2Dec-App.md";
const title = "Bin2Dec";

const Bin2Dec: React.FC = () => {
  const [binaryValue, setBinaryValue] = useState("");
  const [binaryValueError, setBinaryValueError] = useState(false);
  const [decimalValue, setDecimalValue] = useState(0);

  const regexpFilter = /^[0-1]*$/;
  const MAX_LENGTH = 8;

  const converter = (stringBinary: string): number => {
    const reverseStringBinary = stringBinary.split("").reverse().join("");
    let result = 0;
    for (let i = 0; i < reverseStringBinary.length; i += 1) {
      const value = parseInt(reverseStringBinary[i], 10);
      result += 2 ** i * value;
    }
    return result;
  };

  const binaryInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.match(regexpFilter) && value.length <= MAX_LENGTH) {
      setBinaryValue(value);
      setBinaryValueError(false);
      setDecimalValue(converter(value));
    } else {
      setBinaryValueError(true);
    }
  };

  return (
    <div>
      <TextField
        label="binary number"
        value={binaryValue}
        onChange={binaryInputHandler}
        error={binaryValueError}
        helperText={binaryValueError && "Only 0 and 1 allowed, max 8 digits"}
      />
      <TextField
        label="Result in Dec"
        contentEditable={false}
        value={decimalValue}
        inputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default Bin2Dec;
