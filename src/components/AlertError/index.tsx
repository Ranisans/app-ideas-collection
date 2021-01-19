import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface IAlert {
  open: boolean;
  handleClose: (event?: React.SyntheticEvent, reason?: string) => void;
  text: string;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertError: React.FC<IAlert> = ({ open, handleClose, text }: IAlert) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertError;
