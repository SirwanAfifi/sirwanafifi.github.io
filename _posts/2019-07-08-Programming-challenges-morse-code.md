---
layout: post
title: Morse code
tags: React Algorithm Morse
---

<img class="center-image" src="/public/img/morse_code.png" alt="Morse Code table" width="600">

Morse Code is a set of dots and dashes (short mark, dot or 'dit' (·) and longer mark, dash or 'dah' (-)). Basically, it's a character encoding scheme for transmitting cryptographic messages which used in telecommunication. Think of it as the early version of texting. The system is named after the American artist Samuel Finley Breese Morse who co-developed an electrical telegraph system at the beginning of 1836. In fact it was heavily used for (secret) transmissions during WWI and WWII. Different combination of dots and dashes will produce different letters it also means that different combination of letters will be eventually your encoded messages.

<img class="center-image" src="/public/img/International_Morse_Code.svg" alt="Morse Code table" width="700">

I thought it might be a good idea to write my name in Morse code to see how it looks like. Since I am a lazy developer, so I ended up writing a React application to do the job for me:

<img class="center-image" src="/public/img/morse_code_translator.gif" alt="Morse Code video" width="700">

Here's the implementation in JavaScript:

```js
const language = {
  alphabets: {
    A: "•−",
    B: "−•••",
    C: "−•−•",
    D: "−••",
    E: "•",
    F: "••−•",
    G: "−−•",
    H: "••••",
    I: "••",
    J: "•−−−",
    K: "−•−",
    M: "−−",
    N: "−•",
    L: "•−••",
    N: "−•",
    O: "−−−",
    P: "•−−•",
    Q: "−−•−",
    R: "•−•",
    S: "•••",
    T: "−",
    U: "••−",
    V: "••−",
    W: "•−−",
    X: "−••−",
    Y: "−•−−",
    Z: "−−••"
  },
  numeral: {
    "1": "•−−−−",
    "2": "••−−−",
    "3": "••−−",
    "4": "•••−",
    "5": "•••••",
    "6": "−••••",
    "7": "−−•••",
    "8": "−−−••",
    "9": "−−−−•",
    "0": "−−−−−"
  },
  punctuations: {
    "•": "•−•−•−",
    ",": "−−••−−",
    "?": "••−−••",
    ":": "−−−•••",
    ";": "−•−•−•",
    "−": "−••••−",
    "/": "−••−•",
    '"': "•−••−•",
    "'": "•−−−−•",
    "(": "−•−−•",
    ")": "−•−−•−",
    "=": "−•••−",
    "+": "•−•−•",
    $: "••−••−",
    q: "•−•−••",
    _: "••−−•−"
  }
};

const translateToMorseCode = input => {
  const inputArray = [...input];
  const morseCode = inputArray.map(i => {
    const code =
      language.alphabets[i.toUpperCase()] ||
      language.numeral[i] ||
      language.punctuations[i];
    return code || "";
  });
  return morseCode.join(" ");
};

const translateToEnglish = input => {
  const inputArray = input.split(" ");
  const engWord = inputArray.map(i => {
    const value =
      Object.keys(language.alphabets).filter(key => {
        return language.alphabets[key] === i;
      })[0] ||
      Object.keys(language.punctuations).filter(key => {
        return language.punctuations[key] === i;
      })[0] ||
      Object.keys(language.numeral).filter(key => {
        return language.numeral[key] === i;
      })[0];
    return value ? value.toLocaleLowerCase() : "";
  });
  return engWord.join(" ");
};
```

Since the original idea of Morse Code was to signal the message in a form perceptible to the human senses, such as sound waves or visible light, so I have added the ability to play a sound while coding the message:

```js
async display() {
    this.setState({ loading: true });
    this.setState({ output: "" });
    for (let i of [...translateToMorseCode(this.state.input)]) {
        await sleep(200);
        if (i === "•") {
            playSound();
        }
        else if (i === "−") {
            playSound();
            playSound();
        }
        this.setState({ output: this.state.output + "" + i });
    }
    this.setState({ loading: false });
}
```
