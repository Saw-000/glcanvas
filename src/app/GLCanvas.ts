import { Color } from "../gl/color/Color"
import { CanvasView } from "../gl/component/CanvasView"
import { View } from "../gl/component/View"
import { GLState } from "../gl/GLState"
import { Vector } from "../gl/math/Vector"
import { PointColorShader } from "../gl/shader/PointColorShader"
import { ShaderManager } from "../gl/shader/ShaderManager"
import { ShaderType } from "../gl/shader/ShaderType"
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
        let pos0 = new Vector()
        pos0.x = 200
        pos0.y = 200
        view.setPosition(pos0)
        view.setWidth(50)
        view.setHeight(50)
        let color = new Color()
        color.r = 1.0
        color.a = 1.0
        view.setbackgroundColor(color)

        // カスタムView
        const canvasView = new CanvasView(100, 100, new Vector())
        const texture = new Texture()
        texture.onload = () => {
            canvasView.setTexture(texture)
        }
        texture.createTextureFromResourceName("res/twitter_icon.jpg")

        // オフスクリーンテクスチャを描画
        const offscreenTexture = new Texture()
        offscreenTexture.createEmptyTexture(255, 1)

        const vertices = [
            -1.0, 1.0,      // 左上
            1.0, 1.0,       // 右上
            -1.0, -1.0,     // 左下
            1.0, -1.0        // 右下
        ]

        const colors = [
            1.0, 0.0, 0.0, 1.0,     // 赤
            0.0, 0.0, 1.0, 1.0,     // 青
            1.0, 0.0, 0.0, 1.0,     // 赤
            0.0, 0.0, 1.0, 1.0,     // 青
        ]
        
        const gl = GLState.context
        const shader = <PointColorShader>ShaderManager.getShader(ShaderType.PointColorShader)
        shader.drawTexture(gl.TRIANGLE_STRIP, vertices, colors, offscreenTexture)

        let offscreenView = new View()
        let pos1 = new Vector()
        pos1.x = 200
        pos1.y = 0
        offscreenView.setPosition(pos1)
        offscreenView.setWidth(300)
        offscreenView.setHeight(50)
        offscreenView.setTexture(offscreenTexture)

        this.views.push(view)
        this.views.push(canvasView)
        this.views.push(offscreenView)
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