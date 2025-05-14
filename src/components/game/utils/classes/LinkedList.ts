import { Tile } from '../types/Tile';
// @ts-ignore
import ListNode from './ListNode.ts';

export default class LinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  listSize: number;

  constructor() {
    this.head = this.tail = null;
    this.listSize = 0;
  }

  append(tile: Tile): void {
    if (!this.tail) {
      this.head = this.tail = new ListNode(tile);
    } else {
      const oldTail = this.tail;
      this.tail = new ListNode(tile);
      oldTail.next = this.tail;
      this.tail.prev = oldTail;
    }
    this.listSize = this.listSize + 1;
  }

  prepend(tile: Tile): void {
    if (!this.head) {
      this.head = this.tail = new ListNode(tile);
    } else {
      const oldHead = this.head;
      this.head = new ListNode(tile);
      oldHead.prev = this.head;
      this.head.next = oldHead;
    }
    this.listSize = this.listSize + 1;
  }

  deleteHead(): Tile | null {
    if (!this.head) {
      return null;
    }
    const removedHead = this.head;

    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.listSize = this.listSize - 1;
    return removedHead.tile;
  }

  deleteTail(): Tile {
    if (!this.tail) {
      return null;
    }
    const removedTail = this.tail;

    if (this.head === this.tail) {
      this.tail = this.head = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.listSize = this.listSize - 1;
    return removedTail.tile;
  }

  deleteBulk(tileIds: Set<string>): Tile[] {
    let currentNode = this.head;
    const deletedTiles = [];

    while (currentNode) {
      if (tileIds.has(currentNode.tile.id)) {
        deletedTiles.push(currentNode.tile);
        const prevNode = currentNode.prev || null;
        const nextNode = currentNode.next || null;

        if (prevNode) prevNode.next = nextNode;
        else this.head = nextNode;

        if (nextNode) nextNode.prev = prevNode;
        else this.tail = prevNode;

        this.listSize = this.listSize - 1;
      }

      currentNode = currentNode.next;
    }
    return deletedTiles;
  }

  map(func: (tile: Tile) => void): any[] {
    let currentNode = this.head;
    const all: any[] = [];

    while (currentNode) {
      all.push(func(currentNode.tile));
      currentNode = currentNode.next;
    }
    return all;
  }

  loop(func: (tile: Tile) => void): void {
    let currentNode = this.head;

    while (currentNode) {
      func(currentNode.tile);
      currentNode = currentNode.next;
    }
  }

  reduce(func: (score: number, points: number) => number, score = 0): number {
    let currentNode = this.head;

    while (currentNode) {
      score = func(score, currentNode.tile.points);
      currentNode = currentNode.next;
    }
    return score;
  }
}
