export function isPresent(obj) {
  return !isBlank(obj)
}

export function isBlank(value) {
  if (typeof value === 'undefined' || value === null) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
}
