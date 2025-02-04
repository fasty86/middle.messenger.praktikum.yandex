import { merge } from "./merge";

describe("merge", () => {
  it("должно объединять два объекта с непересекающимися ключами", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };

    const result = merge(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
  it("должно объединять два объекта с пересекающимися ключами", () => {
    const lhs = { a: 1, b: 2 };
    const rhs = { b: 3, c: 4 };

    const result = merge(lhs, rhs);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });
});
