import { isNaN } from 'lodash-es';

export function isBlank(value) {
  return value === null || value === undefined || value.length === 0;
}

export function isNumber(value) {
  return (!isNaN(Number(value)) && !isNaN(value));
}

export function escapeSpecialCharacters(value) {

  if (value === undefined || value === null) {
    return value;
  }
  // Escape special characters to prevent XSS
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
