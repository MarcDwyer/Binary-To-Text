export function checkIfValidBinary(text: string) {
  const validChars = new Set(["0", "1", " "]);

  for (const char of text) {
    if (!validChars.has(char)) {
      return false;
    }
  }
  return true;
}
