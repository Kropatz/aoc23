import { describe, expect, it } from 'bun:test';
import { parseInput, parseSeeds, Range, SeedRange } from './main.ts';

describe('day5', () => {
  it('should parse the seeds correctly', () => {
    let line = '79 14 55 13';
    let result = parseSeeds(line);
    expect(result).toEqual([79, 14, 55, 13]);
  });

  it('should parse the seed ranges correctly', () => {
    let line = '79 14 55 13';
    let result = SeedRange.parse(line);
    expect(result).toEqual([new SeedRange(79, 14), new SeedRange(55, 13)]);
  });

  it('should parse the line correctly', () => {
    let line = '50 98 2';
    let result = Range.parse(line);
    expect(result).toEqual(new Range(50, 98, 2))
  })

  it('convert successfully with range', () => {
    let dest = 50, source = 98, length = 2;
    let range = new Range(dest, source, length);

    expect(range.convert(source)).toEqual(dest)
    expect(range.convert(source + 1)).toEqual(dest + 1)
    // out of range
    expect(range.isInRange(source + 2)).toEqual(false)
  });

  it('knows if a value is in the range', () => {
    let dest = 50, source = 98, length = 2;
    let dest2 = 52, source2 = 50, length2 = 48;
    let range1 = new Range(dest, source, length);
    let range2 = new Range(dest2, source2, length2);

    expect(range2.isInRange(49)).toEqual(false)
    expect(range2.isInRange(50)).toEqual(true)
    expect(range2.convert(50)).toEqual(52)

    expect(range1.isInRange(97)).toEqual(false)
    expect(range1.isInRange(98)).toEqual(true)
    expect(range1.convert(98)).toEqual(50)
    expect(range1.isInRange(99)).toEqual(true)
    expect(range1.convert(99)).toEqual(51)
    expect(range1.isInRange(100)).toEqual(false)
  });

  it('applies multiple ranges successfully', () => {
    let dest = 50, source = 98, length = 2;
    let dest2 = 52, source2 = 50, length2 = 48;
    let range1 = new Range(dest, source, length);
    let range2 = new Range(dest2, source2, length2);

    expect(Range.applyRanges(49, [range1, range2])).toEqual(49)
    expect(Range.applyRanges(50, [range1, range2])).toEqual(52)
    expect(Range.applyRanges(51, [range1, range2])).toEqual(53)
    expect(Range.applyRanges(97, [range1, range2])).toEqual(99)
    expect(Range.applyRanges(98, [range1, range2])).toEqual(50)
    expect(Range.applyRanges(99, [range1, range2])).toEqual(51)
    expect(Range.applyRanges(100, [range1, range2])).toEqual(100)
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

    expect(parsed.parsedRanges[0]).toEqual([new Range(50, 98, 2), new Range(52, 50, 48)]);
    expect(parsed.parsedRanges[1])
      .toEqual([new Range(0, 15, 37), new Range(37, 52, 2), new Range(39, 0, 15)]);
    expect(parsed.parsedRanges[2])
      .toEqual([new Range(49, 53, 8), new Range(0, 11, 42), new Range(42, 0, 7), new Range(57, 7, 4)]);
    expect(parsed.parsedRanges[3]).toEqual([new Range(88, 18, 7), new Range(18, 25, 70)]);
    expect(parsed.parsedRanges[4])
      .toEqual([new Range(45, 77, 23), new Range(81, 45, 19), new Range(68, 64, 13)]);
    expect(parsed.parsedRanges[5]).toEqual([new Range(0, 69, 1), new Range(1, 0, 69)]);
    expect(parsed.parsedRanges[6])
      .toEqual([new Range(60, 56, 37), new Range(56, 93, 4)]);
  });
});