import React from "react";
import { Container, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type TPageWrapper = (
  taskName: string,
  taskLink: string,
  Page: React.FC
) => React.FC;

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
    gridGap: 10,
  },
  title: {
    maxWidth: 450,
    fontWeight: 600,
    margin: "auto",
  },
  pageContainer: {
    boxSizing: "border-box",
    height: "100%",
    overflowY: "auto",
    paddingTop: 50,
  },
}));

const PageWrapper: TPageWrapper = (taskName, taskLink, Page) => {
  const TaskPage: React.FC = () => {
    const styles = useStyles();

    return (
      <Container className={styles.container}>
        <Typography variant="h2" className={styles.title}>
          {taskName}
        </Typography>
        <Link href={taskLink}>Link to task</Link>
        <div className={styles.pageContainer}>
          <Page />
        </div>
      </Container>
    );
  };

  return TaskPage;
};

export default PageWrapper;
