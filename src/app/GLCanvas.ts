import { Color } from "../gl/color/Color"
import { CanvasView } from "../gl/component/CanvasView"
import { View } from "../gl/component/View"
import { GLState } from "../gl/GLState"
import { Layer } from "../gl/layer/Layer"
import { LayerInfo } from "../gl/layer/LayerInfo"
import { Vector } from "../gl/math/Vector"
import { PointColorShader } from "../gl/shader/PointColorShader"
import { ShaderManager } from "../gl/shader/ShaderManager"
import { ShaderType } from "../gl/shader/ShaderType"
import { Texture } from "../gl/texture/Texture"

// WebGLで描画するためのキャンバス
export class GLCanvas {

    // ビュー
    private views: View[]

    // コンストラクタ
    constructor(canvas: HTMLCanvasElement) {
        this.views = []

        // 初期化
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

        // レイヤー
        const info0 = new LayerInfo(100, 100)
        const layer0 = new Layer(info0)
        let c0 = new Color()    
        c0.r = 1.0
        c0.a = 1.0
        layer0.fill(c0)

        const info1 = new LayerInfo(100, 100)
        const layer1 = new Layer(info1)
        let c1 = new Color()    
        c1.g = 1.0
        c1.a = 1.0
        layer1.fill(c1)

        const info2 = new LayerInfo(100, 100)
        const layer2 = new Layer(info2)
        let c2 = new Color()    
        c2.b = 1.0
        c2.a = 1.0
        layer2.fill(c2)

        // マウスイベント
        document.getElementById("layer-1").onmousedown = () => {
            canvasView.setTexture(layer0.texture)
        }

        document.getElementById("layer-2").onmousedown = () => {
            canvasView.setTexture(layer1.texture)
        }

        document.getElementById("layer-3").onmousedown = () => {
            canvasView.setTexture(layer2.texture)
        }
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