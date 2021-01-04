import { observable } from "mobx";

export const createStore = () => {
  const store = {
    intensity: observable.box(1),
    isOn: observable.box(true),
    get getIntensity() {
      return store.intensity.get();
    },
    get getIsOn() {
      return store.isOn.get();
    },
    setIntensity(value: number) {
      store.intensity.set(value);
    },
    switchOnOf() {
      store.isOn.set(!store.isOn.get());
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
