var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#efefef',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.setPath('assets/input');
    this.load.image([ 'p', 'h', 'a', 's', 'e', 'r' ]);
}

function create ()
{
    this.input.addPointer(5);

    var p = this.add.image(0, 0, 'p').setInteractive();
    var h = this.add.image(0, 0, 'h').setInteractive();
    var a = this.add.image(0, 0, 'a').setInteractive();
    var s = this.add.image(0, 0, 's').setInteractive();
    var e = this.add.image(0, 0, 'e').setInteractive();
    var r = this.add.image(0, 0, 'r').setInteractive();

    Phaser.Actions.GridAlign([ p, h, a, s, e, r ], {
        width: 6,
        cellWidth: 132,
        cellHeight: 200,
        x: 68,
        y: 300
    });

    this.input.on('gameobjectdown', function (pointer, gameObject) {

        gameObject.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);

    });

    this.input.on('gameobjectup', function (pointer, gameObject) {

        gameObject.clearTint();

    });
}
