import { wordBank } from '../../../../data/words';
import { ERR_NEEDS_MORE_CHARS, INVALID_WORD } from '../consts';
import { Tile } from '../types/Tile';
import { genTilesMap } from '../helpers';

export default class Game {
  remainingTime: number;
  score: number;
  maxTileCount: number;
  deckTiles: Tile[];
  flippedTiles: Tile[];
  currWordTiles: string[];
  errorMessage: string;
  allTiles: Map<string, Tile>;

  constructor(
    remainingTime: number,
    maxTileCount: number,
    flippedTiles: Tile[],
    deckTiles: Tile[],
  ) {
    this.remainingTime = remainingTime;
    this.score = 0;
    this.maxTileCount = maxTileCount;
    this.deckTiles = deckTiles;
    this.flippedTiles = flippedTiles;
    this.currWordTiles = [];
    this.errorMessage = '';
    this.allTiles = this.generateTilesMap();
  }

  generateTilesMap(): Map<string, Tile> {
    return genTilesMap([...this.flippedTiles, ...this.deckTiles]);
  }

  setTiles(newFlippedTiles: Tile[], newDeckTiles: Tile[]): void {
    this.flippedTiles = newFlippedTiles;
    this.deckTiles = newDeckTiles;
    this.allTiles = this.generateTilesMap();
  }

  onSwapLetters(): void {
    this.setErrorMessage('');
    const tilesToRemove = this.deckTiles.filter((tile) =>
      this.currWordTiles.includes(tile.id),
    );

    const updatedDeckTiles = this.deckTiles.filter(
      (tile) => !this.currWordTiles.includes(tile.id),
    );
    const updatedFlippedTiles = [
      ...tilesToRemove,
      ...this.flippedTiles.slice(0, -tilesToRemove.length),
    ];

    const newDeckTiles = [
      ...updatedDeckTiles,
      ...this.flippedTiles.slice(-tilesToRemove.length),
    ];

    this.setTiles(updatedFlippedTiles, newDeckTiles);
    this.setCurrWordTiles([]);
  }

  acceptWord(): void {
    const tilesToRemove = this.deckTiles.filter((tile) =>
      this.currWordTiles.includes(tile.id),
    );

    const updatedDeckTiles = this.deckTiles.filter(
      (tile) => !this.currWordTiles.includes(tile.id),
    );
    const updatedFlippedTiles = this.flippedTiles.slice(
      0,
      -tilesToRemove.length,
    );

    const newDeckTiles = [
      ...updatedDeckTiles,
      ...this.flippedTiles.slice(-tilesToRemove.length),
    ];

    this.setScore(
      this.score +
        tilesToRemove.reduce((acc, tile) => acc + tile.points, 0) *
          tilesToRemove.length,
    );

    this.setTiles(updatedFlippedTiles, newDeckTiles);
  }

  onSubmitWord(): void {
    const word = this.currWordTiles
      .map((tileId) => this.allTiles.get(tileId)?.value)
      .join('');

    if (word.length < 2) {
      this.setErrorMessage(ERR_NEEDS_MORE_CHARS);
    } else if (wordBank.has(word)) {
      this.acceptWord();
      this.setCurrWordTiles([]);
    } else {
      this.setErrorMessage(INVALID_WORD);
    }
  }

  toggleTile(tileId: string): void {
    this.setErrorMessage('');
    if (this.currWordTiles.includes(tileId)) {
      this.currWordTiles = this.currWordTiles.filter((id) => id !== tileId);
    } else {
      this.currWordTiles.push(tileId);
    }
  }

  setRemainingTime(newTime: number): void {
    this.remainingTime = newTime;
  }

  setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  setScore(score: number): void {
    this.score = score;
  }

  setCurrWordTiles(currWordTiles: string[]): void {
    this.currWordTiles = currWordTiles;
  }

  onKeyUp(key: string): void {
    this.setErrorMessage('');
    if (key === 'Enter') {
      this.onSubmitWord();
    } else if (key === 'Left') {
      this.onSwapLetters();
    } else if (key === 'Backspace') {
      if (this.currWordTiles.length) {
        this.setCurrWordTiles(this.currWordTiles.slice(0, -1));
      }
    } else {
      const typedTile = this.deckTiles.find(
        (tile) =>
          key.toUpperCase() === tile.value &&
          !this.currWordTiles.includes(tile.id),
      );

      if (typedTile) this.toggleTile(typedTile.id);
    }
  }
}
