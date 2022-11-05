new p5((sketch) => {
    const s = sketch

    const counterMin = 0
    const counterMax = 450
    const counterInit = 450
    let counter = counterInit
    let counterInc = 1

    let imgSrc
    let pgGravityField
    let pgSrc

    s.preload = () => {
        imgSrc = s.loadImage('/assets/source-3.jpg')
    }

    s.setup = () => {
        s.createCanvas(1280 / 20, 720 / 20) // TODO:
        s.noiseSeed(117)

        // pgSrc
        pgSrc = s.createGraphics(s.width, s.height)
        pgSrc.imageMode(s.CENTERS)
        pgSrc.image(imgSrc, 0, 0, pgSrc.width, pgSrc.height)

        // pgGravityField
        pgGravityField = s.createGraphics(s.width, s.height)
    }

    s.draw = async () => {
        s.translate(s.width / 2, s.height / 2)

        if (counter <= counterMin) {
            counterInc = Math.abs(counterInc)
        }
        else if (counter >= counterMax) {
            counterInc = -Math.abs(counterInc)
        }

        counter += counterInc
        console.log('::: counter:', counter)

        const distortion = s.constrain((counter / counterMax) ** 2, 0, 1)
        console.log('::: distortion:', distortion)

        const bgnd = s.map(s.noise(counter / 155), 0, 1, 0, 255)
        s.background(bgnd)

        // pgSrc
        // s.imageMode(s.CENTERS)
        // s.image(pgSrc, -s.width / 2, -s.height / 2, s.width, s.height)

        // pgGravityField
        for (let x = 0; x < pgGravityField.width; x++) {
            for (let y = 0; y < pgGravityField.height; y++) {
                const re = s.noise(x / 75, y / 75, 110 + counter / 125) * 255
                const gr = s.noise(x / 75, y / 75, 120 + counter / 125) * 255
                const bl = s.noise(x / 75, y / 75, 130 + counter / 125) * 255
                pgGravityField.stroke(re, gr, bl)
                pgGravityField.strokeWeight(1)
                pgGravityField.point(x, y)
            }
        }

        // Display
        for (let x = 0; x < pgSrc.width; x++) {
            for (let y = 0; y < pgSrc.height; y++) {
                const srcCo = pgSrc.get(x, y)
                const parCo = srcCo
                const parRe = s.red(parCo)
                const parGr = s.green(parCo)
                const parBl = s.blue(parCo)

                const gfCo = pgGravityField.get(x, y)
                const gfRe = s.red(gfCo)
                const gfGr = s.green(gfCo)
                const gfBl = s.blue(gfCo)

                const parBr = s.brightness(gfCo)
                const parAl = s.map(parBr * distortion, 100, 0, 0, 255) / (255 * distortion)

                const parShiftX = s.map(gfRe, 0, 255, -s.width, s.width) * distortion
                const parShiftY = s.map(gfGr, 0, 255, -s.height, s.height) * distortion
                const parSize = s.map(gfBl, 0, 255, 1.5, 1.5 + ((s.width ** 2 + s.height ** 2) ** 0.5) * 0.5 * distortion)

                s.noStroke()
                s.fill(parRe, parGr, parBl, parAl)
                s.ellipseMode(s.CENTER)
                s.circle(
                    x + parShiftX - s.width / 2,
                    y + parShiftY - s.height / 2,
                    parSize,
                )
            }
        }
    }
}, 'p5-main')
