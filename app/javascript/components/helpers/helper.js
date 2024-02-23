export function isBlank(obj) {
  return typeof obj === 'undefined' || obj === null || (typeof obj === 'object' && Object.keys(obj).length === 0);
}

export function isPresent(obj) {
  return typeof obj !== 'undefined' && obj !== null && !(typeof obj === 'object' && Object.keys(obj).length === 0);
}

export function isEmpty(value) {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return isBlank(value);
}
