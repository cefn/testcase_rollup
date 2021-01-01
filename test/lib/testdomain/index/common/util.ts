export function normaliseSpelling(spelling: string) {
  return spelling.toLowerCase().replace(/[^a-z]/g, "-");
}
