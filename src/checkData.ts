import { isString } from "./dataTypes";

const checkUrl = (url: string) => {
  const regExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return regExp.test(url);
};

//检查号码是否符合规范，包括长度，类型  
const isCardNo = (IdCard: string) => {
  //这个代码表示身份证可以为空
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
  const reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  return !reg.test(IdCard) || !!IdCard;
};

// 身份证位数验证，返回性别，年龄
const getIdInfo = (IdCard: string) => {
  if (!isCardNo(IdCard)) return false
  const reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
  if(reg.test(IdCard)){
    let sex;
    if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
      sex = '1'
    } else {
      sex = '0'
    }
    const ageDate = new Date()
    const month = ageDate.getMonth() + 1
    const day = ageDate.getDate()
    let age = ageDate.getFullYear() - Number(IdCard.substring(6, 10)) - 1
    if (Number(IdCard.substring(10, 12)) < month || (Number(IdCard.substring(10, 12)) === month && Number(IdCard.substring(12, 14)) <= day)) {
      age++
    }
    if (age <= 0) {
      age = 1
    }
    return { sex, age }
  }
}

// 身份证有效性验证
const checkIdNumber = (card: string) =>{
  const city = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
  };

  type CityType = typeof city
  type CityKey = keyof CityType

  //取身份证前两位,校验省份  
  const checkProvince = (IdCard: string) => {
    const province = Number(IdCard.substr(0, 2)) as CityKey
    return city[province]
  };

  //检查生日是否正确  
  const checkBirthday = (IdCard: string) => {
    const len = IdCard.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
    
    const regExp = len === 15 ? /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/ : /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    const arr_data = IdCard.match(regExp);
    const year = len === 15 ? `19${arr_data[2]}` : arr_data[2];
    const month = arr_data[3];
    const day = arr_data[4];
    
    const birthday = new Date(`${year}'/'${month}'/'${day}`);
    return verifyBirthday(year, month, day, birthday);
  };

  //校验日期  
  const verifyBirthday = (year: string, month: string, day: string, birthday: Date) => {
    const now = new Date();
    const now_year = now.getFullYear();
    //年月日是否合理  
    if (birthday.getFullYear() === +year && (birthday.getMonth() + 1) === +month && birthday.getDate() === +day) {
      //判断年份的范围（1岁到120岁之间)  
      const time = now_year - Number(year);
      if (time >= 1 && time <= 120) {
        return true;
      }
      return false;
    }
    return false;
  };

  //校验位的检测  
  const checkParity = (IdCard: string) => {
    //15位转18位  
    const card = changeFifteenToEighteen(IdCard);
    const len = card.length;
    if (len === 18) {
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let cardTemp = 0, i;
      for (i = 0; i < 17; i++) {
          cardTemp += Number(card.substr(i, 1)) * arrInt[i];
      }
      const value = arrCh[cardTemp % 11];
      return value === card.substr(17, 1)
    }
    return false;
  };

  //15位转18位身份证号  
  const changeFifteenToEighteen = (IdCard: string) => {
    if (IdCard.length === 15) {
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let cardTemp = 0, i;
      IdCard = IdCard.substr(0, 6) + '19' + IdCard.substr(6, IdCard.length - 6);
      for (i = 0; i < 17; i++) {
        cardTemp += Number(IdCard.substr(i, 1)) * arrInt[i];
      }
      IdCard += arrCh[cardTemp % 11];
      return IdCard;
    }
    return IdCard;
  };

  const IdCard = card;
  //检查省份、校验生日、检验位的检测
  if (isCardNo(IdCard) && checkProvince(IdCard) && checkBirthday(IdCard) && checkParity(IdCard)) {
    return true;
  }
}

// 校验手机号
const checkMobile = (phoneNum: string) => {
  const regExp = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  return regExp.test(phoneNum)
}

// 校验固定电话
const checkTelephone = (mobileNum: string) => {
  const regExp = /^(0d{2,3})-?(d{7,8})$/;
  return regExp.test(mobileNum)
}

// 校验邮箱
const checkEmail = (email: string) => {
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  return reg.test(email);
}

// 校验QQ号
const checkQQNumber = (qqNumber: string) => {
  const reg = /^[1-9][0-9]{4,10}$/;
  return reg.test(qqNumber);
}

// 校验微信号
const checkWeChatNumber = (weChatNumber: string) => {
  const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
  return reg.test(weChatNumber);
}


// 验证统一社会信用代码
const checkSocialCreditCode = (code: string) => {
  //18位及正则校验
  const reg = /^\w\w\d{6}\w{9}\w$/
  if (!code || (code.length !== 18) || !reg.test(code)) {
    return false
  }

  const codeOrigin = '0123456789ABCDEFGHJKLMNPQRTUWXY'; // 统一社会信用代码可用字符 不含I、O、S、V、Z
  const weightEdFactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; // 统一社会信用代码相对应顺序的加权因子 
  
  let ci; // 统一社会信用代码相应顺序的值
  let wi; // 统一社会信用代码相应顺序的加权因子
  let total = 0; // 计算结果

  // 数值与加权因子相乘之和
  for (let i = 0; i < code.length - 1; i++) {
    ci = codeOrigin.indexOf(code[i]);
    wi = weightEdFactors[i];
    total += ci * wi; 
  }

  // 最后一位校验
  let logicCheckCode: number | string = 31 - total % 31;
  if (logicCheckCode === 31) logicCheckCode = 0;
  logicCheckCode = codeOrigin[logicCheckCode];
  return logicCheckCode === code.slice(17)
}

// 校验护照
const checkPassportNumber = (passportNumber: string) => {
  const reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
  return reg.test(passportNumber);
}

// 校验邮编
const checkPostcode = (postcode: string) => {
  const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
  return reg.test(postcode);
}

// 校验银行卡号
const checkBankNumber = (bankNumber: string) => {
  const reg = /^[1-9]\d{9,29}$/;
  return reg.test(bankNumber);
}

// 校验车牌号
const checkCarNumber = (carNumber: string) => {
  const newEnergyReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;
  const normalReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/;
  if (!carNumber || !isString(carNumber)) {
    return false
  }
  return carNumber.length === 8 ? newEnergyReg.test(carNumber) : normalReg.test(carNumber);
}


export {
  checkUrl,
  getIdInfo,
  checkIdNumber,
  checkMobile,
  checkTelephone,
  checkEmail,
  checkQQNumber,
  checkWeChatNumber,
  checkSocialCreditCode,
  checkPassportNumber,
  checkPostcode,
  checkBankNumber,
  checkCarNumber
}
