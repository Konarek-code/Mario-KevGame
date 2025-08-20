export default class TutorialScene extends Phaser.Scene {
  private selectedCharacter!: string;

  constructor() {
    super("tutorial");
  }

  init(data: { selectedCharacter: string }) {
    this.selectedCharacter = data.selectedCharacter;
  }

  create() {
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      500,
      300,
      0x000000,
      0.8
    );

    this.add
      .text(this.scale.width / 2, 200, "Controls:\n← → – Move\n↑ – Jump", {
        fontSize: "24px",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    const okBtn = this.add
      .text(this.scale.width / 2, 360, "OK", {
        fontSize: "28px",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    okBtn.on("pointerdown", () => {
      this.scene.start("game", { selectedCharacter: this.selectedCharacter });
    });
  }
}
