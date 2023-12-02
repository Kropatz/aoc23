export async function day2(enabled: boolean = false) {
  if (!enabled) return;
  let text = await Bun.file('./day2/in').text();
  let inputs = text.split('\n');

  let sumPossible = 0
  let sumPower = 0
  let limits = {
    'red': 12,
    'green': 13,
    'blue': 14,
  }

  inputs.forEach(str => {
    const prefix = str.split(':')[0];
    const gameId = parseInt(prefix.split(' ')[1]);
    const cubes = str.split(':')[1].trim();

    const maxCubes = getMaxCubes(cubes);
    // part 1
    if (isPossible(maxCubes, limits)) {
      sumPossible += gameId;
    }
    // part 2
    sumPower += maxCubes['red'] * maxCubes['green'] * maxCubes['blue']
  });

  return {
    part1: sumPossible,
    part2: sumPower,
  }
}

function getMaxCubes(str: string) {
  const maxCubes = {
    'red': 0,
    'green': 0,
    'blue': 0,
  };
  str.replaceAll(';', ',')
    .split(',')
    .forEach((cube) => {
      let [count, color] = cube.trim().split(' ');
      if (maxCubes[color] > parseInt(count)) return;
      maxCubes[color] = parseInt(count);
    });

  return maxCubes
}

function isPossible(maxCubes: { [color: string]: number }, limits: {
  red: number;
  green: number;
  blue: number
}) {
  for (const [color, count] of Object.entries(maxCubes)) {
    if (count > limits[color]) {
      return false;
    }
  }
  return true;
}
