import moment from 'moment';
import 'moment-timezone';

export function toUpperCase(value) {
  return value && typeof value === 'string' && value.toUpperCase();
}

export function getDateFormat(locale) {
  return locale === 'en' ? 'mm/dd/yy' : 'dd/mm/yy';
}

export function convertValueToDate(timestamp) {
  return timestamp && (typeof timestamp === 'number' || typeof timestamp === 'string') ? moment(timestamp).toDate() : null;
}
