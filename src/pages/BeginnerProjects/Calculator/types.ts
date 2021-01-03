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

export const RESULT = "result";

export const DOT = "dot";
