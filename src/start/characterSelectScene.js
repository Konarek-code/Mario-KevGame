export default class CharacterSelectScene extends Phaser.Scene {
    selectedCharacter = "player1";
    descriptionText;
    constructor() {
        super("characterSelect");
    }
    preload() {
        this.load.image("hero1", "/assets/hero1.png");
        this.load.image("hero2", "/assets/hero2.png");
        this.load.image("hero3", "/assets/hero3.png");
    }
    create() {
        this.add
            .text(this.scale.width / 2, 80, "Wybierz swoją postać", {
            fontSize: "30px",
            color: "#ffffff",
        })
            .setOrigin(0.5);
        const p1 = this.add
            .image(this.scale.width / 2 - 200, 200, "hero1")
            .setInteractive();
        const p2 = this.add
            .image(this.scale.width / 2, 200, "hero2")
            .setInteractive();
        const p3 = this.add
            .image(this.scale.width / 2 + 200, 200, "hero3")
            .setInteractive();
        this.add
            .text(p1.x, p1.y + 90, "Kevin", {
            fontSize: "22px",
            color: "#ffffff",
        })
            .setOrigin(0.5);
        this.add
            .text(p2.x, p2.y + 90, "CezaryWikary", {
            fontSize: "22px",
            color: "#ffffff",
        })
            .setOrigin(0.5);
        this.add
            .text(p3.x, p3.y + 90, "Kuba", {
            fontSize: "22px",
            color: "#ffffff",
        })
            .setOrigin(0.5);
        this.descriptionText = this.add
            .text(this.scale.width / 2, 370, "", {
            fontSize: "20px",
            color: "#dddddd",
            align: "center",
            wordWrap: { width: 400 },
        })
            .setOrigin(0.5);
        // Opisy
        const descriptions = {
            hero1: "Kevin is experienced and skilled.",
            hero2: "Czarek is a true fighter who can take a hit and keep going.",
            hero3: "He may lose to the air but likes to give it his all.",
        };
        p1.on("pointerdown", () => {
            this.selectedCharacter = "hero1";
            p1.setTint(0x00ff00);
            p2.clearTint();
            p3.clearTint();
            this.descriptionText.setText(descriptions.hero1);
        });
        p2.on("pointerdown", () => {
            this.selectedCharacter = "hero2";
            p2.setTint(0x00ff00);
            p1.clearTint();
            p3.clearTint();
            this.descriptionText.setText(descriptions.hero2);
        });
        p3.on("pointerdown", () => {
            this.selectedCharacter = "hero3";
            p3.setTint(0x00ff00);
            p2.clearTint();
            p1.clearTint();
            this.descriptionText.setText(descriptions.hero3);
        });
        const nextBtn = this.add
            .text(this.scale.width / 2, 450, "DALEJ", {
            fontSize: "28px",
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: { x: 10, y: 0 },
        })
            .setOrigin(0.5)
            .setInteractive();
        nextBtn.on("pointerdown", () => {
            this.scene.start("tutorial", {
                selectedCharacter: this.selectedCharacter,
            });
        });
    }
}
