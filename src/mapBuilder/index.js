
export const TileType = {
    Coin: '$',
    Land: '_',
    Gap: ' ',
    Spike: '^'
}

export function generate(size, difficulty = 0) {

    let chunk = ['_'.repeat(size).split('')
    ,' '.repeat(size).split(''),'-'.repeat(size).split(''),' '.repeat(size).split(''),' '.repeat(size).split('')];
    generateCoins(chunk);
    generateSpikes(chunk, difficulty);
    return chunk;
}

function generateCoins(chunk, difficulty) {
    let chance = 4;
    for(let i = 0; i < chunk.length; i++) {
        for (let j = 0; j < chunk[i].length; j++) {
            if (chunk[i][j] === ' ' && Math.floor(Math.random() * 100) < chance) {
                chunk[i][j] = '$';
            }
        }
    }
}

function generateSpikes(chunk, difficulty) {
    for(let i = 0; i < chunk[1].length; i++) {
        if (chunk[1][i] === ' ' && Math.floor(Math.random() * 100) < Math.min(difficulty, 30)) {
            chunk[1][i] = '^';
            if(chunk[1].length > i + 1 && Math.floor(Math.random() * 100) < Math.min(difficulty, 50)) {
                chunk[1][i + 1] = '^';
            }
            i += 5;
        }
    }
}