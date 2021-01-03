import { observable } from "mobx";
import { EFunctions } from "./types";

const MAX_DIGITS = 8;

export const createStore = () => {
  const store = {
    memo: 0,
    value: observable.box(0),
    length: 0,
    lessZero: observable.box(false),
    isError: observable.box(false),
    operator: "",
    addNumber(num: number) {
      if (store.length < MAX_DIGITS) {
        const result = store.value.get() * 10 + num;
        if (result !== 0) store.length += 1;
        store.value.set(result);
      }
    },
    setFunction(operator: EFunctions) {
      let value = store.value.get();
      if (store.lessZero.get()) {
        value = 0 - value;
      }
      store.memo = value;
      store.length = 0;
      store.lessZero.set(false);
      store.value.set(0);
      store.operator = operator;
    },
    calculate() {
      let first = store.value.get();
      const second = store.memo;
      if (store.lessZero.get()) {
        first = 0 - first;
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
            store.reset();
            store.isError.set(true);
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
      store.value.set(result);
    },
    reset() {
      store.memo = 0;
      store.lessZero.set(false);
      store.value.set(0);
      store.length = 0;
      store.isError.set(false);
    },
    clear() {
      store.lessZero.set(false);
      store.value.set(0);
      store.length = 0;
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
