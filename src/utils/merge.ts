export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (typeof rhs[p] === "object" && rhs[p] !== null && rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (_e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export type Indexed<T = unknown> = {
  [key in string]: T;
};
