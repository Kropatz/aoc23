import { day1 } from './day1/main.ts';
import { day2 } from './day2/main.ts';
import { day3 } from './day3/main.ts';

day1(false);
console.log("Day2 solution:", await day2(false) ?? "Disabled");
console.log("Day3 solution:", await day3(true) ?? "Disabled");