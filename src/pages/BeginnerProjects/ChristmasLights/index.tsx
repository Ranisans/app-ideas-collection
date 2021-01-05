import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { StoreProvider } from "./context";
import Main from "./Main";

const useStyles = makeStyles(() => ({
  container: {
    width: "content",
    padding: 30,
    margin: "0 auto",
    background: "rgb(25, 21, 26)",
  },
}));

const ChristmasLights: React.FC = () => {
  const styles = useStyles();
  return (
    <StoreProvider>
      <div className={styles.container}>
        <Main />
      </div>
    </StoreProvider>
  );
};

export default ChristmasLights;
