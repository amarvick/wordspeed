import _ from 'lodash';
import LinkedList from './classes/LinkedList.ts';
import tiles from '../../../data/tiles.json';
import { Tile } from './types/Tile';

export const initializeTiles = (): [LinkedList, LinkedList] => {
  let allTiles: Tile[] = [];

  tiles.forEach(tile => {
    for (let i = 0; i < tile.count; i++) {
      allTiles.push({
        ...tile,
        id: `${tile.value}-${i}`,
      });
    }
  });

  allTiles = _.shuffle(allTiles);

  const flippedTiles: LinkedList = new LinkedList();
  const initializedDeck: LinkedList = new LinkedList();

  allTiles.forEach((tile, index) => {
    (index < allTiles.length - 8 ? flippedTiles : initializedDeck).append(tile);
  });

  return [flippedTiles, initializedDeck];
};

export const genTilesMap = (deckTiles: LinkedList): Map<string, Tile> => {
  const deckTilesMap = new Map<string, Tile>();
  deckTiles.loop(tile => deckTilesMap[tile.id] = tile);

  return deckTilesMap;
};

export const setHighScores = (score: number): void => {
  const highScores: number[] = JSON.parse(localStorage.getItem("HighScores") || "[]");
  let isScorePushed = false;

  for (let i = 0; i < highScores.length; i++) {
    const listScore = highScores[i];
    if (score > listScore) {
      highScores.splice(i, 0, score);
      isScorePushed = true;
      break;
    }
  }

  if (highScores.length < 5 && !isScorePushed) highScores.push(score);
  else if (highScores.length > 5) highScores.pop();
  localStorage.setItem("HighScores", JSON.stringify(highScores));
}
