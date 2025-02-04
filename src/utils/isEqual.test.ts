import { isEqual } from "./isEqual";

describe("isEqual", () => {
  it("должно возвращать true для двух струтурно одинаковых объектов", () => {
    const obj1 = { a: { b: 2, c: { d: 4 } } };
    const obj2 = { a: { b: 2, c: { d: 4 } } };

    const result = isEqual(obj1, obj2);

    expect(result).toBe(true);
  });
  it("должно возвращать true для двух струтурно одинаковых объектов с массивами в качестве", () => {
    const objA = { arr: [1, 2, 3] };
    const objB = { arr: [1, 2, 3] };

    const result = isEqual(objA, objB);

    expect(result).toBe(true);
  });
});
