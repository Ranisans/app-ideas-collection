import React, { ReactElement } from "react";
import { useLocalStore } from "mobx-react-lite";

import { createStore, TStore } from "./store";

export const storeContext = React.createContext<TStore | null>(null);

interface IStoreProvider {
  children: ReactElement;
}

export const StoreProvider: React.FC<IStoreProvider> = ({
  children,
}: IStoreProvider) => {
  const store = useLocalStore(createStore);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};
