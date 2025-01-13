import { merge } from "./merge";
import { Indexed } from "./types";

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<unknown>(
    (acc, key) => ({
      [key]: acc,
    }),
    value,
  );
  return merge(object as Indexed, result as Indexed);
}

export default set;
