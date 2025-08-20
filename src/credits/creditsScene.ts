export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super("credits");
  }
  preload() {
    this.load.image("creditsimg", "/assets/creditsimg.png");
  }
  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .text(centerX, centerY - 200, "Thank you for playing!", {
        fontSize: "36px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 140, "Thanks for Kevin!", {
        fontSize: "24px",
        color: "#ffffff",
        align: "center",
        wordWrap: { width: 400 },
      })
      .setOrigin(0.5);

    this.add
      .image(centerX, centerY - 50, "creditsimg")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .text(centerX, centerY + 20, "creators:", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 70, "Damiano Italiano", {
        fontSize: "24px",
        color: "#ffffff",
        align: "center",
        wordWrap: { width: 400 },
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 170, "Back to menu", {
        fontSize: "18px",
        color: "#ff0000ff",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("mainMenu");
    });
  }
}
