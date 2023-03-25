export const colours = ["#345321", "#888888", "#000011"];

function newHashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function generateColour(name = "Johnson") {
  const hashValue = newHashCode(name);
  const c = (hashValue & 0x00ffffff).toString(16).toUpperCase();
  const newColor = `#${c}`;
  return newColor.length < 7 ? `${newColor}1` : newColor;
}