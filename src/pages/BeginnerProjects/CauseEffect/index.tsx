import React, { useState } from "react";

import PageWrapper from "../../../components/PageWrapper";
import fakeData from "./fakeData.json";
import "./index.scss";
import InfoBlock, { IRecord } from "./InfoBlock";

const title = "Cause Effect";
const taskList =
  "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Cause-Effect-App.md";

const CauseEffect: React.FC = () => {
  const [record, setRecord] = useState<IRecord | null>(null);
  const handleClick = (id: number) => () => {
    setRecord(fakeData[id]);
  };

  return (
    <div className="cause_effect-container">
      <div className="cause_effect-name_list">
        {fakeData.map((element, index) => (
          <div
            role="button"
            key={`${element.name + index}`}
            onClick={handleClick(index)}
            onKeyPress={handleClick(index)}
            tabIndex={0}
          >
            {element.name}
          </div>
        ))}
      </div>
      <div className="cause_effect-info">
        {record && <InfoBlock data={record} />}
      </div>
    </div>
  );
};

export default PageWrapper(title, taskList, CauseEffect);
