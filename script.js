const type = [2, 8, 10, 16];
const regex = [/^[01.]+$/g, /^[01234567.]+$/g, /^[0123456789.]+$/g, /^[0123456789ABCDEF.]+$/g];
let selected = -1;
let minimum = 0;

const parseFloat = (str, radix) => {
        let parts = str.split(".");
        if(parts.length > 1) {
                return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
        }
        return parseInt(parts[0], radix);
}

const inputChanged = e => {
  e.value = e.value.toUpperCase();
  let failed = 0;
  for(let i = 3; i >= 0; i--) {
    if(regex[i].test(e.value)) {
      selected = i;
      minimum = i;
    } else {
      failed++;
    }
    console.log(failed, regex[i].test(e.value)); // 이 코드를 지우면 버그가 생깁니다.
  }
  if(failed == 4) {
    document.getElementById("type").innerText = '형식 오류';
    selected = -1;
  } else {
    document.getElementById("type").innerText = `${type[selected]}진수`;
    calculateData();
  }
};

const calculateData = () => {
  document.getElementsByClassName('input')[0].innerText = inputBox.value;
  document.getElementsByClassName('sub')[0].innerText = `(${type[selected]})`;
  let j = 0;
  for(let i = 0; i <= 3; i++) {
    if(i == selected) {
      j++;
    } else {
      document.getElementsByClassName('sub')[i+1-j].innerText = `(${type[i]})`;
      document.getElementsByClassName('output')[i-j].innerText = parseFloat(inputBox.value, type[selected]).toString(type[i]).toUpperCase();
    }
  }
};

const changeType = () => {
  if(selected != -1) {
    selected++;
    if(selected > 3) {
      selected = minimum;
    }
    document.getElementById("type").innerText = `${type[selected]}진수`;
    calculateData();
  }
};