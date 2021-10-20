(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["easy-js-tools"] = factory());
})(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    // 字符串首字符转大写
    var toUpper = function (str) {
        if (!str || !isString(str))
            return '';
        return str.trim().toUpperCase();
    };
    // 字符串首字符转大写
    var toLower = function (str) {
        if (!str || !isString(str))
            return '';
        return str.trim().toLowerCase();
    };
    // 字符串首字符转大写
    var firstToUpper = function (str) {
        if (!str || !isString(str))
            return '';
        return toLower(str.trim()).replace(str[0], str[0].toUpperCase());
    };

    var helper = /*#__PURE__*/Object.freeze({
        __proto__: null,
        firstToUpper: firstToUpper,
        toUpper: toUpper,
        toLower: toLower
    });

    var ObjCheckType;
    (function (ObjCheckType) {
        ObjCheckType[ObjCheckType["soft"] = 0] = "soft";
        ObjCheckType[ObjCheckType["normal"] = 1] = "normal";
        ObjCheckType[ObjCheckType["strict"] = 2] = "strict";
    })(ObjCheckType || (ObjCheckType = {}));
    // 判断是否是string类型
    var isString = function (str) {
        return typeof str === 'string';
    };
    // 判断是否是number类型
    var isNumber = function (num) {
        return typeof num === 'number';
    };
    // 判断是否是boolean类型
    var isBoolean = function (bol) {
        return typeof bol === 'boolean';
    };
    // 判断是否是symbol类型
    var isSymbol = function (symbol) {
        return typeof symbol === 'symbol';
    };
    // 判断是否是undefined类型
    var isUndefined = function (undef) {
        return typeof undef === 'undefined';
    };
    // 判断是否是undefined类型
    var isNull = function (_null) {
        return _null === null;
    };
    // 判断是否是数组
    var isArray = function (list) {
        return Array.isArray(list);
    };
    // 判断是否是函数
    var isFunction = function (func) {
        return typeof func === 'function';
    };
    /**
     * 万能检测方法
     * @param value 要检测的值
     * @param type 类型
     */
    var getType = function (value, type) {
        if (!type || !isString(type))
            return new Error('请传递正确的类型');
        return Object.prototype.toString.call(value) === "[object " + firstToUpper(type) + "]";
    };
    /**
     * 判断是否是对象
     * 0 null 也视为 object 类型
     * 1 排除 null
     * 2 排除 js 内置对象 Array,Date,Error 和 null
     * @param obj 要检测的对象
     * @param num 模式 0 松散，1 正常，2 严格
     */
    var isObject = function (obj, num) {
        if (num === void 0) { num = 0; }
        switch (ObjCheckType[num]) {
            case 'soft':
                return typeof obj === 'object';
            case 'normal':
                return typeof obj === 'object' && obj !== null;
            case 'strict':
                return getType(obj, 'Object');
        }
    };
    // 判断是否是json
    var isJson = function (_json) {
        if (typeof _json == 'string') {
            try {
                var obj = JSON.parse(_json);
                if (isObject(obj, 1)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        }
    };

    var types = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isString: isString,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isSymbol: isSymbol,
        isUndefined: isUndefined,
        isNull: isNull,
        isArray: isArray,
        isFunction: isFunction,
        isObject: isObject,
        getType: getType,
        isJson: isJson
    });

    var checkUrl = function (url) {
        var regExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; // eslint-disable-line
        return regExp.test(url);
    };
    //检查号码是否符合规范，包括长度，类型  
    var isCardNo = function (IdCard) {
        //这个代码表示身份证可以为空
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        return !reg.test(IdCard) || !!IdCard;
    };
    // 身份证位数验证，返回性别，年龄
    var getIdInfo = function (IdCard) {
        if (!isCardNo(IdCard))
            return false;
        var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        if (reg.test(IdCard)) {
            var sex = void 0;
            if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
                sex = '1';
            }
            else {
                sex = '0';
            }
            var ageDate = new Date();
            var month = ageDate.getMonth() + 1;
            var day = ageDate.getDate();
            var age = ageDate.getFullYear() - Number(IdCard.substring(6, 10)) - 1;
            if (Number(IdCard.substring(10, 12)) < month || (Number(IdCard.substring(10, 12)) === month && Number(IdCard.substring(12, 14)) <= day)) {
                age++;
            }
            if (age <= 0) {
                age = 1;
            }
            return { sex: sex, age: age };
        }
    };
    // 身份证有效性验证
    var checkIdNumber = function (card) {
        var city = {
            11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
            21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
            33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
            42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
            51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
            63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
        };
        //取身份证前两位,校验省份  
        var checkProvince = function (IdCard) {
            var province = Number(IdCard.substr(0, 2));
            return city[province];
        };
        //检查生日是否正确  
        var checkBirthday = function (IdCard) {
            var len = IdCard.length;
            //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
            //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
            var regExp = len === 15 ? /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/ : /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = IdCard.match(regExp);
            var year = len === 15 ? "19" + arr_data[2] : arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year + "'/'" + month + "'/'" + day);
            return verifyBirthday(year, month, day, birthday);
        };
        //校验日期  
        var verifyBirthday = function (year, month, day, birthday) {
            var now = new Date();
            var now_year = now.getFullYear();
            //年月日是否合理  
            if (birthday.getFullYear() === +year && (birthday.getMonth() + 1) === +month && birthday.getDate() === +day) {
                //判断年份的范围（1岁到120岁之间)  
                var time = now_year - Number(year);
                if (time >= 1 && time <= 120) {
                    return true;
                }
                return false;
            }
            return false;
        };
        //校验位的检测  
        var checkParity = function (IdCard) {
            //15位转18位  
            var card = changeFifteenToEighteen(IdCard);
            var len = card.length;
            if (len === 18) {
                var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                var cardTemp = 0, i = void 0;
                for (i = 0; i < 17; i++) {
                    cardTemp += Number(card.substr(i, 1)) * arrInt[i];
                }
                var value = arrCh[cardTemp % 11];
                return value === card.substr(17, 1);
            }
            return false;
        };
        //15位转18位身份证号  
        var changeFifteenToEighteen = function (IdCard) {
            if (IdCard.length === 15) {
                var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                var cardTemp = 0, i = void 0;
                IdCard = IdCard.substr(0, 6) + '19' + IdCard.substr(6, IdCard.length - 6);
                for (i = 0; i < 17; i++) {
                    cardTemp += Number(IdCard.substr(i, 1)) * arrInt[i];
                }
                IdCard += arrCh[cardTemp % 11];
                return IdCard;
            }
            return IdCard;
        };
        var IdCard = card;
        //检查省份、校验生日、检验位的检测
        if (isCardNo(IdCard) && checkProvince(IdCard) && checkBirthday(IdCard) && checkParity(IdCard)) {
            return true;
        }
    };
    // 校验手机号
    var checkMobile = function (phoneNum) {
        var regExp = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        return regExp.test(phoneNum);
    };
    // 校验固定电话
    var checkTelephone = function (mobileNum) {
        var regExp = /^(0d{2,3})-?(d{7,8})$/;
        return regExp.test(mobileNum);
    };
    // 校验邮箱
    var checkEmail = function (email) {
        var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return reg.test(email);
    };
    // 校验QQ号
    var checkQQNumber = function (qqNumber) {
        var reg = /^[1-9][0-9]{4,10}$/;
        return reg.test(qqNumber);
    };
    // 校验微信号
    var checkWeChatNumber = function (weChatNumber) {
        var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
        return reg.test(weChatNumber);
    };
    // 验证统一社会信用代码
    var checkSocialCreditCode = function (code) {
        //18位及正则校验
        var reg = /^\w\w\d{6}\w{9}\w$/;
        if (!code || (code.length !== 18) || !reg.test(code)) {
            return false;
        }
        var codeOrigin = '0123456789ABCDEFGHJKLMNPQRTUWXY'; // 统一社会信用代码可用字符 不含I、O、S、V、Z
        var weightEdFactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; // 统一社会信用代码相对应顺序的加权因子 
        var ci; // 统一社会信用代码相应顺序的值
        var wi; // 统一社会信用代码相应顺序的加权因子
        var total = 0; // 计算结果
        // 数值与加权因子相乘之和
        for (var i = 0; i < code.length - 1; i++) {
            ci = codeOrigin.indexOf(code[i]);
            wi = weightEdFactors[i];
            total += ci * wi;
        }
        // 最后一位校验
        var logicCheckCode = 31 - total % 31;
        if (logicCheckCode === 31)
            logicCheckCode = 0;
        logicCheckCode = codeOrigin[logicCheckCode];
        return logicCheckCode === code.slice(17);
    };
    // 校验护照
    var checkPassportNumber = function (passportNumber) {
        var reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
        return reg.test(passportNumber);
    };
    // 校验邮编
    var checkPostcode = function (postcode) {
        var reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
        return reg.test(postcode);
    };
    // 校验银行卡号
    var checkBankNumber = function (bankNumber) {
        var reg = /^[1-9]\d{9,29}$/;
        return reg.test(bankNumber);
    };
    // 校验车牌号
    var checkCarNumber = function (carNumber) {
        var newEnergyReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;
        var normalReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/;
        if (!carNumber || !isString(carNumber)) {
            return false;
        }
        return carNumber.length === 8 ? newEnergyReg.test(carNumber) : normalReg.test(carNumber);
    };

    var check = /*#__PURE__*/Object.freeze({
        __proto__: null,
        checkUrl: checkUrl,
        getIdInfo: getIdInfo,
        checkIdNumber: checkIdNumber,
        checkMobile: checkMobile,
        checkTelephone: checkTelephone,
        checkEmail: checkEmail,
        checkQQNumber: checkQQNumber,
        checkWeChatNumber: checkWeChatNumber,
        checkSocialCreditCode: checkSocialCreditCode,
        checkPassportNumber: checkPassportNumber,
        checkPostcode: checkPostcode,
        checkBankNumber: checkBankNumber,
        checkCarNumber: checkCarNumber
    });

    var index = __assign(__assign(__assign({}, types), check), helper);

    return index;

}));
