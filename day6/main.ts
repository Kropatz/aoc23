export async function day6(enabled: boolean = false) {
  if (!enabled) return;
  const text = await Bun.file('./day6/in').text();
  let input = parseInput(text);

  let part1 = 1;
  let part2 = 0;

  input.races.forEach(race => {
    part1 *= getWaysToWin(race.time, race.distance)
  });

  part2 = getWaysToWin(input.part2.time, input.part2.distance)

  return {
    part1: part1,
    part2: part2
  }
}

export function isWinPossible(currentSpeed: number, timeLeft: number, distance: number) {
  return currentSpeed * timeLeft > distance;
}

export function getWaysToWin(timeLeft: number, distance: number) {
  const startingSpeed = 0;
  const increasePerMs = 1;
  let waysToWin = 0;

  for (let i = startingSpeed; i < timeLeft; i++) {
    if (isWinPossible(increasePerMs * i, timeLeft - i, distance)) {
      waysToWin++
    }
  }
  return waysToWin;
}

export function parseInput(input) {
  let races = [];
  let lines = input.replace(/.*:\s+/g, '').replace(/ +/g, ' ').split('\n');
  lines[0].split(' ').forEach((time, index) => {
    races[index] = {
      time: parseInt(time),
    }
  });
  lines[1].split(' ').forEach((distance, index) => {
    races[index].distance = parseInt(distance);
  });

  let part2 = {
    time: parseInt(lines[0].replaceAll(' ', '')),
    distance: parseInt(lines[1].replaceAll(' ', ''))
  };
  return {races, part2};
}