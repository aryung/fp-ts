import { optionalDefined, unwrapExpect, unwrapOr } from "./tool";
// sample
function getTimeDiff(arr: Array<Date>): number {
  const start = optionalDefined(arr[0]);
  const end = optionalDefined(arr[1]);

  const startVall = unwrapExpect(start, "range must have a string").valueOf();
  const endVal = unwrapOr(end, new Date()).valueOf();
  return endVal - startVall;
}

console.log(getTimeDiff([new Date()]));
