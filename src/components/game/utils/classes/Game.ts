import { wordBank } from '../../../../data/words';
import { ERR_NEEDS_MORE_CHARS, INVALID_WORD } from '../consts';
import { Tile } from '../types/Tile';
import LinkedList from './LinkedList';

export default class Game {
  remainingTime: number;
  score: number;
  maxTileCount: number;
  deckTiles: LinkedList; // TODO - change to Tile[];
  flippedTiles: LinkedList; // TODO - change to Tile[];
  currWordTiles: string[];
  selectedTiles: string[]; // Tile[] ?;
  errorMessage: string;
  allTiles: Map<string, Tile>;

  // @TODO - determine if we should pass in remainingTime here, or just pull directly from settings?
  constructor(remainingTime, maxTileCount, flippedTiles, deckTiles) {
    this.remainingTime = remainingTime;
    this.score = 0;
    this.maxTileCount = maxTileCount;
    this.deckTiles = deckTiles;
    this.flippedTiles = flippedTiles;
    this.selectedTiles = [];
    this.errorMessage = '';
    this.allTiles = new Map();
  }

  acceptWord(): void {
    const tilesToRemove: Tile[] = this.deckTiles.deleteBulk(
      new Set(this.currWordTiles),
    );

    const newScore =
      this.score +
      tilesToRemove.reduce((acc: number, tile: Tile) => {
        const newTile = this.flippedTiles.deleteTail();
        if (newTile) this.deckTiles.append(newTile);

        return acc + tile.points;
      }, 0) *
        tilesToRemove.length;

    this.score = newScore;
    // this.setTiles(flippedTiles, deckTiles);
  }

  onSubmitWord(): void {
    const word = this.currWordTiles
      .map((tile) => this.allTiles[tile].value)
      .join('');

    if (word.length < 2) {
      this.setErrorMessage(ERR_NEEDS_MORE_CHARS);
    } else if (wordBank.has(word)) {
      this.acceptWord();
      this.currWordTiles = [];
    } else {
      this.setErrorMessage(INVALID_WORD);
    }
  }

  onSwapLetters(): void {
    this.setErrorMessage('');
    const tilesToRemove: Tile[] = this.deckTiles.deleteBulk(
      new Set(this.currWordTiles),
    );

    tilesToRemove.forEach((tile) => {
      this.flippedTiles.prepend(tile);
      const newTile = this.flippedTiles.deleteTail();
      if (newTile) this.deckTiles.append(newTile);
    });

    // Maybe need a setTiles function here, but can try without
    this.currWordTiles = [];
  }

  addTile(tileId: string): void {
    this.setErrorMessage(INVALID_WORD);
    const wordTiles = [...this.selectedTiles];
    wordTiles.push(tileId);
    this.currWordTiles = wordTiles;
  }

  removeTile(tileId: string): void {
    this.setErrorMessage('');
    const wordTiles = [...this.currWordTiles];
    wordTiles.splice(wordTiles.indexOf(tileId), 1);
    this.currWordTiles = wordTiles;
  }

  toggleTile(tileId: string): void {
    (!this.currWordTiles.includes(tileId) ? this.addTile : this.removeTile)(
      tileId,
    );
  }

  setRemainingTime(newTime: number): void {
    this.remainingTime = newTime;
  }

  setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }
}
