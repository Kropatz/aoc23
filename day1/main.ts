export async function day1(enabled: boolean) {
  if (!enabled) return;
  let text = await Bun.file('./day1/in').text();
  let inputs = text.split('\n');

  let calibration = 0

  inputs.forEach(str => {
    let allDigits = getAllDigits(str, true);
    let firstDigit = allDigits[0]
    let lastDigit = allDigits.slice(-1)[0];
    let joined = firstDigit + lastDigit;

    console.log(str, allDigits, joined)
    calibration += parseInt(joined)
  });

  console.log(calibration)
}

let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function getAllDigits(string: string, countWords = false): string[] {
  let digits: string[] = [];
  let currentDigit = '';

  for (const char of string) {

    if (isNaN(parseInt(char))) {
      currentDigit += char;
    } else {
      currentDigit = char;
      digits.push(currentDigit);
    }

    if (!countWords) continue;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (currentDigit.includes(word)) {
        digits.push((i + 1) + '');
        currentDigit = currentDigit.charAt(currentDigit.length - 1)
      }
    }
  }
  return digits;
}