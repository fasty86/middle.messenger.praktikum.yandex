export function isEqual(a: object, b: object): boolean {
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    throw new Error("Both arguments must be non-null objects");
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }

    const valueA = (a as never)[key];
    const valueB = (b as never)[key];
    const areObjects = typeof valueA === "object" && valueA !== null && typeof valueB === "object" && valueB !== null;
    if (areObjects && !isEqual(valueA, valueB)) {
      return false;
    }
    if (!areObjects && valueA !== valueB) {
      return false;
    }
  }
  return true;
}
