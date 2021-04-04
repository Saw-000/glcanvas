import { GLState } from "../gl/GLState"
import { PointShader } from "../gl/shader/PointShader"
import { ShaderManager } from "../gl/shader/ShaderManager"
import { ShaderType } from "../gl/shader/ShaderType"

// WebGLで描画するためのキャンバス
export class GLCanvas {

    // コンストラクタ
    constructor(canvas: HTMLCanvasElement) {
        GLState.context = canvas.getContext("webgl")
        GLState.width = canvas.width
        GLState.height = canvas.height
        ShaderManager.load()
    }

    // 描画する
    private draw() {
        const gl = GLState.context
        gl.clearColor(0.2, 0.2, 0.2, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.viewport(0, 0, GLState.width, GLState.height)

        const shader = <PointShader>ShaderManager.getShader(ShaderType.PointShader)

        const vertices = [
            0, 0,
            0, 0.5,
            0.7, 0,]

        shader.draw(gl.TRIANGLES, vertices)
    }

    // アニメーションループを開始する
    public run() {
        setInterval(this.draw, 1000 / 30)
    }
}