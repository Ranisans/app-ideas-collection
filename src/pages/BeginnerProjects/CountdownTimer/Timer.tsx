import React from "react";

export interface ITimer {
  title: string;
  date: Date;
}

const Timer: React.FC<ITimer> = ({ title, date }: ITimer) => {
  return (
    <div>
      <div>{title}</div>
    </div>
  );
};

export default Timer;
