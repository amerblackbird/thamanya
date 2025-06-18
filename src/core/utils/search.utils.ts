export function toTsVector(text: string) {
  return `to_tsvector('english', '${text.replace(/'/g, "''")}')`;
}