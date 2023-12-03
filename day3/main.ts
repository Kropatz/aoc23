export async function day3(enabled: boolean = false) {
  if (!enabled) return;
  let text = await Bun.file('./day3/in').text();
  let input: string[][] = text.split('\n').map(line => line.split(''));

  let part1 = 0;
  let part2 = 0;
  let symbols = ['#', '$', '=', '@', '&', '%', '!', '?', '+', '-', '*', '/', '|', '~', '^', '<', '>'];

  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      // if the char is a symbol, scan adjacent positions for numbers
      if (symbols.includes(char)) {
        let numbers = findAdjecantNumbers(input, y, x);

        // part 1
        part1 += numbers.reduce((a, b) => a + b, 0);

        // part 2
        if (char == "*" && numbers.length == 2 ) {
          part2 += numbers.reduce((a, b) => a * b, 1);
        }

      }
    }
  }

  return {
    part1,
    part2,
  }
}


function findAdjecantNumbers(input: string[][], y: number, x: number) {
  let foundNumbers: string[] = [];

  // Check all adjacent positions
  for (let offsetY = -1; offsetY <= 1; offsetY++) {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      // Skip the current position
      if (offsetY == 0 && offsetX == 0) continue;
      // Check if the adjacent position is a number
      let number = parseInt(input[y + offsetY]?.[x + offsetX] ?? '0');
      if (isNaN(number)) continue;
      // We know that the char is a number, but it might not be the full number.
      // So now we need to scan for more numbers to the left and right from the current position until we find a non-number.

      // Replace the number with a dot so we don't find it again
      input[y + offsetY][x + offsetX] = '.';
      // Start with the current number
      let assembledNumber = number + '';
      // Scan right
      let right = x + offsetX;
      while (!isNaN(parseInt(input[y + offsetY]?.[right + 1] ?? 'a'))) {
        right++;
        assembledNumber += input[y + offsetY]?.[right];
        // Replace the number with a dot so we don't find it again
        input[y + offsetY][right] = '.';
      }
      // Scan left
      let left = x + offsetX;
      while (!isNaN(parseInt(input[y + offsetY]?.[left - 1] ?? 'a'))) {
        left--;
        assembledNumber = input[y + offsetY]?.[left] + assembledNumber;
        // Replace the number with a dot so we don't find it again
        input[y + offsetY][left] = '.';
      }
      foundNumbers.push(assembledNumber);

    }
  }
  return foundNumbers.map(n => parseInt(n));
}

