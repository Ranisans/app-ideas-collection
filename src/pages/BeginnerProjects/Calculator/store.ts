import { observable } from "mobx";
import { EFunctions } from "./types";

const MAX_DIGITS = 8;
const DEFAULT_VALUE = "0";
const EMPTY_OPERATOR = "";

export const createStore = () => {
  const store = {
    memo: 0,
    value: observable.box(DEFAULT_VALUE),
    length: 0,
    lessZero: observable.box(false),
    error: observable.box(false),
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
    addNumber(num: string) {
      if (store.length < MAX_DIGITS) {
        const storedValue = store.value.get();
        if (storedValue === "0") {
          store.value.set(num);
          store.length = 1;
        } else {
          store.value.set(`${storedValue}${num}`);
          store.length += 1;
        }
      }
    },
    setFunction(operator: EFunctions) {
      if (store.operator !== EMPTY_OPERATOR) {
        store.calculate();
        store.operator = EMPTY_OPERATOR;
        return;
      }
      let value = parseInt(store.value.get(), 10);
      if (store.lessZero.get()) {
        value = 0 - value;
      }
      store.memo = value;
      store.length = 0;
      store.lessZero.set(false);
      store.value.set(DEFAULT_VALUE);
      store.operator = operator;
    },
    calculate() {
      const first = store.memo;
      let second = parseInt(store.value.get(), 10);
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
      store.length = 0;
      store.operator = EMPTY_OPERATOR;
      store.error.set(false);
    },
    clear() {
      store.lessZero.set(false);
      store.value.set(DEFAULT_VALUE);
      store.length = 0;
    },
    removeLast() {
      if (store.length > 1) {
        const value = store.value.get().substring(0, store.length - 1);
        store.value.set(value);
        store.length -= 1;
      } else {
        store.length = 0;
        store.value.set(DEFAULT_VALUE);
      }
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
