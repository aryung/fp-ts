export type None = { _type: "none" };
export type Some<T> = { _type: "some"; value: T };
export type Option<T> = None | Some<T>;

export const none: None = { _type: "none" };
export const some = <T>(value: T): Some<T> => ({ _type: "some", value });

export function optionalCatch<T>(fn: () => T): Option<T> {
  try {
    return some(fn());
  } catch (err) {
    return none;
  }
}

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export async function optionResolve<T>(
  promise: Promise<T>,
): Promise<Option<T>> {
  // try {
  //   return some(await promise);
  // } catch (err) {
  //   return none;
  // }
  return promise.then((v) => some(v)).catch(() => none);
}

export function toOptional<I, O extends I>(fn: (i: I) => i is O) {
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

export const optionalDefined = toOptional(
  <T>(arg: T | undefined | null): arg is T => arg != null,
);

// unwrap
export function unwrap<T>(option: Option<T>): T {
  if (option._type === "none") {
    throw new Error("Cannot unwrap a Option");
  }
  return option.value;
}

export function unwrapOr<T>(option: Option<T>, defaultValue: T): T {
  if (option._type === "none") {
    return defaultValue;
  }
  return option.value;
}

export function unwrapExpect<T>(option: Option<T>, message: string): T {
  if (option._type === "none") {
    throw new Error(message);
  }
  return option.value;
}
