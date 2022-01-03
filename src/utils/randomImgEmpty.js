import {dataMenu} from '../actions/Data';

export default () => {
  let value = getRandomInt(dataMenu?.length);
  return dataMenu[value]?.img;
};

const getRandomInt = max => {
  return Math.floor(Math.random() * max);
};
