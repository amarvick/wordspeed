import { Tile } from '../types/Tile';

export default class ListNode {
  tile: Tile;
  prev?: ListNode | null;
  next?: ListNode | null;

  constructor(tile, prev?, next?) {
    this.tile = tile;
    this.prev = prev || null;
    this.next = next || null;
  }
}
