import { describe, expect, it } from 'bun:test';
import { getWaysToWin, isWinPossible, parseInput } from './main.ts';


describe('day6', () => {
  it('should run', () => {
    expect(true).toEqual(true);
  });

  it('should parse the input correctly', () => {
    let input = `Time:      7  15   30
Distance:  9  40  200`;

    let races = parseInput(input).races;

    expect(races[0].time).toEqual(7);
    expect(races[0].distance).toEqual(9);
    expect(races[1].time).toEqual(15);
    expect(races[1].distance).toEqual(40);
    expect(races[2].time).toEqual(30);
    expect(races[2].distance).toEqual(200);
  });

  it('should parse the part2 input correctly', () => {
    let input = `Time:      7  15   30
Distance:  9  40  200`;

    let race = parseInput(input).part2;

    expect(race.time).toEqual(71530);
    expect(race.distance).toEqual(940200);
  });

  it('should be able to check if a win is possible', () => {
    let currentSpeed = 0;
    let timeLeft = 3;
    let distance = 15;

    expect(isWinPossible(currentSpeed, timeLeft, distance)).toEqual(false);

    currentSpeed = 6;
    expect(isWinPossible(currentSpeed, timeLeft, distance)).toEqual(true);
  });

  it('should be able to return the amount of unique ways to win', () => {
    let timeLeft = 7;
    let distance = 9;

    expect(getWaysToWin(timeLeft, distance)).toEqual(4);
  });
});