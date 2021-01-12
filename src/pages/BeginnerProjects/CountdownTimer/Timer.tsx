import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

export interface ITimer {
  title: string;
  date: Date;
}

export interface ITimerExt extends ITimer {
  currentDate: Date;
}

interface IDifference {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const secondInMinute = 60;
const secondInHour = 60 * secondInMinute;
const secondInDay = secondInHour * 24;

const dateDiff = (currentDate: Date, dateEnd: Date): IDifference | null => {
  if (currentDate >= dateEnd) return null;
  let difference = Math.abs(currentDate.valueOf() - dateEnd.valueOf()) / 1000;

  const days = Math.floor(difference / secondInDay);
  difference -= days * secondInDay;
  const hours = Math.floor(difference / secondInHour);
  difference -= hours * secondInHour;
  const minutes = Math.floor(difference / secondInMinute);
  const seconds = Math.floor(difference - minutes * secondInMinute);

  return { days, hours, minutes, seconds };
};

const Timer: React.FC<ITimerExt> = ({
  title,
  date,
  currentDate,
}: ITimerExt) => {
  const [data, setData] = useState<IDifference | null>(null);

  useEffect(() => {
    const diff = dateDiff(currentDate, date);
    setData(diff);
  }, [date, currentDate]);

  return (
    <div>
      <p>{title}</p>
      {data ? (
        <div>
          <TextField
            className="countdown_timer-field"
            inputProps={{
              readOnly: true,
            }}
            label="Days"
            value={data.days}
          />
          <TextField
            className="countdown_timer-field"
            inputProps={{
              readOnly: true,
            }}
            label="Hours"
            value={data.hours}
          />
          <TextField
            className="countdown_timer-field"
            inputProps={{
              readOnly: true,
            }}
            label="Minutes"
            value={data.minutes}
          />
          <TextField
            className="countdown_timer-field"
            inputProps={{
              readOnly: true,
            }}
            label="Seconds"
            value={data.seconds}
          />
        </div>
      ) : (
        <p> Finished! </p>
      )}
    </div>
  );
};

export default Timer;
