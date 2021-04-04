import { GLCanvas } from "./app/GLCanvas"

function main() {
    let canvas = <HTMLCanvasElement>document.getElementById("canvas")
    canvas.width = 600
    canvas.height = 400

    const glCanvas = new GLCanvas(canvas)
    glCanvas.run()
}

main()