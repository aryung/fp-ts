export type Some<T> = {
  type: "Some";
  value: T;
};

export type None = {
  type: "None";
};

export type Option<T> = Some<T> | None;

export type Ok<T> = {
  type: "Ok";
  value: T;
};

export type Err<E> = {
  type: "Err";
  error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function isSome<T>(option: Option<T>): option is Some<T> {
  return option.type === "Some";
}

export function isNone<T>(option: Option<T>): option is None {
  return option.type === "None";
}

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.type === "Ok";
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.type === "Err";
}

export function map<T, U>(option: Option<T>, f: (value: T) => U): Option<U> {
  if (isSome(option)) {
    return { type: "Some", value: f(option.value) };
  } else {
    return { type: "None" };
  }
}

export function flatMap<T, U>(
  option: Option<T>,
  f: (value: T) => Option<U>,
): Option<U> {
  if (isSome(option)) {
    return f(option.value);
  } else {
    return { type: "None" };
  }
}

export function getOrElse<T>(option: Option<T>, defaultValue: T): T {
  if (isSome(option)) {
    return option.value;
  } else {
    return defaultValue;
  }
}

export function orElse<T>(
  option: Option<T>,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    return option;
  } else {
    return defaultValue;
  }
}

export function filter<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return { type: "None" };
    }
  } else {
    return { type: "None" };
  }
}

export function forEach<T>(option: Option<T>, f: (value: T) => void): void {
  if (isSome(option)) {
    f(option.value);
  }
}

export function match<T, U>(
  option: Option<T>,
  some: (value: T) => U,
  none: () => U,
): U {
  if (isSome(option)) {
    return some(option.value);
  } else {
    return none();
  }
}

export function toList<T>(option: Option<T>): T[] {
  if (isSome(option)) {
    return [option.value];
  } else {
    return [];
  }
}

export function toNullable<T>(option: Option<T>): T | null {
  if (isSome(option)) {
    return option.value;
  } else {
    return null;
  }
}

export function toUndefined<T>(option: Option<T>): T | undefined {
  if (isSome(option)) {
    return option.value;
  } else {
    return undefined;
  }
}

export function toResult<T, E>(option: Option<T>, error: E): Result<T, E> {
  if (isSome(option)) {
    return { type: "Ok", value: option.value };
  } else {
    return { type: "Err", error };
  }
}

export function toPromise<T>(option: Option<T>): Promise<T> {
  if (isSome(option)) {
    return Promise.resolve(option.value);
  } else {
    return Promise.reject();
  }
}

export function fromNullable<T>(value: T | null): Option<T> {
  if (value === null) {
    return { type: "None" };
  } else {
    return { type: "Some", value };
  }
}

export function fromUndefined<T>(value: T | undefined): Option<T> {
  if (value === undefined) {
    return { type: "None" };
  } else {
    return { type: "Some", value };
  }
}

export function fromResult<T, E>(result: Result<T, E>): Option<T> {
  if (isOk(result)) {
    return { type: "Some", value: result.value };
  } else {
    return { type: "None" };
  }
}

// export function fromPromise<T>(promise: Promise<T>): Promise<Option<T>> {
//   return promise
//     .then((value) => ({ type: "Some", value }))
//     .catch(() => ({ type: "None" }));
// }

export function fromPredicate<T>(
  value: T,
  predicate: (value: T) => boolean,
): Option<T> {
  if (predicate(value)) {
    return { type: "Some", value };
  } else {
    return { type: "None" };
  }
}

export function fromOption<T>(option: Option<T>, defaultValue: T): T {
  if (isSome(option)) {
    return option.value;
  } else {
    return defaultValue;
  }
}

export function fromOptionLazy<T>(option: Option<T>, defaultValue: () => T): T {
  if (isSome(option)) {
    return option.value;
  } else {
    return defaultValue();
  }
}

export function fromOptionNullable<T>(option: Option<T>): T | null {
  if (isSome(option)) {
    return option.value;
  } else {
    return null;
  }
}

export function fromOptionUndefined<T>(option: Option<T>): T | undefined {
  if (isSome(option)) {
    return option.value;
  } else {
    return undefined;
  }
}

export function fromOptionResult<T, E>(
  option: Option<T>,
  error: E,
): Result<T, E> {
  if (isSome(option)) {
    return { type: "Ok", value: option.value };
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionPromise<T>(option: Option<T>): Promise<T> {
  if (isSome(option)) {
    return Promise.resolve(option.value);
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicate<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): boolean {
  if (isSome(option)) {
    return predicate(option.value);
  } else {
    return false;
  }
}

export function fromOptionOption<T>(
  option: Option<T>,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    return option;
  } else {
    return defaultValue;
  }
}

export function fromOptionOptionLazy<T>(
  option: Option<T>,
  defaultValue: () => Option<T>,
): Option<T> {
  if (isSome(option)) {
    return option;
  } else {
    return defaultValue();
  }
}

export function fromOptionOptionNullable<T>(option: Option<T>): T | null {
  if (isSome(option)) {
    return option.value;
  } else {
    return null;
  }
}

export function fromOptionOptionUndefined<T>(option: Option<T>): T | undefined {
  if (isSome(option)) {
    return option.value;
  } else {
    return undefined;
  }
}

export function fromOptionOptionResult<T, E>(
  option: Option<T>,
  error: E,
): Result<T, E> {
  if (isSome(option)) {
    return { type: "Ok", value: option.value };
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionOptionPromise<T>(option: Option<T>): Promise<T> {
  if (isSome(option)) {
    return Promise.resolve(option.value);
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicateOption<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return { type: "None" };
    }
  } else {
    return { type: "None" };
  }
}

export function fromOptionPredicateOptionLazy<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: () => Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue();
    }
  } else {
    return defaultValue();
  }
}

export function fromOptionPredicateOptionNullable<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | null {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function fromOptionPredicateOptionUndefined<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | undefined {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function fromOptionPredicateOptionResult<T, E>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  error: E,
): Result<T, E> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return { type: "Ok", value: option.value };
    } else {
      return { type: "Err", error };
    }
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionPredicateOptionPromise<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Promise<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return Promise.resolve(option.value);
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicateOptionPredicate<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}

export function fromOptionPredicateOptionPredicateLazy<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: () => Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue();
    }
  } else {
    return defaultValue();
  }
}

export function fromOptionPredicateOptionPredicateNullable<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | null {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function fromOptionPredicateOptionPredicateUndefined<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | undefined {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function fromOptionPredicateOptionPredicateResult<T, E>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  error: E,
): Result<T, E> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return { type: "Ok", value: option.value };
    } else {
      return { type: "Err", error };
    }
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionPredicateOptionPredicatePromise<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Promise<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return Promise.resolve(option.value);
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicateOptionPredicatePredicate<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}

export function fromOptionPredicateOptionPredicatePredicateLazy<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: () => Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue();
    }
  } else {
    return defaultValue();
  }
}

export function fromOptionPredicateOptionPredicatePredicateNullable<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | null {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function fromOptionPredicateOptionPredicatePredicateUndefined<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | undefined {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function fromOptionPredicateOptionPredicatePredicateResult<T, E>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  error: E,
): Result<T, E> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return { type: "Ok", value: option.value };
    } else {
      return { type: "Err", error };
    }
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionPredicateOptionPredicatePredicatePromise<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Promise<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return Promise.resolve(option.value);
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicate<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicateLazy<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: () => Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue();
    }
  } else {
    return defaultValue();
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicateNullable<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): T | null {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicateUndefined<
  T,
>(option: Option<T>, predicate: (value: T) => boolean): T | undefined {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicateResult<
  T,
  E,
>(option: Option<T>, predicate: (value: T) => boolean, error: E): Result<T, E> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return { type: "Ok", value: option.value };
    } else {
      return { type: "Err", error };
    }
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePromise<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Promise<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return Promise.resolve(option.value);
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicate<
  T,
>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicateLazy<
  T,
>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: () => Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue();
    }
  } else {
    return defaultValue();
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicateNullable<
  T,
>(option: Option<T>, predicate: (value: T) => boolean): T | null {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicateUndefined<
  T,
>(option: Option<T>, predicate: (value: T) => boolean): T | undefined {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option.value;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicateResult<
  T,
  E,
>(option: Option<T>, predicate: (value: T) => boolean, error: E): Result<T, E> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return { type: "Ok", value: option.value };
    } else {
      return { type: "Err", error };
    }
  } else {
    return { type: "Err", error };
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicatePromise<
  T,
>(option: Option<T>, predicate: (value: T) => boolean): Promise<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return Promise.resolve(option.value);
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.reject();
  }
}

export function fromOptionPredicateOptionPredicatePredicatePredicatePredicatePredicate<
  T,
>(
  option: Option<T>,
  predicate: (value: T) => boolean,
  defaultValue: Option<T>,
): Option<T> {
  if (isSome(option)) {
    if (predicate(option.value)) {
      return option;
    } else {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}
