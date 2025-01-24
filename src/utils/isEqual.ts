// type PlainObject<T = unknown> = {
//   [k in string]: T;
// };

// export function isEqual(lhs: PlainObject, rhs: PlainObject) {
//   // Сравнение количества ключей объектов и массивов
//   if (Object.keys(lhs).length !== Object.keys(rhs).length) {
//     return false;
//   }

//   for (const [key, value] of Object.entries(lhs)) {
//     const rightValue = rhs[key];
//     if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
//       // Здесь value и rightValue может быть только массивом или объектом
//       // И TypeScript это обрабатывает
//       if (isEqual(value, rightValue)) {
//         continue;
//       }
//       return false;
//     }

//     if (value !== rightValue) {
//       return false;
//     }
//   }

//   return true;
// }
// function isArray(value: unknown): value is [] {
//   return Array.isArray(value);
// }
// function isArrayOrObject(value: unknown): value is [] | PlainObject {
//   return isPlainObject(value) || isArray(value);
// }
// function isPlainObject(value: unknown): value is PlainObject {
//   return (
//     typeof value === "object" &&
//     value !== null &&
//     value.constructor === Object &&
//     Object.prototype.toString.call(value) === "[object Object]"
//   );
// }

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
