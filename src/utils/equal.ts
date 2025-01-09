export function deepEqual<T>(left: T, right: T): boolean {
  if (left === right) return true;

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() === right.getTime();
  }

  if (!left || !right || (typeof left !== "object" && typeof right !== "object")) {
    return left === right;
  }

  if (
    typeof left === "object" &&
    typeof right === "object" &&
    Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)
  ) {
    return false;
  }

  const leftObject = left as Record<string, unknown>;
  const rightObject = right as Record<string, unknown>;

  const leftKeys = Object.keys(leftObject);
  if (leftKeys.length !== Object.keys(rightObject).length) return false;

  for (const key of leftKeys) {
    if (!deepEqual(leftObject[key], rightObject[key])) {
      return false;
    }
  }

  return true;
}

export const isEqual = deepEqual;
