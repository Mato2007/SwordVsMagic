var cursors;
let keyA;
let keyS;
let keyD;
let keyW;
var player1;
var player1_m;
var player2;
var player2_m;
var p1_healt;
var p2_healt;
var background_platforma;
var sword;
var sword_m;
var explosion;
var explosion_t = 0;
var sword_t = 0;
var p1_life = 10; 
var p2_life = 10;
var udarec;
var expl;
var p1t;
var p2t;
class Scene1 extends Phaser.Scene {
    constructor () {
        super();
        this.state = {
            
        };
    };

    
    preload () {
        this.load.image('player1', './images/player1.png');
        this.load.image('player1_m', './images/player1_m.png');
        this.load.image('player2', './images/player2.png');
        this.load.image('player2_m', './images/player2_m.png');
        this.load.image('background', './images/background.png');
        this.load.image('100healt', './images/100healt.png');
        this.load.image('75healt', './images/75healt.png');
        this.load.image('50healt', './images/50healt.png');
        this.load.image('25healt', './images/25healt.png');
        this.load.image('15healt', './images/15healt.png');
        this.load.image('0healt', './images/0healt.png');
        this.load.image('p1_z_mecom', './images/p1_z_mecom.png');
        this.load.image('p1_z_mecom_m', './images/p1_z_mecom_m.png');
        this.load.image('p2_ex', './images/player2_ex.png');
        this.load.image('p2_ex_m', './images/player2_ex_m.png');
        this.load.image('explosion', './images/explosion.png');
        this.load.image('mec', './images/mec.png');
        this.load.image('mec_m', './images/mec_m.png');
        this.load.image('p1_brez_meca', './images/p1_brez_meca.png');
        this.load.image('p1_brez_meca_m', './images/p1_brez_meca_m.png');
        this.load.audio('hit', ['./audio/hit.mp3']);
        this.load.audio('expl', ['./audio/explosion.mp3']); 
        this.load.audio('muzika', ['./audio/muzika.mp3']);
    }

    create () {
        this.add.image(900, 400, 'background')
        cursors = this.input.keyboard.createCursorKeys();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        player1 = this.physics.add.image(450, 560, 'player1')
        player2 = this.physics.add.image(1350, 560, 'player2');
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);
        p1_healt = this.add.image(100, 100, '100healt');
        p2_healt = this.add.image(1700, 100, '100healt');
        sword = this.physics.add.sprite(player1.x + 100, 560, 'mec');
        sword.setScale(0.62);
        sword.body.setAllowGravity(false);
        sword.visible = false;
        sword_m = this.physics.add.sprite(player1.x - 100, 560, 'mec_m');
        sword_m .body.setAllowGravity(false);
        sword_m.setScale(0.62);
        sword_m.visible = false;
        var music = this.sound.add('muzika', {volume: 0.5});
        music.play();
        this.physics.world.bounds.height -= 150;
        udarec = this.sound.add('hit');
        expl = this.sound.add('expl');
        p1t = this.add.text(10, 10, "Player 1", {fontSize: '32px', fill: '#000000', fontWeight: 'bold', fontFamily: 'fantasy'});
        p2t = this.add.text(10, 10, "Player 2", {fontSize: '32px', fill: '#000000', fontWeight: 'bold', fontFamily: 'fantasy'});
        // Debug
        window.scene = this;
        window.player1 = player1;
        window.player2 = player2;
        this.physics.add.overlap(player2, sword, this.mec);
        this.physics.add.overlap(player2, sword_m, this.mec_m);
        

    }
    
    

    update() {
        
        sword.x = (player1.x + 115);
        sword.y = (player1.y + 26);
        sword_m.x = (player1.x - 115);
        sword_m.y = (player1.y + 26);
        p1t.x = (player1.x - 60);
        p1t.y = (player1.y - 170);
        p2t.x = (player2.x - 60);
        p2t.y = (player2.y - 170);
        

        sword.visible = false;
        sword_m.visible = false;

        if (keyS.isDown && !sword_t) {
            sword_t = 1;
        }
        var attacking = sword_t > 0 && sword_t < 5; 

        if(keyA.isDown){
            player1.setVelocityX(-135);
            if(attacking){
                player1.setTexture("p1_brez_meca_m");
                sword_m.visible = true;
                udarec.play();
            } else{
                player1.setTexture("player1_m");

            }
        }
        else if(keyD.isDown){
            player1.setVelocityX(135)
            if(attacking){
                player1.setTexture("p1_brez_meca");
                sword.visible = true;
                udarec.play();
            } else {
                player1.setTexture("player1");
            }
        } else {
            player1.setVelocityX(0);
            if(attacking){
                player1.setTexture("p1_brez_meca");
                sword.visible = true;
                udarec.play();
            } else {
                player1.setTexture("player1");
                sword.visible = false;
            }
        }
        if(keyW.isDown  && player1.body.y > 450){
            player1.setVelocityY(-300)
        }

        if(cursors.right.isDown){
            player2.setTexture('player2_m');
            player2.setVelocityX(100)
            if(cursors.down.isDown && explosion_t == 0){
                explosion = this.physics.add.image(player2.y + 10, player2.x - 300, 'explosion');
                explosion.setCollideWorldBounds(true);
                explosion.setScale(1.5);
                explosion.y = (player2.y + 10);
                explosion.x = (player2.x + 300);
                this.physics.add.overlap(player1, explosion, this.overlap_f);
                explosion_t = 1;
            }
            
        } else {
            if(cursors.left.isDown){
                player2.setVelocityX(-100)
                player2.setTexture("player2")
            }

            if(cursors.down.isDown && explosion_t == 0){
                explosion = this.physics.add.image(player2.y + 10, player2.x - 300, 'explosion');
                explosion.setCollideWorldBounds(true);
                explosion.setScale(1.5);
                explosion.y = (player2.y + 10);
                explosion.x = (player2.x - 300);
                this.physics.add.overlap(player1, explosion, this.overlap_f);
                explosion_t = 1;
            }

        }
        if(!cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown){
            player2.setTexture("player2")
        }
        if(cursors.up.isDown && player2.body.y > 450){
            player2.setVelocityY(-200)
        }
        if(!cursors.left.isDown && !cursors.right.isDown || cursors.left.isDown == true && cursors.right.isDown == true){
            player2.setVelocityX(0)
        }
        if(explosion_t > 0){
            if (explosion_t == 1) expl.play();
            explosion_t += 1;
            explosion.setScale(explosion_t/15)
            if(explosion_t > 50){
                explosion_t = 0
                explosion.destroy();
            }
        }
        if(sword_t > 0){
            sword_t += 1;
            if(sword_t > 40){
                sword_t = 0;
            }
        }
        
        if(p1_life == 10 || p1_life == 9){
            p1_healt.setTexture("100healt");
        }
        else if(p1_life == 8 || p1_life == 7 ){
            p1_healt.setTexture("75healt")
        }
        else if( p1_life == 6 || p1_life == 5){
            p1_healt.setTexture("50healt")
        }
        else if(p1_life == 4 || p1_life == 3 ){
            p1_healt.setTexture("25healt")
        }
        else if(p1_life == 1 || p1_life == 2){
            p1_healt.setTexture("15healt")
        }
        else if(p1_life == 0){
            p1_healt.setTexture("0healt");
            alert("Player 2 je zmagal!");
            this.registry.destroy(); 
            this.events.off();
            this.scene.restart();
            p1_life = 10
            p2_life = 10
        }
        if(p2_life == 10 || p2_life == 9){
            p2_healt.setTexture("100healt");
        }
        else if(p2_life == 8 || p2_life == 7 ){
            p2_healt.setTexture("75healt")
        }
        else if( p2_life == 6 || p2_life == 5){
            p2_healt.setTexture("50healt")
        }
        else if(p2_life == 4 || p2_life == 3 ){
            p2_healt.setTexture("25healt")
        }
        else if(p2_life == 1 || p2_life == 2){
            p2_healt.setTexture("15healt")
        }
        else if(p2_life == 0){
            p2_healt.setTexture("0healt");
            alert("Player 1 je zmagal!");
            this.registry.destroy(); 
            this.events.off();
            this.scene.restart();
            p2_life = 10
            p1_life = 10
        }
    }
    

    overlap_f(){
        if (!explosion.didhit) {
            explosion.didhit = 1;
            p1_life -= 1
        }
    }
    mec(){
        if(keyS.isDown && !keyA.isDown){
                if(!sword_t){
                    sword_t = 1;
                    p2_life -= 1
                    return;
                }
            
        }
    }
    mec_m(){
        if(keyS.isDown && keyA.isDown){
            if(!sword_t){
                sword_t = 1;
                p2_life -= 1
                return;
            }
        
    }
    }
    
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 200 },
            //debug: true
        }
    },    
    scene: [ Scene1 ]
};
const game = new Phaser.Game(config);


    
