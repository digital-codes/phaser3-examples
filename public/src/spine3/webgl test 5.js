class Example extends Phaser.Scene
{
    controls;

    constructor ()
    {
        super({
            pack: {
                files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/3.8.95/SpinePluginDebug.js', sceneKey: 'spine' }
                ]
            }
        });
    }

    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('logo', 'assets/sprites/phaser.png');

        this.load.setPath('assets/spine/3.8/raptor').spine('raptor', 'raptor-pro.json', 'raptor-pro.atlas');
        this.load.setPath('assets/spine/3.8/vine').spine('vine', 'vine-pro.json', 'vine-pro.atlas');
        this.load.setPath('assets/spine/3.8/coin').spine('coin', 'coin-pro.json', 'coin-pro.atlas');
        this.load.setPath('assets/spine/3.8/tank').spine('tank', 'tank-pro.json', 'tank-pro.atlas');
    }

    create ()
    {
        this.add.image(0, 0, 'logo').setOrigin(0);

        this.add.spine(100, 550, 'vine', 'grow', true).setScale(0.7);
        this.add.spine(400, 550, 'vine', 'grow', true).setScale(0.6);
        this.add.spine(700, 550, 'vine', 'grow', true).setScale(0.65);

        this.add.spine(700, 200, 'coin', 'rotate', true).setScale(0.3);

        this.add.spine(700, 520, 'tank', 'shoot', true).setScale(0.25);

        this.add.spine(200, 520, 'raptor', 'roar', true).setScale(0.3);

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.5,
            drag: 0.01,
            maxSpeed: 1.2
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }

    update (time, delta)
    {
        this.controls.update(delta);
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: Example
};

const game = new Phaser.Game(config);
