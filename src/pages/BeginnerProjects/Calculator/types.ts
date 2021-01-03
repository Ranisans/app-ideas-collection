import { ReactChild } from "react";

export enum EButtonColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface IButton {
  value: string;
  label: string | ReactChild;
  color?: EButtonColor;
}

export enum EOperations {
  RESET = "reset",
  CLEAR = "clear",
  BACK = "back",
  SIGN = "sign",
}

export enum EFunctions {
  DIVISION = "division",
  MULTI = "multi",
  DIFF = "dif",
  SUM = "sum",
}

export enum EDigits {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  ZERO = "0",
}

export const RESULT = "result";

export const DOT = "dot";
