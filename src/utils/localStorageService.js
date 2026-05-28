/**
 * localStorageService provides get, set, remove, and clear methods
 * for localStorage under a unified namespace.
 */

const NAMESPACE = 'ma_';

/**
 * Sets a value in localStorage under the unified namespace.
 * @param {string} key - The key to set.
 * @param {*} value - The value to store (will be JSON-stringified).
 */
function set(key, value) {
  try {
    localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
  } catch (err) {
    // Fallback: Remove corrupted entry
    localStorage.removeItem(NAMESPACE + key);
  }
}

/**
 * Gets a value from localStorage under the unified namespace.
 * @param {string} key - The key to retrieve.
 * @returns {*} The parsed value, or null if not found or corrupted.
 */
function get(key) {
  try {
    const item = localStorage.getItem(NAMESPACE + key);
    if (item === null) return null;
    return JSON.parse(item);
  } catch (err) {
    // Corrupted entry: Remove and return null
    localStorage.removeItem(NAMESPACE + key);
    return null;
  }
}

/**
 * Removes a value from localStorage under the unified namespace.
 * @param {string} key - The key to remove.
 */
function remove(key) {
  localStorage.removeItem(NAMESPACE + key);
}

/**
 * Clears all keys in localStorage under the unified namespace.
 */
function clear() {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(NAMESPACE)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (err) {
    // Ignore errors
  }
}

const localStorageService = {
  set,
  get,
  remove,
  clear,
};

export default localStorageService;