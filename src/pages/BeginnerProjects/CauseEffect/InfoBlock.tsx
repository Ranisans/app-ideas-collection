import React from "react";

export interface IRecord {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  telephone: string;
  birthday: string;
}

interface IInfoBlock {
  data: IRecord;
}

const InfoBlock: React.FC<IInfoBlock> = (props: IInfoBlock) => {
  const {
    name,
    street,
    city,
    state,
    country,
    telephone,
    birthday,
    // eslint-disable-next-line react/destructuring-assignment
  } = props.data;
  return (
    <>
      <p className="cause_effect-info-name">Name : {name}</p>
      <p>Street : {street}</p>
      <p>City : {city}</p>
      <p>State : {state}</p>
      <p>Country : {country}</p>
      <p>Telephone : {telephone}</p>
      <p>Birthday : {birthday}</p>
    </>
  );
};

export default InfoBlock;
