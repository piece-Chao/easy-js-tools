import { isString } from './dataTypes';

// 字符串首字符转大写
const toUpper = (str: string) => {
  if (!str || !isString(str)) return '';
  return str.trim().toUpperCase();
};

// 字符串首字符转大写
const toLower = (str: string) => {
  if (!str || !isString(str)) return '';
  return str.trim().toLowerCase();
};

// 字符串首字符转大写
const firstToUpper = (str: string) => {
  if (!str || !isString(str)) return '';
  return toLower(str.trim()).replace(str[0], str[0].toUpperCase());
};

export {
  firstToUpper,
  toUpper,
  toLower
};
