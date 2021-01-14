import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";
import { Select, InputLabel, FormControl } from "@material-ui/core";

import Bin2Dec from "./Bin2Dec";
import BorderRadiusPreviewer from "./BorderRadiusPreviewer";
import Calculator from "./Calculator";
import ChristmasLights from "./ChristmasLights";
import CauseEffect from "./CauseEffect";
import CountdownTimer from "./CountdownTimer";
import CSV2JSON from "./CSV2JSON";
import DollarsToCents from "./DollarsToCents";

const DropDown: React.FC = () => {
  const [value, setValue] = React.useState("/");
  const history = useHistory();

  useEffect(() => {
    history.push(value);
  }, [value, history]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { value: selectValue } = event.target;
    setValue(selectValue as string);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="task_selector">Select the Task</InputLabel>
      <Select
        native
        value={value}
        inputProps={{
          name: "Select the Task",
          id: "task_selector",
        }}
        onChange={handleChange}
        className="task-selector"
      >
        <option aria-label="None" value="/" />
        <option value="/bin2dec">Bin2Dec</option>
        <option value="/borderRadiusPreviewer">BorderRadiusPreviewer</option>
        <option value="/calculator">Calculator</option>
        <option value="/christmasLights">ChristmasLights</option>
        <option value="/causeEffect">CauseEffect</option>
        <option value="/countdownTimer">CountdownTimer</option>
        <option value="/CSV2JSON">CSV2JSON</option>
        <option value="/dollarsToCents">DollarsToCents</option>
      </Select>
    </FormControl>
  );
};

const Menu = withRouter(DropDown);

const BeginnerProject: React.FC = () => {
  return (
    <Router>
      <div className="project-body">
        <Menu />
      </div>
      <Switch>
        <Route exact path="/" />
        <Route path="/bin2dec">
          <Bin2Dec />
        </Route>
        <Route path="/borderRadiusPreviewer">
          <BorderRadiusPreviewer />
        </Route>
        <Route path="/calculator">
          <Calculator />
        </Route>
        <Route path="/christmasLights">
          <ChristmasLights />
        </Route>
        <Route path="/causeEffect">
          <CauseEffect />
        </Route>
        <Route path="/countdownTimer">
          <CountdownTimer />
        </Route>
        <Route path="/CSV2JSON">
          <CSV2JSON />
        </Route>
        <Route path="/dollarsToCents">
          <DollarsToCents />
        </Route>
      </Switch>
    </Router>
  );
};

export default BeginnerProject;
