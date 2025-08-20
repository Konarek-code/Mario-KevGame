import Phaser from "phaser";
import ScorePanel from "../score/scorePanel";
export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    scorePanel;
    coins;
    bags;
    enemies;
    waterZones;
    abyssZones;
    finishZone;
    selectedCharacterKey = "player1";
    hasAnimations = false;
    moveLeft = false;
    moveRight = false;
    jump = false;
    bullets;
    currentLevelKey = "level1";
    movingPlatforms;
    constructor() {
        super("game");
        window.addEventListener("resize", () => {
            this.scale.refresh();
        });
    }
    init(data) {
        if (data.selectedCharacter) {
            this.selectedCharacterKey = data.selectedCharacter;
        }
        if (data.levelKey) {
            this.currentLevelKey = data.levelKey;
        }
    }
    preload() {
        this.load.image("background", "/assets/background.png");
        this.load.image("tiles", "/assets/world_tileset.png");
        this.load.tilemapTiledJSON("level1", "/assets/level1.tmj");
        this.load.image("coin", "/assets/coin.png");
        this.load.image("coinS", "/assets/coinS.png");
        this.load.image("bag", "/assets/bag.png");
        this.load.image("powder", "/assets/powderS.png");
        this.load.image("enemy", "/assets/enemy.png");
        this.load.image("finish", "/assets/finish.png");
        this.load.image("btnLeft", "/assets/ui/left_arrow.png");
        this.load.image("btnRight", "/assets/ui/right_arrow.png");
        this.load.image("btnJump", "/assets/ui/jump_button.png");
        this.load.audio("music", "/assets/sounds/music.mp3");
        this.load.image("lava", "/assets/lava.png");
        this.load.tilemapTiledJSON("level2", "/assets/level2.tmj");
        this.load.image("mv_platform", "/assets/mv_platform.png");
        if (!this.textures.exists("player1")) {
            this.load.image("player1", "/assets/player.png");
        }
        if (!this.textures.exists("player2")) {
            this.load.image("player2", "/assets/cez.png");
        }
        if (!this.textures.exists("player3")) {
            this.load.image("player3", "/assets/player3.png");
        }
        if (!this.textures.exists("player_sheet")) {
            this.load.spritesheet("player_sheet", "/assets/player.png", {
                frameWidth: 32,
                frameHeight: 60,
            });
        }
    }
    create() {
        const music = this.sound.add("music", {
            loop: true,
            volume: 0.5,
        });
        music.play();
        const leftButton = this.add
            .image(60, this.scale.height - 60, "btnLeft")
            .setInteractive()
            .setScrollFactor(0)
            .setAlpha(0.7)
            .setScale(0.5)
            .setDepth(100);
        const rightButton = this.add
            .image(160, this.scale.height - 60, "btnRight")
            .setInteractive()
            .setScrollFactor(0)
            .setAlpha(0.7)
            .setScale(0.5)
            .setDepth(100);
        const jumpButton = this.add
            .image(this.scale.width - 80, this.scale.height - 60, "btnJump")
            .setInteractive()
            .setScrollFactor(0)
            .setAlpha(0.7)
            .setScale(0.5)
            .setDepth(100);
        leftButton.on("pointerdown", () => (this.moveLeft = true));
        leftButton.on("pointerup", () => (this.moveLeft = false));
        leftButton.on("pointerout", () => (this.moveLeft = false));
        rightButton.on("pointerdown", () => (this.moveRight = true));
        rightButton.on("pointerup", () => (this.moveRight = false));
        rightButton.on("pointerout", () => (this.moveRight = false));
        jumpButton.on("pointerdown", () => (this.jump = true));
        jumpButton.on("pointerup", () => (this.jump = false));
        jumpButton.on("pointerout", () => (this.jump = false));
        this.add.image(0, 0, "background").setOrigin(0).setScrollFactor(0);
        this.scorePanel = new ScorePanel(this);
        this.bullets = this.physics.add.group();
        const map = this.make.tilemap({ key: this.currentLevelKey });
        const tileset = map.addTilesetImage("world_tileset", "tiles");
        this.enemies = this.physics.add.group();
        const mapOffsetY = this.scale.height - map.heightInPixels;
        const ground = map.createLayer("warstwa", tileset, 0, mapOffsetY);
        if (ground) {
            ground.setCollision([
                1, 2, 5, 6, 10, 11, 17, 18, 22, 49, 50, 56, 65, 81, 88, 132, 165, 179,
            ]);
        }
        const heroToPlayerMap = {
            hero1: "player1",
            hero2: "player2",
            hero3: "player3",
        };
        const playerKey = heroToPlayerMap[this.selectedCharacterKey] || "player1";
        this.player = this.physics.add.sprite(32, 100, playerKey);
        this.movingPlatforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(32, 60);
        this.player.body.setOffset(0, 0);
        if (ground) {
            this.physics.add.collider(this.player, ground);
        }
        this.physics.world.setBounds(0, mapOffsetY, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        const pickups = map.getObjectLayer("pickups");
        this.coins = this.physics.add.staticGroup();
        this.bags = this.physics.add.staticGroup();
        if (pickups && pickups.objects) {
            pickups.objects.forEach((obj) => {
                if (obj.type === "Coin") {
                    const x = obj.x ?? 0;
                    const y = (obj.y ?? 0) + mapOffsetY;
                    const coin = this.coins.create(x, y, "coinS").setOrigin(0.5, 1);
                    console.log("Adding coin at", x, y);
                }
                else if (obj.type === "Bag") {
                    const x = obj.x ?? 0;
                    const y = (obj.y ?? 0) + mapOffsetY;
                    const bag = this.bags.create(x, y, "bag").setOrigin(0.5, 1);
                    console.log("Adding bag at", x, y);
                }
            });
        }
        leftButton.setDepth(10);
        rightButton.setDepth(10);
        jumpButton.setDepth(10);
        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            coin.destroy();
            this.scorePanel.collectCoin();
        });
        this.physics.add.overlap(this.player, this.bags, (player, bag) => {
            bag.destroy();
            this.scorePanel.collectBag();
        });
        const enemyLayer = map.getObjectLayer("ws");
        if (enemyLayer && enemyLayer.objects) {
            enemyLayer.objects.forEach((obj) => {
                if (obj.type === "enemy") {
                    const x = obj.x ?? 0;
                    const y = (obj.y ?? 0) + mapOffsetY;
                    const enemy = this.enemies.create(x, y, "enemy").setOrigin(0.5, 1);
                    enemy.setBounce(1);
                    enemy.setCollideWorldBounds(true);
                    enemy.setVelocityX(50);
                    enemy.body.setSize(enemy.width, enemy.height - 10);
                    enemy.body.setOffset(0, 10);
                }
            });
        }
        if (ground) {
            this.physics.add.collider(this.enemies, ground);
        }
        this.physics.add.collider(this.player, this.enemies, () => {
            this.sound.stopAll();
            this.scene.restart();
        });
        this.waterZones = this.physics.add.staticGroup();
        this.abyssZones = this.physics.add.staticGroup();
        const obstacleLayer = map.getObjectLayer("obstacles");
        if (obstacleLayer && obstacleLayer.objects) {
            obstacleLayer.objects.forEach((obj) => {
                const x = obj.x ?? 0;
                const y = (obj.y ?? 0) + mapOffsetY;
                const width = obj.width ?? 32;
                const height = obj.height ?? 32;
                if (obj.type === "water") {
                    const zone = this.add.zone(x + width / 2, y + height / 2, width, height);
                    this.physics.add.existing(zone, true);
                    this.waterZones.add(zone);
                }
                if (obj.type === "abyss") {
                    const zone = this.add.zone(x + width / 2, y + height / 2, width, height);
                    this.physics.add.existing(zone, true);
                    this.abyssZones.add(zone);
                }
                if (obj.type === "shooters") {
                    const direction = obj.properties?.find((p) => p.name === "direction")?.value || "up";
                    const delay = obj.properties?.find((p) => p.name === "delay")?.value || 3000;
                    this.time.addEvent({
                        delay: delay,
                        loop: true,
                        callback: () => {
                            this.fireBullet(x + width / 2, y + height, direction);
                        },
                    });
                }
            });
        }
        this.physics.add.overlap(this.player, this.bullets, () => {
            this.sound.stopAll();
            this.scene.restart();
        });
        this.physics.add.collider(this.player, this.waterZones, () => {
            this.scene.restart();
            this.sound.stopAll();
        });
        this.physics.add.collider(this.player, this.abyssZones, () => {
            this.scene.restart();
            this.sound.stopAll();
        });
        if (this.selectedCharacterKey === "player_sheet") {
            this.anims.create({
                key: "run",
                frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1,
            });
            this.anims.create({
                key: "idle",
                frames: [{ key: "player", frame: 0 }],
                frameRate: 10,
            });
            this.hasAnimations = true;
        }
        this.finishZone = this.physics.add.staticGroup();
        const goalLayer = map.getObjectLayer("goals");
        if (goalLayer && goalLayer.objects) {
            goalLayer.objects.forEach((obj) => {
                if (obj.type === "finish") {
                    const x = obj.x ?? 0;
                    const y = (obj.y ?? 0) + mapOffsetY + 34;
                    const zone = this.finishZone
                        .create(x, y, "finish")
                        .setOrigin(0.5, 0.5)
                        .setAlpha(1);
                }
            });
        }
        this.physics.add.overlap(this.player, this.finishZone, () => {
            this.sound.stopAll();
            this.add
                .text(this.cameras.main.centerX, this.cameras.main.centerY, "🎉 Level Complete 🎉", {
                fontSize: "32px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center",
            })
                .setOrigin(0.5)
                .setScrollFactor(0);
            this.time.delayedCall(2000, () => {
                if (this.currentLevelKey === "level1") {
                    this.scene.start("game", {
                        selectedCharacter: this.selectedCharacterKey,
                        levelKey: "level2",
                    });
                }
                else if (this.currentLevelKey === "level2") {
                    this.scene.start("credits");
                }
            });
        });
        const platformObjects = map.getObjectLayer("Platforms");
        if (platformObjects && platformObjects.objects) {
            platformObjects.objects.forEach((obj) => {
                const x = obj.x ?? 0;
                const y = (obj.y ?? 0) + mapOffsetY;
                const platform = this.movingPlatforms
                    .create(x, y, "mv_platform")
                    .setOrigin(0, 0.5);
                platform.body.setAllowGravity(false);
                platform.body.setImmovable(true);
                platform.setScale(1 / 2.5);
                platform.setData("startX", x);
                platform.setData("range", 50);
                platform.setData("speed", 50);
                platform.setData("direction", 1);
            });
        }
        this.physics.add.collider(this.player, this.movingPlatforms);
    }
    update() {
        const speed = 160;
        const jumpSpeed = -400;
        const onGround = this.player.body.blocked
            .down;
        if (this.cursors.left?.isDown || this.moveLeft) {
            this.player.setVelocityX(-speed);
            if (this.hasAnimations)
                this.player.anims.play("run", true);
            this.player.flipX = true;
        }
        else if (this.cursors.right?.isDown || this.moveRight) {
            this.player.setVelocityX(speed);
            if (this.hasAnimations)
                this.player.anims.play("run", true);
            this.player.flipX = false;
        }
        else {
            this.player.setVelocityX(0);
            if (this.hasAnimations)
                this.player.anims.play("idle", true);
        }
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) || this.jump) &&
            onGround) {
            this.player.setVelocityY(jumpSpeed);
            this.jump = false;
        }
        this.movingPlatforms.children.iterate((platform) => {
            if (!platform)
                return null;
            const p = platform;
            const startX = p.getData("startX");
            const range = p.getData("range");
            const speed = p.getData("speed");
            let direction = p.getData("direction");
            p.x += (direction * speed * this.game.loop.delta) / 1000;
            if (p.x > startX + range) {
                direction = -1;
            }
            else if (p.x < startX) {
                direction = 1;
            }
            p.setData("direction", direction);
            if (p.body !== null) {
                p.body.updateFromGameObject();
            }
            return null;
        });
    }
    fireBullet(x, y, direction) {
        const bullet = this.bullets.create(x, y, "lava");
        bullet.setScale(0.5);
        if (bullet.body) {
            bullet.setGravity(0, 0);
        }
        const speed = 100;
        switch (direction) {
            case "up":
                bullet.setVelocityY(-600);
                break;
            case "down":
                bullet.setVelocityY(speed);
                break;
            case "left":
                bullet.setVelocityX(-speed);
                break;
            case "right":
                bullet.setVelocityX(speed);
                break;
        }
        this.time.delayedCall(3000, () => bullet.destroy());
    }
}
