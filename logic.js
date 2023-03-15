const def = document.getElementById("default");

const charsCode = createAscii();
// options are 
// {
// roll : int (default: 10), // how many updates before jumping to the next letter
// delay: int (default: 40), // how much milisecod before each update 
// cryptoWidth : int (default: 4) // how many letters to be crypted (0 =  full string)
// below are some examples 
//}
typeText(def);
typeText(slow, {
  delay: 80
});
typeText(fast, {
  delay: 10
});
typeText(long, {
  cryptoWidth: 0
});

function typeText(el, { roll = 10, cryptoWidth = 4, delay = 40 } = {}) {
  const options = {
    roll,
    cryptoWidth,
    delay
  };

  const content = el.textContent;
  el.textContent = "";
  let chartCount = 0;
  let count = 0;
  requestAnimationFrame(function animate() {
    if (chartCount > content.length) return;
    if (count++ <= options.roll) {
      el.textContent = getMixedText(chartCount);
    } else {
      count = 0;
      chartCount += 1;
      pushOriginChart(chartCount);
    }

    setTimeout(() => requestAnimationFrame(animate), options.delay);
  });

  function getMixedText(index) {
    let end = options.cryptoWidth === 0 ? -1 : index + options.cryptoWidth;
    const txt = content.slice(index, end);
    return content.slice(0, index) + converToCrypto(txt);
  }

  function pushOriginChart(i) {
    const prev = el.textContent;
    const next = content.slice(0, i) + prev.slice(i);
    return (el.textContent = next);
  }
}

function converToCrypto(text) {
  let finial = "";
  for (let i = 0; i < text.length; i++) {
    // don't convert white space for your life
    if (text[i] === " ") {
      finial += " ";
    } else finial += randomChart();
  }
  return finial;
}

function randomChart() {
  const r = charsCode[Math.floor(Math.random() * charsCode.length)];
  return String.fromCharCode(r);
}

function createAscii() {
  const charsRange = [[35, 38], 43, [48, 57], [64, 90], [97, 122]]; // ascii chars code range I prefer
  let finial = [];
  for (let i = 0; i < charsRange.length; i++) {
    // set ascii chars
    const current = charsRange[i];
    if (Array.isArray(current)) {
      for (let i = current[0]; i <= current[1]; i++) {
        finial.push(i);
      }
    } else if (typeof current === "number") finial.push(current);
  }
  return finial;
}
