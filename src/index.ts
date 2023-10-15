// import { optionalDefined, unwrapExpect, unwrapOr } from "./tool";
// // sample
// function getTimeDiff(arr: Array<Date>): number {
//   const start = optionalDefined(arr[0]);
//   const end = optionalDefined(arr[1]);
//
//   const startVall = unwrapExpect(start, "range must have a string").valueOf();
//   const endVal = unwrapOr(end, new Date()).valueOf();
//   return endVal - startVall;
// }
//
// console.log(getTimeDiff([new Date()]));

import { Some, map, getOrElse, Option } from './util';

// const demo1: Some<number> = {
//   type: 'None',
//   // value:1 ,
// };

const demo1: Option<number> = {
  type: 'None',
  // value: 1,
};

const demo2 = map(demo1, (v: number): number => v + 1);
// const demo3 = getOrElse(demo1, 0);

console.log({ demo1, demo2 });
