

export async function day5(enabled: boolean = false) {
  if (!enabled) return;
  const text = await Bun.file('./day5/in').text();

  let part1 = 999999999999;
  let part2 = 0;


  let parsedInput = parseInput(text);
  let seeds = parsedInput.seeds;
  const seedToSoilMap = initializeMap();
  const soilToFertilizerMap = initializeMap();
  const fertilizerToWaterMap = initializeMap();
  const waterToLightMap = initializeMap();
  const lightToTemperatureMap = initializeMap();
  const temperatureToHumidityMap = initializeMap();
  const humidityToLocationMap = initializeMap();

  mapRangeMultiple(seedToSoilMap, parsedInput.parsedRanges[0]);
  mapRangeMultiple(soilToFertilizerMap, parsedInput.parsedRanges[1]);
  mapRangeMultiple(fertilizerToWaterMap, parsedInput.parsedRanges[2]);
  mapRangeMultiple(waterToLightMap, parsedInput.parsedRanges[3]);
  mapRangeMultiple(lightToTemperatureMap, parsedInput.parsedRanges[4]);
  mapRangeMultiple(temperatureToHumidityMap, parsedInput.parsedRanges[5]);
  mapRangeMultiple(humidityToLocationMap, parsedInput.parsedRanges[6]);

  for (let seed of seeds) {
    let soil = seedToSoilMap.get(seed);
    let fertilizer = soilToFertilizerMap.get(soil);
    let water = fertilizerToWaterMap.get(fertilizer);
    let light = waterToLightMap.get(water);
    let temperature = lightToTemperatureMap.get(light);
    let humidity = temperatureToHumidityMap.get(temperature);
    let location = humidityToLocationMap.get(humidity);

    part1 = Math.min(part1, location);
  }

  return {
    part1: part1,
    part2: part2
  }
}

export function parseInput(input: string) {
  let firstBreak = input.indexOf('\n\n');
  let seeds = input.substring(0, firstBreak);
  let parsedSeeds = parseSeeds(seeds.replaceAll('seeds: ', ''));

  let ranges = input.substring(firstBreak + 2);
  let sections = ranges.split('\n\n');

  let mapped = sections.map(section => {
    section = section.replace(/[\sa-zA-Z0-9_-]+:\n/, '').trim()
    return section.split('\n').map(line => {
      return parseRange(line.trim());
    });
  })

  return {
    seeds: parsedSeeds,
    parsedRanges: mapped
  }
}

export function parseSeeds(line: string) {
  let numbers = line.split(' ');
  return numbers.map(n => parseInt(n));
}

export function parseRange(line: string) {
  let numbers = line.split(' ');
  return {
    dest: parseInt(numbers[0]),
    src: parseInt(numbers[1]),
    range: parseInt(numbers[2])
  }
}

export function initializeMap(): Map<number, number> {
  const initialized = new Map<number, number>();
  for (let i = 0; i <= 100; i++) {
    initialized.set(i, i);
  }
  return initialized;
}

export function mapRange(map: Map<number, number>, dest: number, src: number, range: number) {
  for (let i = 0; i < range; i++) {
    map.set(src + i, dest + i);
  }
}

export function mapRangeMultiple(map: Map<number, number>, ranges: {
  dest: number,
  src: number,
  range: number
}[]) {
  ranges.forEach(range => {
    mapRange(map, range.dest, range.src, range.range);
  });
}