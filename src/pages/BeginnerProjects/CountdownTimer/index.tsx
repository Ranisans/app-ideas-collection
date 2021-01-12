import React, { useEffect, useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField, Snackbar } from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import PageWrapper from "../../../components/PageWrapper";
import Timer, { ITimer } from "./Timer";

import "./index.scss";

const title = "Countdown Timer";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Countdown-Timer-App.md";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CountdownTimer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [name, setName] = useState("");
  const [timers, setTimers] = useState<ITimer[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date || new Date());
  };

  const handleSetTimer = () => {
    if (!name) return;
    if (selectedDate <= currentDate) {
      setOpen(true);
      return;
    }
    setTimers([
      ...timers,
      {
        title: name,
        date: selectedDate,
      },
    ]);
    setName("");
    setSelectedDate(new Date());
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const increaseDate = () => {
      setCurrentDate(new Date());
    };
    const interval = setInterval(increaseDate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="countdown_timer-container">
      <div className="countdown_timer-set_timer_block">
        <TextField
          label="Name"
          value={name}
          onChange={handleTitleChange}
          error={!name}
          helperText={!name && "Name is needed"}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            variant="inline"
            label="Date Time to End"
            format="dd/MM/yyyy  HH:mm"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
          />
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSetTimer}
          className="countdown_timer-button"
        >
          Start
        </Button>
      </div>
      <div className="countdown_timer-timers_block">
        {timers.map((timerData, index) => (
          <Timer
            // eslint-disable-next-line react/no-array-index-key
            key={`${timerData.title}-${timerData.date}-${index}`}
            title={timerData.title}
            date={timerData.date}
            currentDate={currentDate}
          />
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Wrong Date!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageWrapper(title, taskLink, CountdownTimer);
