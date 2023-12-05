export async function day5(enabled: boolean = false) {
  if (!enabled) return;
  const text = await Bun.file('./day5/in').text();

  let part1 = Number.MAX_SAFE_INTEGER;
  let part2 = Number.MAX_SAFE_INTEGER

  let parsedInput = parseInput(text);

  const seedToSoil = parsedInput.parsedRanges[0];
  const soilToFertilizerMap = parsedInput.parsedRanges[1];
  const fertilizerToWaterMap = parsedInput.parsedRanges[2];
  const waterToLightMap = parsedInput.parsedRanges[3];
  const lightToTemperatureMap = parsedInput.parsedRanges[4];
  const temperatureToHumidityMap = parsedInput.parsedRanges[5];
  const humidityToLocationMap = parsedInput.parsedRanges[6];

  // part 1
  for (let seed of parsedInput.seeds) {
    let soil = Range.applyRanges(seed, seedToSoil);
    let fertilizer = Range.applyRanges(soil, soilToFertilizerMap);
    let water = Range.applyRanges(fertilizer, fertilizerToWaterMap);
    let light = Range.applyRanges(water, waterToLightMap);
    let temperature = Range.applyRanges(light, lightToTemperatureMap);
    let humidity = Range.applyRanges(temperature, temperatureToHumidityMap);
    let location = Range.applyRanges(humidity, humidityToLocationMap);

    part1 = Math.min(part1, location);
  }

  // part 2
  for (let seedRange of parsedInput.seedsPart2) {
    console.log('starting range ' + seedRange.start + ' ' + seedRange.len)
    for (let i = 0; i < seedRange.len; i++) {
      let seed = seedRange.start + i;
      let soil = Range.applyRanges(seed, seedToSoil);
      let fertilizer = Range.applyRanges(soil, soilToFertilizerMap);
      let water = Range.applyRanges(fertilizer, fertilizerToWaterMap);
      let light = Range.applyRanges(water, waterToLightMap);
      let temperature = Range.applyRanges(light, lightToTemperatureMap);
      let humidity = Range.applyRanges(temperature, temperatureToHumidityMap);
      let location = Range.applyRanges(humidity, humidityToLocationMap);

      part2 = Math.min(part2, location);
    }
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
  let parsedSeedsPart2: SeedRange[] = SeedRange.parse(seeds.replaceAll('seeds: ', ''))

  let ranges = input.substring(firstBreak + 2);
  let sections = ranges.split('\n\n');

  let mapped = sections.map(section => {
    section = section.replace(/[\sa-zA-Z0-9_-]+:\n/, '').trim()
    return section.split('\n').map(line => {
      return Range.parse(line.trim());
    });
  })

  return {
    seeds: parsedSeeds,
    seedsPart2: parsedSeedsPart2,
    parsedRanges: mapped
  }
}

export function parseSeeds(line: string) {
  let numbers = line.split(' ');
  return numbers.map(n => parseInt(n));
}

export class Range {
  destination: number;
  sourceStart: number;
  length: number;

  constructor(destination: number, sourceStart: number, length: number) {
    this.destination = destination;
    this.sourceStart = sourceStart;
    this.length = length;
  }

  isInRange(number: number): boolean {
    return number >= this.sourceStart && number < this.sourceStart + this.length;
  }

  convert(fromSource: number): number {
    return this.destination + fromSource - this.sourceStart;
  }

  static parse(line: string) {
    let numbers = line.split(' ');
    return new Range(parseInt(numbers[0]), parseInt(numbers[1]), parseInt(numbers[2]));
  }

  static applyRanges(number: number, ranges: Range[]) {
    for (let range of ranges) {
      if (range.isInRange(number)) {
        return range.convert(number);
      }
    }
    return number;
  }
}

export class SeedRange {
  start: number
  len: number

  constructor(start: number, length: number) {
    this.start = start;
    this.len = length;
  }

  static parse(line: string): SeedRange[] {
    let split = line.split(' ');
    let ranges = []
    for (let i = 0; i < split.length; i += 2) {
      ranges.push(new SeedRange(parseInt(split[i]), parseInt(split[i + 1])));
    }
    return ranges;
  }
}