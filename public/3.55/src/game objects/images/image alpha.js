var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('bunny', 'assets/sprites/bunny.png');
}

function create ()
{
    var bunny = this.add.image(400, 300, 'bunny');

    bunny.alpha = 0.5;
}
