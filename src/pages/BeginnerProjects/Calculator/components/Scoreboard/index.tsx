import React from "react";
import { TextField } from "@material-ui/core";
import { useObserver } from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { storeContext } from "../../context";

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
  },
  sign: {
    width: 10,
  },
}));

const Scoreboard: React.FC = () => {
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");
  const styles = useStyle();

  return useObserver(() => {
    return (
      <div className={styles.container}>
        <div className={styles.sign}>{store.isLessZero && "-"}</div>
        <TextField value={store.isError ? "ERR" : store.showedValue} />
      </div>
    );
  });
};

export default Scoreboard;
