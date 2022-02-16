import _ from 'lodash';
// @ts-ignore
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

// Consider using this in FullGameBoard
export const genTilesMap = (tiles: Tile[]): Map<string, Tile> => {
  const newTilesMap = new Map<string, Tile>();

  // TODO - Maybe rename forEach
  tiles.forEach((tile) => {
    newTilesMap[tile.id] = tile;
  });

  return newTilesMap;
};
