
const COIN = '$';
const TILE = '_';
const GAP = ' ';
const SPIKE = '^';

export const TileType = {
    Coin: '$',
    Land: '_',
    Gap: ' ',
    Spike: '^'
}

const Rows = {
    0: [TILE, GAP, SPIKE],
    1: [COIN, GAP],
    2: [COIN, GAP, TILE],
    3: [COIN, GAP, TILE, SPIKE],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],

}

export function generate(size) {

    return ['_'.repeat(size).split(''),
        (' '.repeat(6) + coinPattern((size / 2) - 6)).split('')
    ,'  '.repeat(size)];
}

function coinPattern(num) {
    return '$ '.repeat(num);
}