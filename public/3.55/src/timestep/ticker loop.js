var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#9adaea',
    useTicker: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var image;
var time;
var delta;
var log;

//  600px in 20 seconds
//  600 / 20 = 30px per second
//  30 / 1000 = 0.03px per ms
var speed = (600 / 2) / 1000;

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('bunny', 'assets/sprites/bunny.png');
}

function create ()
{
    delta = this.add.text(0, 0);

    image = this.add.image(0, 200, 'bunny');

    time = this.add.text(400, 400);

    log = [];
}

function update (t, dt)
{
    image.x += speed * (dt);

    if (image.x > 1000)
    {
        image.x = 0;
    }

    log.push(this.sys.game.loop.delta.toString());

    if (log.length > 30)
    {
        log.shift();
    }

    time.setText('time: ' + this.sys.game.loop.time.toString());

    delta.setText(log);
}
