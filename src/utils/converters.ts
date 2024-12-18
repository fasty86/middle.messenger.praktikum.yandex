export function capitalize(str: unknown) {
  const newStr = new String(str);
  if (newStr instanceof String && newStr !== undefined) {
    const capitalized = newStr.charAt(0).toUpperCase() + newStr.slice(1);
    return capitalized;
  }
  return str;
}
