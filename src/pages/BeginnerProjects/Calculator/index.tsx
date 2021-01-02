import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PageWrapper from "../../../components/PageWrapper";
import ButtonBlock from "./components/ButtonBlock";

const title = "Calculator";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Calculator-App.md";

const useStyles = makeStyles(() => ({
  container: {
    width: "max-content",
    margin: "0 auto",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 50px)",
    gridTemplateRows: "repeat(5, 50px)",
    gridGap: 5,
  },
}));

const Calculator: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <ButtonBlock />
    </div>
  );
};

export default PageWrapper(title, taskLink, Calculator);
