import { observable } from "mobx";
import { EFunctions } from "./types";

const MAX_DIGITS = 8;
const MAXIMUM_NUMBER_AFTER_POINT = 3;
const DEFAULT_VALUE = "0";
const EMPTY_OPERATOR = "";

export const createStore = () => {
  const store = {
    memo: 0,
    value: observable.box(DEFAULT_VALUE),
    valueLength: 0,
    lessZero: observable.box(false),
    error: observable.box(false),
    decimalPoint: false,
    numberAfterPoint: 0,
    needReset: false,
    operator: EMPTY_OPERATOR,
    get showedValue() {
      return store.value.get();
    },
    get isLessZero() {
      return store.lessZero.get();
    },
    get isError() {
      return store.error.get();
    },
    addDecimalPoint() {
      if (!store.decimalPoint) {
        store.decimalPoint = true;
        store.value.set(`${store.value.get()}.`);
      }
    },
    addNumber(num: string) {
      if (store.needReset) {
        store.reset();
      }
      if (
        store.valueLength < MAX_DIGITS &&
        store.numberAfterPoint < MAXIMUM_NUMBER_AFTER_POINT
      ) {
        const storedValue = store.value.get();
        if (storedValue === "0" && !store.decimalPoint) {
          store.value.set(num);
          store.valueLength = 1;
        } else {
          store.value.set(`${storedValue}${num}`);
          store.valueLength += 1;
          if (store.decimalPoint) {
            store.numberAfterPoint += 1;
          }
        }
      }
    },
    setFunction(operator: EFunctions) {
      if (store.operator !== EMPTY_OPERATOR) {
        store.calculate();
        store.operator = EMPTY_OPERATOR;
        return;
      }
      let value = parseFloat(store.value.get());
      if (store.lessZero.get()) {
        value = 0 - value;
      }
      store.memo = value;
      store.decimalPoint = false;
      store.numberAfterPoint = 0;
      store.valueLength = 0;
      store.lessZero.set(false);
      store.value.set(DEFAULT_VALUE);
      store.operator = operator;
    },
    calculate() {
      const first = store.memo;
      let second = parseFloat(store.value.get());
      if (store.lessZero.get()) {
        second = 0 - second;
      }
      let result: number;
      switch (store.operator) {
        case EFunctions.DIFF: {
          result = first - second;
          break;
        }
        case EFunctions.SUM: {
          result = first + second;
          break;
        }
        case EFunctions.DIVISION: {
          if (second === 0) {
            store.error.set(true);
            return;
          }
          result = first / second;
          break;
        }
        case EFunctions.MULTI: {
          result = first * second;
          break;
        }
        default:
          return;
      }
      if (result < 0) {
        store.lessZero.set(true);
        result = Math.abs(result);
      }
      store.memo = 0;
      const strResult = `${result}`;
      store.needReset = true;
      if (strResult.length > MAX_DIGITS) {
        store.error.set(true);
      } else {
        store.value.set(`${result}`);
      }
    },
    changeSign() {
      store.lessZero.set(!store.lessZero.get());
    },
    reset() {
      store.memo = 0;
      store.lessZero.set(false);
      store.value.set(DEFAULT_VALUE);
      store.valueLength = 0;
      store.operator = EMPTY_OPERATOR;
      store.needReset = false;
      store.error.set(false);
    },
    clear() {
      store.lessZero.set(false);
      store.value.set(DEFAULT_VALUE);
      store.valueLength = 0;
    },
    removeLast() {
      const storedValue = store.value.get();
      if (storedValue.length > 1) {
        const value = storedValue.substring(0, storedValue.length - 1);
        store.value.set(value);
        store.valueLength -= 1;
        if (store.decimalPoint) {
          store.numberAfterPoint -= 1;
          if (store.numberAfterPoint === -1) {
            // we deleted decimal point
            store.decimalPoint = false;
            store.valueLength = value.length; // restore length
          }
        }
      } else {
        store.clear();
      }
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
