var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('block', 'assets/sprites/block.png');
}

function create ()
{
    var image = this.add.image(100, 100, 'block');

    this.tweens.add({

        targets: image,

        x: { value: 700, duration: 4000, ease: 'Power2', delay: 500 },

        y: { value: 400, duration: 1500, ease: 'Bounce.easeOut' },

        scaleX: { value: 1.5, duration: 2000, delay: 2000, yoyo: true },

        scaleY: { value: 4, duration: 2000, delay: function (target, key, value, targetIndex) { return 1000 + Math.random() * 2000 }, yoyo: true },

        delay: 1000

    });

}
