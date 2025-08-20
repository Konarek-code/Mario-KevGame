import Phaser from "phaser";

export default class ScorePanel {
  private scene: Phaser.Scene;
  private coinIcon: Phaser.GameObjects.Image;
  private bagIcon: Phaser.GameObjects.Image;
  private coinText: Phaser.GameObjects.Text;
  private bagText: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Rectangle;

  private coinCount = 0;
  private bagCount = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.background = this.scene.add
      .rectangle(0, 0, 180, 40, 0x000000, 0.5)
      .setOrigin(0)
      .setStrokeStyle(2, 0xffffff)
      .setScrollFactor(0);

    this.coinIcon = this.scene.add
      .image(10, 8, "coin")
      .setOrigin(0)
      .setScrollFactor(0);

    this.coinText = this.scene.add
      .text(40, 8, "x: 0", {
        font: "18px Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setScrollFactor(0);

    this.bagIcon = this.scene.add
      .image(96, 8, "powder")
      .setOrigin(0)
      .setScrollFactor(0);

    this.bagText = this.scene.add
      .text(124, 8, "x: 0", {
        font: "18px Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setScrollFactor(0);
  }

  collectCoin() {
    this.coinCount++;
    this.coinText.setText("x" + this.coinCount);
  }

  collectBag() {
    this.bagCount++;
    this.bagText.setText("x" + this.bagCount);
  }

  reset() {
    this.coinCount = 0;
    this.bagCount = 0;
    this.coinText.setText("x0");
    this.bagText.setText("x0");
  }
  getCoinCount() {
    return this.coinCount;
  }

  getBagCount() {
    return this.bagCount;
  }
}
