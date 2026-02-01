/** Save a value to localStorage (objects will be stringified) */
export function setItem(key, value) {
  try {
    const isObject = typeof value === "object";
    const data = isObject ? JSON.stringify(value) : value;
    window.localStorage.setItem(key, data);
  } catch (err) {
    console.error(`setItem error [${key}]:`, err);
  }
}

/** Get a value from localStorage (tries to parse JSON, falls back to raw string) */
export function getItem(key) {
  try {
    const data = window.localStorage.getItem(key);
    if (data === null) return undefined;

    try {
      return JSON.parse(data);
    } catch {
      return data; // not JSON, return as-is (likely a plain string)
    }
  } catch (err) {
    console.error(`getItem error [${key}]:`, err);
    return undefined;
  }
}

/** Remove an item from localStorage */
export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error(`removeItem error [${key}]:`, err);
  }
}
