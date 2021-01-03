import React from "react";
import BackspaceIcon from "@material-ui/icons/Backspace";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from "@material-ui/core";

import { storeContext } from "../../context";
import {
  EButtonColor,
  EOperations,
  EFunctions,
  EDigits,
  IButton,
  RESULT,
  DOT,
} from "../../types";

const Buttons: IButton[] = [
  { value: EOperations.RESET, label: "AC" },
  { value: EOperations.CLEAR, label: "C" },
  { value: EOperations.BACK, label: <BackspaceIcon /> },
  { value: EFunctions.DIVISION, label: "/" },
  { value: EDigits.SEVEN, label: "7", color: EButtonColor.PRIMARY },
  { value: EDigits.EIGHT, label: "8", color: EButtonColor.PRIMARY },
  { value: EDigits.NINE, label: "9", color: EButtonColor.PRIMARY },
  { value: EFunctions.MULTI, label: "*" },
  { value: EDigits.FOUR, label: "4", color: EButtonColor.PRIMARY },
  { value: EDigits.FIVE, label: "5", color: EButtonColor.PRIMARY },
  { value: EDigits.SIX, label: "6", color: EButtonColor.PRIMARY },
  { value: EFunctions.DIFF, label: "-" },
  { value: EDigits.ONE, label: "1", color: EButtonColor.PRIMARY },
  { value: EDigits.TWO, label: "2", color: EButtonColor.PRIMARY },
  { value: EDigits.THREE, label: "3", color: EButtonColor.PRIMARY },
  { value: EFunctions.SUM, label: "+" },
  { value: EOperations.SIGN, label: "+/-" },
  { value: EDigits.ZERO, label: "0", color: EButtonColor.PRIMARY },
  { value: DOT, label: "." },
  { value: RESULT, label: "=", color: EButtonColor.SECONDARY },
];

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 50px)",
    gridTemplateRows: "repeat(5, 50px)",
    gridGap: 5,
  },
}));

const StyledButton = withStyles(() => ({
  root: {
    width: 50,
    minWidth: 50,
    height: 50,
    boxSizing: "border-box",
  },
}))(Button);

const ButtonBlock: React.FC = () => {
  const styles = useStyles();
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");

  const {
    addNumber,
    setFunction,
    changeSign,
    reset,
    clear,
    removeLast,
    calculate,
  } = store;

  const handlerClick = (value: string) => () => {
    if (Object.values(EDigits).includes(value as EDigits)) {
      addNumber(value);
    } else if (Object.values(EFunctions).includes(value as EFunctions)) {
      setFunction(value as EFunctions);
    } else if (Object.values(EOperations).includes(value as EOperations)) {
      switch (value) {
        case EOperations.CLEAR: {
          clear();
          break;
        }
        case EOperations.RESET: {
          reset();
          break;
        }
        case EOperations.BACK: {
          removeLast();
          break;
        }
        case EOperations.SIGN: {
          changeSign();
          break;
        }
        default:
      }
    } else if (value === RESULT) {
      calculate();
    }
  };

  return (
    <div className={styles.buttonContainer}>
      {Buttons.map((buttonData) => (
        <StyledButton
          variant="contained"
          color={buttonData?.color ?? "default"}
          key={buttonData.value}
          onClick={handlerClick(buttonData.value)}
        >
          {buttonData.label}
        </StyledButton>
      ))}
    </div>
  );
};

export default ButtonBlock;
