var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var size;
var text;
var monitor = null;
var blocks = [];
var stop = false;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bar', 'assets/sprites/bluebar.png');
    this.load.image('smallblock', 'assets/sprites/crate32.png');
    this.load.image('block', 'assets/sprites/crate.png');
    this.load.image('bullet', 'assets/sprites/bullet.png');
    this.load.image('car', 'assets/sprites/car90.png');
    this.load.image('tall', 'assets/sprites/flectrum.png');
    this.load.image('platform', 'assets/sprites/platform.png');
    this.load.image('vu', 'assets/sprites/vu.png');
}

function create ()
{
    var setImmovable = false;

    size = 'block';

    var ghost = this.add.image(400, 300, size).setAlpha(0.5).setDepth(1000).setOrigin(0);

    this.input.on('gameobjectdown', function (pointer, gameobject, event) {

        if (monitor)
        {
            monitor.setTint(0xffffff);
        }

        monitor = gameobject;
        monitor.setTint(0x00ff00);

        event.stopPropagation();

    }, this);

    this.input.on('pointermove', function (pointer) {

        ghost.x = pointer.x;
        ghost.y = pointer.y;

    });

    this.input.on('pointerdown', function (pointer) {

        var x = pointer.x;
        var y = pointer.y;

        var b = this.physics.add.image(x, y, size).setName(size + blocks.length).setInteractive();

        // b.setVelocityY(Phaser.Math.Between(-200, -300));
        // b.setVelocityY(100);

        b.setOrigin(0);
        b.setVelocityY(400);
        b.setCollideWorldBounds(true);
        b.setImmovable(setImmovable);
        b.setBounce(0.5);

        blocks.push(b);

        if (monitor)
        {
            monitor.setTint(0xffffff);
        }

        monitor = b;
        b.setTint(0x00ff00);

        console.clear();
        console.log(y);
        // window.track = b.body;

    }, this);

    this.input.keyboard.on('keydown-A', function () {
        size = 'block';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-B', function () {
        size = 'smallblock';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-C', function () {
        size = 'bar';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-D', function () {
        size = 'bullet';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-E', function () {
        size = 'car';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-F', function () {
        size = 'tall';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-G', function () {
        size = 'platform';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-H', function () {
        size = 'vu';
        ghost.setTexture(size);
    }, this);

    this.input.keyboard.on('keydown-I', function () {
        setImmovable = (setImmovable) ? false: true;
        console.log('setImmovable', setImmovable);
    }, this);

    this.input.keyboard.on('keydown-SPACE', function () {
        console.log('stop');
        this.physics.world.isPaused = true;
        stop = true;
    }, this);

    this.input.keyboard.on('keydown-UP', function () {
        monitor.setVelocityY(-800);
    }, this);

    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });

    if (Phaser.VERSION !== '3.17.0')
    {
        this.physics.add.collider(blocks, blocks);
    }
    // this.physics.add.collider(blocks, blocks);
}

function update (time)
{
    if (stop)
    {
        return;
    }

    if (Phaser.VERSION === '3.17.0')
    {
        this.physics.collide(blocks);
        // this.physics.collide(blocks, blocks);
    }

    if (Phaser.VERSION === '3.17.0')
    {
        if (monitor)
        {
            var my = monitor.y;
            var mh = monitor.height;
            var mhh = mh / 2;

            text.setText([
                'size: ' + size,
                '',
                'name: ' + monitor.name,
                'up: ' + monitor.body.blocked.up,
                'down: ' + monitor.body.blocked.down,
                'tup: ' + monitor.body.touching.up,
                'tdown: ' + monitor.body.touching.down,
                'wup: ' + monitor.body.worldBlocked.up,
                'wdown: ' + monitor.body.worldBlocked.down,
                'gy: ' + (my - mhh),
                'gbot: ' + ((my - mhh) + mh),
                'y: ' + monitor.body.y,
                'bot: ' + monitor.body.bottom,
                'vy: ' + monitor.body.velocity.y,
                'dy: ' + monitor.body._dy,
                'speed: ' + monitor.body.speed,
                '_sleep: ' + monitor.body._sleep,
                'sleeping: ' + monitor.body.sleeping
            ]);
        }
        else
        {
            text.setText('size: ' + size);
        }
    }
    else
    {
        if (monitor)
        {
            text.setText([
                'size: ' + size,
                '',
                'name: ' + monitor.name,
                'up: ' + monitor.body.blocked.up,
                'down: ' + monitor.body.blocked.down,
                'tup: ' + monitor.body.touching.up,
                'tdown: ' + monitor.body.touching.down,
                'gy: ' + monitor.y,
                'gbot: ' + (monitor.y - (monitor.height / 2) + monitor.height),
                'y: ' + monitor.body.y,
                'bot: ' + monitor.body.bottom,
                'vy: ' + monitor.body.velocity.y,
                'dy: ' + monitor.body._dy,
                'speed: ' + monitor.body.speed
            ]);
        }
        else
        {
            text.setText('size: ' + size);
        }
    }
}