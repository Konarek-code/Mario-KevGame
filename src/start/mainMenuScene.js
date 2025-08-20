export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }
    preload() {
        this.load.image("menu-bg", "../../assets/menu-bg.png");
    }
    create() {
        const bg = this.add
            .image(0, 0, "menu-bg")
            .setOrigin(0)
            .setDisplaySize(this.scale.gameSize.width, this.scale.gameSize.height);
        this.scale.on("resize", (gameSize) => {
            bg.setDisplaySize(gameSize.width, gameSize.height);
        });
        const playBtn = this.add
            .text(this.scale.gameSize.width / 2, 400, "PLAY", {
            fontSize: "32px",
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: { x: 20, y: 10 },
        })
            .setOrigin(0.5)
            .setInteractive();
        playBtn.on("pointerdown", () => {
            this.scene.start("characterSelect");
        });
    }
}
