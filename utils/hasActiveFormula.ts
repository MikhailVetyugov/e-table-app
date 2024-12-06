const SUM_RE = /=\s*SUM\((?!.*\))/;

export function hasActiveFormula(value: string) {
  return SUM_RE.test(value);
}
