type Cards = Map<number, Card>;
type Cache = Map<number, number>;

interface Card {
  winningNumbers: Set<number>
  myNumbers: Set<number>
  id: number

}

interface Context {
  cards: Cards
  cardQueue: Card[]
  cache: Cache
  part1: number
  part2: number
}

// 1, 2, 4, 8, ...
const maxWinners = 25;
const points = precomputePoints(maxWinners);

function precomputePoints(maxWinners: number): number[] {
  let points: number[] = [];
  for (let i = 0; i < maxWinners; i++) {
    points.push(Math.pow(2, i));
  }
  return points;
}

export async function day4(enabled: boolean = false) {
  if (!enabled) return;
  const text = await Bun.file('./day4/in').text();
  const input: string[] = text.split('\n');

  const ctx: Context = {
    cards: parseCards(input),
    cache: new Map<number, number>(),
    cardQueue: [],
    part1: 0,
    part2: 0,
  }

  for (const card of ctx.cards.values()) {
    processCardOrUseCache(card, ctx);

    let currentQueueLength = ctx.cardQueue.length;
    for (let i = 0; i < currentQueueLength; i++) {
      processCardOrUseCache(ctx.cardQueue[i], ctx);
    }
    // remove the processed cards from the queue
    ctx.cardQueue = ctx.cardQueue.slice(currentQueueLength) ?? [];
  }

  // add the remaining cards
  ctx.part2 += ctx.cardQueue.length;

  // part 1
  for (const [, winners] of ctx.cache) {
    ctx.part1 += points[winners - 1];
  }

  return {
    part1: ctx.part1,
    part2: ctx.part2
  }
}

function parseCards(input: string[]): Cards {
  let cards: Cards = new Map<number, Card>();
  let i = 1;
  input.forEach(line => {
    const inputLine = line.split(':')[1].trim();
    const winningNumberString = inputLine.split('|')[0].trim();
    const scratchCardNumbersString = inputLine.split('|')[1].trim();

    const winningNumbers = countNumbers(winningNumberString);
    const myNumbers = countNumbers(scratchCardNumbersString);
    cards.set(i, {
      winningNumbers,
      myNumbers,
      id: i
    });
    i++;
  });
  return cards;
}

function countNumbers(numberString: string): Set<number> {
  return numberString.split(' ')
    .filter(str => str.trim().length !== 0)
    .map(str => parseInt(str))
    .reduce(function (set, obj) {
      set.add(obj);
      return set;
    }, new Set<number>());
}

function processCardOrUseCache(card: Card, ctx: Context) {
  ctx.part2++;
  // if the card was already processed, we know how many cards to queue
  if (ctx.cache.get(card.id) > 0) {
    for (let i = 1; i <= ctx.cache.get(card.id); i++) {
      ctx.cardQueue.push(ctx.cards.get(card.id + i));
    }
    return;
  }
  processCard(card, ctx);
}

function processCard(card: Card, ctx: Context) {
  let winners = 0;
  card.myNumbers.forEach(number => {
    if (!card.winningNumbers.has(number)) {
      return;
    }
    // part 2
    winners++;
    ctx.cardQueue.push(ctx.cards.get(card.id + winners))
    ctx.cache.set(card.id, (ctx.cache.get(card.id) ?? 0) + 1);
  });
}