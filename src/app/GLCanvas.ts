import { Color } from "../gl/color/Color"
import { CanvasView } from "../gl/component/CanvasView"
import { View } from "../gl/component/View"
import { GLState } from "../gl/GLState"
import { Vector } from "../gl/math/Vector"
import { ShaderManager } from "../gl/shader/ShaderManager"
import { Texture } from "../gl/texture/Texture"

// WebGLで描画するためのキャンバス
export class GLCanvas {

    private views: View[]

    // コンストラクタ
    constructor(canvas: HTMLCanvasElement) {
        this.views = []

        GLState.context = canvas.getContext("webgl")
        GLState.width = canvas.width
        GLState.height = canvas.height
        ShaderManager.load()

        // View
        let view = new View()
        let pos = new Vector()
        pos.x = 200
        pos.y = 200
        view.setPosition(pos)
        view.setWidth(50)
        view.setHeight(50)
        let color = new Color()
        color.r = 1.0
        color.a = 1.0
        view.setbackgroundColor(color)

        // カスタムView
        let canvasView = new CanvasView(100, 100, new Vector())
        const texture = new Texture()
        texture.onload = () => {
            canvasView.setTexture(texture)
        }
        texture.createTextureFromResourceName("res/twitter_icon.jpg")

        this.views.push(view)
        this.views.push(canvasView)
    }

    // 描画する
    private draw() {
        const gl = GLState.context
        gl.clearColor(0.8, 0.8, 0.8, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.viewport(0, 0, GLState.width, GLState.height)

        this.views.forEach( (view) => {
            view.draw()
        })
    }

    // アニメーションループを開始する
    public run() {
        setInterval(this.draw.bind(this), 1000 / 30)
    }
}