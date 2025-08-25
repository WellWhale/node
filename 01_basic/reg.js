let reg = /World/gi;
reg = new RegExp("World");

let str = `Hello Hi..
World!
world`;

let tel = `^010-\d{4}-\d{4}$/`;

// g-> 하나말고 모두 찾아서 바꾼다, i-> 대소문자 구분없이
console.log(str.replace(/World/gi, "세상"));

// str 대상으로, reg(World)가 몇번째에 있는지 출력해준다?(확인필요)
console.log(tel);
console.log(reg.test(tel));
