var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2dab2d',
    scale: {
        mode: Phaser.Scale.ENVELOP,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1600,
            height: 1200
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('pic', 'assets/pics/zero-two.png');
}

function create ()
{
    this.add.image(0, 0, 'pic').setOrigin(0);
}
