import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import PageWrapper from "../../../components/PageWrapper";
import Timer, { ITimer } from "./Timer";

import "./index.scss";

const title = "Countdown Timer";
const taskLink =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Countdown-Timer-App.md";

const CountdownTimer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [name, setName] = useState("");
  const [timers, setTimers] = useState<ITimer[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date || new Date());
  };

  const handleSetTimer = () => {
    if (!name) return;
    setTimers([
      ...timers,
      {
        title: name,
        date: selectedDate,
      },
    ]);
  };

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
      <div>
        {timers.map((timerData) => (
          <Timer
            key={`${timerData.title}-${timerData.date}`}
            title={timerData.title}
            date={timerData.date}
          />
        ))}
      </div>
    </div>
  );
};

export default PageWrapper(title, taskLink, CountdownTimer);
