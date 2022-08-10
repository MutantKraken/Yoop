import { KeyBoard } from "./keyboard";
import { setPage } from "./page";

export const velocity = 0.1;
const steps = 1/velocity;

export class Game {
  constructor() {
    this.kb = new KeyBoard();
    this.win = false;
    this.moving = false;
    this.step = 0;
    this.direction;
  }
  start(level, bars) {
    this.win = false;
    this.direction = false;
    this.level = JSON.parse(JSON.stringify(level));
    this.bars = bars;
    this.kb.start();
  }
  stop() {
    this.win = false;
    this.kb.stop();
    this.moving = false;
    this.step = 0;
  }
  update() {
    if (this.win) {
      for (const bar of this.bars) {
        bar.update();
      }
      return true;
    }
    if (!this.moving) {
      this.step = 0;
      this.moving = true;
      if (this.kb.isKey("KeyW")) {
        this.direction = [-1, 0];
      }else if (this.kb.isKey("KeyA")) {
        this.direction = [0, 1];
      }else if (this.kb.isKey("KeyS")) {
        this.direction = [1, 0];
      }else if (this.kb.isKey("KeyD")) {
        this.direction = [0, -1];
      }else{
        this.moving = false;
      }
    }
    if (this.moving) {
      if (this.step === 0) {
        for (const bar of this.bars) {
          if (bar.calcVelocity(this.level.layout, this.direction)) {
            bar.rVel = this.direction[0];
            bar.cVel = this.direction[1];
            setPage("win-page", false);
            this.win = true;
            return true;
          }
        }
        for (const bar of this.bars) {
          this.level.layout = bar.updateLayout(this.level.layout, this.direction);
        }
      }
      for (const bar of this.bars) {
        bar.update();
      }
      this.step++;
      if (this.step === steps) {
        this.moving = false;
        for (const bar of this.bars) {
          bar.still();
        }
      }
    }
    return false;
  }
}