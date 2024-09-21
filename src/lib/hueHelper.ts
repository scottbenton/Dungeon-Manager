export function stringToHue(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
  }
  const hue = hash % 360;
  return hue < 0 ? hue + 360 : hue;
}

export function getHSLFromString(str: string, s: number, l: number): string {
  const hue = stringToHue(str);
  return `hsl(${hue}, ${s}%, ${l}%)`;
}
