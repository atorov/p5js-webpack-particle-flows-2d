new p5((sketch) => {
    const s = sketch

    //     let data = {}

    //     const imgTileArr = []
    //     let imgSrc

    let pgGravityField

    s.preload = () => {
        // imgSrc = s.loadImage(...)
    }

    s.setup = () => {
        s.createCanvas(1280 / 3, 720 / 3) // TODO:
        s.colorMode(s.RGB, 1)
        s.imageMode(s.CENTER)
        // s.translate(s.width / 2, s.height / 2)

        s.background(0)

        // pgGravityField
        pgGravityField = s.createGraphics(s.width, s.height)
        pgGravityField.colorMode(s.RGB, 1)
    }

    s.draw = async () => {
        s.translate(s.width / 2, s.height / 2)

        // pgGravityField
        for (let x = 0; x < pgGravityField.width; x++) {
            for (let y = 0; y < pgGravityField.height; y++) {
                pgGravityField.stroke(s.noise(x / 75, y / 75, 100 + s.frameCount / 15))
                pgGravityField.point(x, y)
            }
        }
        s.image(pgGravityField, 0, 0)

        const offsetX = s.map(s.noise(s.frameCount / 25, 0, 200), 0, 1, -s.width / 2, s.width / 2)
        const offsetY = s.map(s.noise(0, s.frameCount / 25, 200), 0, 1, -s.height / 2, s.height / 2)
        s.stroke(255, 0, 0)
        s.fill(255, 0, 0)
        s.circle(offsetX, offsetY, 10)
    }

    //     s.keyPressed = () => {
    //         }
    //     }
}, 'p5-main')
