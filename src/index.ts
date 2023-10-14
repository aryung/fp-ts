// function main() {
//   console.log("Hello World!");
// }
//
// main();

type None = { _type: "none" };
type Some<T> = { _type: "some"; value: T };
type Option<T> = None | Some<T>;

const none: None = { _type: "none" };
const some = <T>(value: T): Some<T> => ({ _type: "some", value });

function optionalCatch<T>(fn: () => T): Option<T> {
  try {
    return some(fn());
  } catch (err) {
    return none;
  }
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}

const maybeName = optionalCatch(() => greet("andrew"));

async function optionResolve<T>(promise: Promise<T>): Promise<Option<T>> {
  // try {
  //   return some(await promise);
  // } catch (err) {
  //   return none;
  // }
  return promise.then((v) => some(v)).catch(() => none);
}

function toOptional<I, O extends I>(fn: (i: I) => i is O) {
  return function (arg: I): Option<O> {
    // return fn(arg) ? some(arg) : none;
    try {
      if (fn(arg)) {
        return some(arg);
      }
      return none;
    } catch (err) {
      return none;
    }
  };
}

const optionalDefined = toOptional(
  <T>(arg: T | undefined | null): arg is T => arg != null,
);

// unwrap
function unwrap<T>(option: Option<T>): T {
  if (option._type === "none") {
    throw new Error("Cannot unwrap a Option");
  }
  return option.value;
}

function unwrapOr<T>(option: Option<T>, defaultValue: T): T {
  if (option._type === "none") {
    return defaultValue;
  }
  return option.value;
}

function unwrapExpect<T>(option: Option<T>, message: string): T {
  if (option._type === "none") {
    throw new Error(message);
  }
  return option.value;
}

// sample
function getTimeDiff(arr: Array<Date>): number {
  const start = optionalDefined(arr[0]);
  const end = optionalDefined(arr[1]);

  const startVall = unwrapExpect(start, "range must have a string").valueOf();
  const endVal = unwrapOr(end, new Date()).valueOf();
  return endVal - startVall;
}

console.log(getTimeDiff([new Date()]));
