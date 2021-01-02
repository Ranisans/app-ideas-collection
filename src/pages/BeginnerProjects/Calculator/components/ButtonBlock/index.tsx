import React from "react";
import BackspaceIcon from "@material-ui/icons/Backspace";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from "@material-ui/core";
import { EButtonColor, EOperations, IButton } from "../../types";

const Buttons: IButton[] = [
  { value: EOperations.RESET, label: "AC" },
  { value: EOperations.CLEAR, label: "C" },
  { value: EOperations.BACK, label: <BackspaceIcon /> },
  { value: EOperations.DIVISION, label: "/" },
  { value: "7", label: "7", color: EButtonColor.PRIMARY },
  { value: "8", label: "8", color: EButtonColor.PRIMARY },
  { value: "9", label: "9", color: EButtonColor.PRIMARY },
  { value: EOperations.MULTI, label: "*" },
  { value: "4", label: "4", color: EButtonColor.PRIMARY },
  { value: "5", label: "5", color: EButtonColor.PRIMARY },
  { value: "6", label: "6", color: EButtonColor.PRIMARY },
  { value: EOperations.DIFF, label: "-" },
  { value: "1", label: "1", color: EButtonColor.PRIMARY },
  { value: "2", label: "2", color: EButtonColor.PRIMARY },
  { value: "3", label: "3", color: EButtonColor.PRIMARY },
  { value: EOperations.SUM, label: "+" },
  { value: EOperations.SIGN, label: "+/-" },
  { value: "0", label: "0", color: EButtonColor.PRIMARY },
  { value: ".", label: "." },
  { value: EOperations.RESULT, label: "=", color: EButtonColor.SECONDARY },
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
  return (
    <div className={styles.buttonContainer}>
      {Buttons.map((buttonData) => (
        <StyledButton
          variant="contained"
          color={buttonData?.color ?? "default"}
          key={buttonData.value}
          onClick={() => console.log(buttonData.value)}
        >
          {buttonData.label}
        </StyledButton>
      ))}
    </div>
  );
};

export default ButtonBlock;
