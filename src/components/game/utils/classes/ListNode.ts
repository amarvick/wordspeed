import { Tile } from '../types/Tile';

export default class ListNode {
  tile: Tile;
  prev?: ListNode | null;
  next?: ListNode | null;

  constructor(tile: Tile, prev?: ListNode, next?: ListNode) {
    this.tile = tile;
    this.prev = prev || null;
    this.next = next || null;
  }
}
