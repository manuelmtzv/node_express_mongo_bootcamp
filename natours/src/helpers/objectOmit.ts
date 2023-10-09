export default function objectOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Partial<T>;
}
