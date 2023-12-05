import { describe, expect, it } from 'bun:test';
import { initializeMap, mapRange, parseInput, parseRange, parseSeeds } from './main.ts';

describe('day5', () => {
  it('should parse the seeds correctly', () => {
    let line = '79 14 55 13';
    let result = parseSeeds(line);
    expect(result).toEqual([79, 14, 55, 13]);
  });

  it('should parse the line correctly', () => {
    let line = '50 98 2';
    let result = parseRange(line);
    expect(result).toEqual({
      dest: 50,
      src: 98,
      range: 2
    })
  })

  it('initialized should map source to destination with same values', () => {
    let initialized = initializeMap();
    for (let i = 0; i < 100; i++) {
      expect(initialized.get(i)).toEqual(i);
    }
  });

  it('convert source and dest to range', () => {
    let source = 50, dest = 98, range = 2;
    let map = initializeMap();

    mapRange(map, dest, source, range);

    expect(map.get(source)).toEqual(dest)
    expect(map.get(source + 1)).toEqual(dest + 1)
    // out of range
    expect(map.get(source + 2)).toEqual(source + 2)
  });

  it('convert source and dest to range multiple times', () => {
    let dest = 50, source = 98, range = 2;
    let dest2 = 52, source2 = 50, range2 = 48;
    let map = initializeMap();

    mapRange(map, dest, source, range);
    mapRange(map, dest2, source2, range2);

    expect(map.get(source)).toEqual(dest)
    expect(map.get(source + 1)).toEqual(dest + 1)
    // out of range
    expect(map.get(source + 2)).toEqual(source + 2)

    for (let i = 0; i < range2; i++) {
      expect(map.get(source2 + i)).toEqual(dest2 + i)
    }
  });

  it('parsed the input correctly', () => {
    let input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
    `

    let parsed = parseInput(input);
    expect(parsed.seeds).toEqual([79, 14, 55, 13]);
    expect(parsed.parsedRanges[0]).toEqual([{dest: 50, src: 98, range: 2}, {dest: 52, src: 50, range: 48}]);
    expect(parsed.parsedRanges[1]).toEqual([{dest: 0, src: 15, range: 37}, {dest: 37, src: 52, range: 2}, {dest: 39, src: 0, range: 15}]);
    expect(parsed.parsedRanges[2]).toEqual([{dest: 49, src: 53, range: 8}, {dest: 0, src: 11, range: 42}, {dest: 42, src: 0, range: 7}, {dest: 57, src: 7, range: 4}]);
    expect(parsed.parsedRanges[3]).toEqual([{dest: 88, src: 18, range: 7}, {dest: 18, src: 25, range: 70}]);
    expect(parsed.parsedRanges[4]).toEqual([{dest: 45, src: 77, range: 23}, {dest: 81, src: 45, range: 19}, {dest: 68, src: 64, range: 13}]);
    expect(parsed.parsedRanges[5]).toEqual([{dest: 0, src: 69, range: 1}, {dest: 1, src: 0, range: 69}]);
    expect(parsed.parsedRanges[6]).toEqual([{dest: 60, src: 56, range: 37}, {dest: 56, src: 93, range: 4}]);
  });
});