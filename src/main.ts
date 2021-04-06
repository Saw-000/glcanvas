import { GLCanvas } from "./app/GLCanvas"

function main() {
    let canvas = <HTMLCanvasElement>document.getElementById("canvas")
    canvas.width = 800
    canvas.height = 600

    const glCanvas = new GLCanvas(canvas)
    glCanvas.run()
}

main()