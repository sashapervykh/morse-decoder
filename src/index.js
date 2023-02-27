const MORSE_TABLE = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
};

function decode(expr) {
  let allSymbolsBits = [];
  let allSymbolsMorse = [];
  let allSymbols = [];
  let numberOfSymbols = expr.length / 10;
  let k = expr.length;
  for (let i = 0; i < numberOfSymbols; i++) {
    allSymbolsBits[i] = expr.slice(k - 10, k);
    k = k - 10;
  }

  function transformToMorseCode(str) {
    let strMorseCode = "";
    let n = str.length / 2;
    let separatedSymbols = [];
    let k = 0;
    for (let i = 0; i < n; i++) {
      separatedSymbols[i] = str.slice(k, k + 2);
      k += 2;
      if (separatedSymbols[i] == "10") {
        separatedSymbols[i] = ".";
      } else {
        separatedSymbols[i] = "-";
      }
      strMorseCode += separatedSymbols[i];
    }
    return strMorseCode;
  }

  for (let i = 0; i < numberOfSymbols; i++) {
    allSymbolsMorse[i] = "";
    let k = 0;
    if (allSymbolsBits[i].indexOf(1) == -1) {
      allSymbolsMorse[i] = " ";
    } else {
      k = allSymbolsBits[i].indexOf(1);
      let bitSymbolCode = allSymbolsBits[i].slice(k);
      allSymbolsMorse[i] = transformToMorseCode(bitSymbolCode);
    }
  }

  for (let i = numberOfSymbols; i > -1; i--) {
    for (let key in MORSE_TABLE) {
      if (allSymbolsMorse[i] == key && allSymbolsMorse[i] != " ") {
        allSymbols[i] = MORSE_TABLE[key];
      } else if (allSymbolsMorse[i] == " ") {
        allSymbols[i] = " ";
      }
    }
  }

  let newStr = "";
  for (let i = numberOfSymbols - 1; i > -1; i--) {
    newStr += allSymbols[i];
  }
  return newStr;
}

module.exports = {
  decode,
};
