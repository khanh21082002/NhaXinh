import replace from 'lodash/replace';
import trim from 'lodash/trim';
import { Dimensions, Platform, PixelRatio } from 'react-native';

export const initials = (str, cap = true) => {
  if (!str) return '';

  const tmp = str.split(' ');
  const first = tmp[0][0];
  let last = '';
  if (tmp.length > 1) {
    last = tmp[tmp.length - 1][0];
  }
  let ret = `${first}${last}`;
  if (cap) ret = ret.toUpperCase();
  return ret;
};

export const randColor = () => {
  const hex = '0123456789ABCDEF'.split('');
  let color = '#';
  let i = 0;
  for (i; i < 6; i += 1) {
    color += hex[Math.floor(Math.random(Date.now()) * 16)];
  }
  return color;
};

export const truncateString = (str, len) => {
  if (!str) return '';

  if (!str || str.length <= len) {
    return str;
  }

  const ret = str.substring(0, len);
  return `${ret} ...`;
};

export const wordBreadcrumb = (string, length, addTralingDots = true) => {
  if (!string) {
    return '';
  }
  const words = string.split(' ');

  if (words.length <= length) {
    return string;
  }
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += `${words[i]} `;
  }
  return addTralingDots ? `${result} ...` : result;
};

export const getBooleanValueOfString = (string) => {
  if (string === 'true') {
    return true;
  }
  if (string === 'false') {
    return false;
  }
  return string;
};
export const getMatches = (string, regex, index = 1) => {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    matches.push(match[index]);
    match = regex.exec(string);
  }
  return matches;
};

// this is used in case you cannot sure what inside subString, otherwise use String.prototype.replace(regex, newSubString) instead
export const replaceAll = (originalString, subString, newSubString) => {
  if (
    typeof originalString !== 'string' ||
    typeof subString !== 'string' ||
    typeof newSubString !== 'string'
  ) {
    throw new Error(
      `both originalString, subString, and newSubString must have type string, you give ${originalString}, ${subString}, ${newSubString}`,
    );
  }
  let result = originalString;
  while (true) {
    const before = result;
    result = result.replace(subString, newSubString);
    if (result === before) break;
  }
  return result;
};

export function arrayToString(array, key) {
  let res = '';
  if (!array) return res;

  array.forEach((value) => {
    if (typeof value === 'string') {
      res += `${value}, `;
    } else if (typeof value === 'object' && value.hasOwnProperty(key)) {
      res += `${value[key]}, `;
    }
  });
  return res.length >= 2 ? res.substring(0, res.length - 2) : res;
}

export const stringifyFromValue = (value) => {
  let string = '';
  if (!value) {
    return string;
  }
  const type = typeof value;
  if (!['array', 'object'].includes(type)) {
    return t1(value);
  }

  if (Array.isArray(value)) {
    value.forEach((val, index) => {
      if (Array.isArray(val)) {
        string += '[';
      } else if (typeof val === 'object') {
        string += '{';
      }
      string += stringifyFromValue(val);
      if (Array.isArray(val)) {
        string += ']';
      } else if (typeof val === 'object') {
        string += '}';
      }
      if (value.length > index + 1) {
        string += ', ';
      }
    });
  } else if (type === 'object') {
    Object.keys(value).forEach((key, index) => {
      if (Array.isArray(value[key])) {
        string += '[';
      } else if (typeof value[key] === 'object') {
        string += '{';
      }
      string += stringifyFromValue(value[key]);
      if (Array.isArray(value[key])) {
        string += ']';
      } else if (typeof value[key] === 'object') {
        string += '}';
      }
      if (value.length > index + 1) {
        string += ', ';
      }
    });
  }
  return string;
};

export const stripHTML = (html) => {
  if (!html) return '';

  return replace(html, /<[^>]*>?/gm, '');
};

export const stripAndTrimHtml = (text) => {
  if (!text) return '';

  return trim(stripHTML(text));
};

export const isEmailString = (str) =>
  /^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+\.(.[a-zA-Z0-9-]+)+$/.test(
    str,
  );

export const isVNPhoneNumber = (phone) =>
  /((09|03|05|07|08)+([0-9]){8})\b/.test(phone);

export const getYoutubeId = (url) => {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
};

export function normalizeSize(size, decreaseNumber = 2) {
  if (PixelRatio.get() <= 2) {
    return size - decreaseNumber;
  } else {
    return size;
  }
}