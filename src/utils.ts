export function getSafe<T>(fn: () => T, def: T): T {
  try {
    const res = fn();
    return res ? res : def;
  } catch (error) {
    return def;
  }
}
