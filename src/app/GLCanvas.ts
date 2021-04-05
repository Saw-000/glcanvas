import { CanvasView } from "../gl/component/CanvasView"
import { GLState } from "../gl/GLState"
import { Vector } from "../gl/math/Vector"
import { ShaderManager } from "../gl/shader/ShaderManager"
import { Texture } from "../gl/texture/Texture"

// WebGLで描画するためのキャンバス
export class GLCanvas {

    // Viewコンポーネント
    private canvasView: CanvasView

    // コンストラクタ
    constructor(canvas: HTMLCanvasElement) {
        GLState.context = canvas.getContext("webgl")
        GLState.width = canvas.width
        GLState.height = canvas.height
        ShaderManager.load()
        this.canvasView = new CanvasView(100, 100, new Vector())

        const texture = new Texture()
        texture.onload = () => {
            this.canvasView.setTexture(texture)
        }
        texture.createTextureFromResourceName("res/twitter_icon.jpg")
    }

    // 描画する
    private draw() {
        const gl = GLState.context
        gl.clearColor(0.8, 0.8, 0.8, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.viewport(0, 0, GLState.width, GLState.height)

        this.canvasView.draw()
    }

    // アニメーションループを開始する
    public run() {
        setInterval(this.draw.bind(this), 1000 / 30)
    }
}