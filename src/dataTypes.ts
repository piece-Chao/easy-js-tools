import { firstToUpper } from './helper';

enum ObjCheckType {
  'soft',
  'normal',
  'strict'
}

// 判断是否是string类型
const isString = (str: string) => {
  return typeof str === 'string';
};

// 判断是否是number类型
const isNumber = (num: number) => {
  return typeof num === 'number';
};

// 判断是否是boolean类型
const isBoolean = (bol: boolean) => {
  return typeof bol === 'boolean';
};

// 判断是否是symbol类型
const isSymbol = (symbol: symbol) => {
  return typeof symbol === 'symbol';
};

// 判断是否是undefined类型
const isUndefined = (undef: undefined) => {
  return typeof undef === 'undefined';
};

// 判断是否是undefined类型
const isNull = (_null: null) => {
  return _null === null;
};

// 判断是否是数组
const isArray = (list: Array<any>) => {
  return Array.isArray(list);
};

// 判断是否是函数
const isFunction = (func: Function) => {
  return typeof func === 'function';
};

/**
 * 万能检测方法
 * @param value 要检测的值
 * @param type 类型
 */
const getType = (value: any, type: string) => {
  if (!type || !isString(type)) return new Error('请传递正确的类型');
  return Object.prototype.toString.call(value) === `[object ${firstToUpper(type)}]`;
};


/**
 * 判断是否是对象
 * 0 null 也视为 object 类型
 * 1 排除 null
 * 2 排除 js 内置对象 Array,Date,Error 和 null
 * @param obj 要检测的对象
 * @param num 模式 0 松散，1 正常，2 严格
 */
const isObject = (obj: Record<string, any>, num = 0) => {
  switch(ObjCheckType[num]) {
  case 'soft':
    return typeof obj === 'object';
  case 'normal':
    return typeof obj === 'object' && obj !== null;
  case 'strict':
    return getType(obj, 'Object');
  }
};

// 判断是否是json
const isJson = (_json: string) => {
  if (typeof _json == 'string') {
    try {
      const obj = JSON.parse(_json);
      if (isObject(obj, 1)){
        return true;
      } else {
        return false;
      }
    } catch(e) {
      return false;
    }
  }
};

export {
  isString,
  isNumber,
  isBoolean,
  isSymbol,
  isUndefined,
  isNull,
  isArray,
  isFunction,
  isObject,
  getType,
  isJson
}
