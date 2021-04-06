import { Color } from "../color/Color";
import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { PointColorShader } from "../shader/PointColorShader";
import { PointTextureShader } from "../shader/PointTextureShader";
import { ShaderManager } from "../shader/ShaderManager";
import { ShaderType } from "../shader/ShaderType";
import { Texture } from "../texture/Texture";

// View基底クラス
export class View {

    // 位置
    protected position: Vector = new Vector()
    // 角度
    protected angle: number = 0.0
    // 幅
    protected width: number = 0.0
    // 高さ
    protected height: number = 0.0
    // 拡大率
    protected scale: number = 0.0 
    // テクスチャ
    protected texture: Texture = null
    // 子View
    protected children: View[] =　new Array<View>()
    // 頂点色
    protected vertexColors: Color[] = new Array<Color>()

    // 位置を設定する
    public setPosition(pos: Vector) {
        this.position = pos
    }

    // 幅を設定する
    public setWidth(width: number) {
        this.width = width
    }

    // 高さを設定する
    public setHeight(height: number) {
        this.height = height
    }

    // 背景色を設定する
    public setbackgroundColor(color: Color) {
        this.vertexColors = [color, color, color, color]
    }

    // 背景色を設定する(4頂点)
    public setAllBackgroundColor(colorLeftTop: Color, colorRightTop: Color,
         colorLeftBottom: Color, colorRightBottom: Color) {
        this.vertexColors = [colorLeftTop, colorRightTop, colorLeftBottom,
             colorRightBottom]
    }

    // 頂点座標を取得する
    // 独自の形状を持つViewはこれをオーバーライドする
    protected getVertices(): Array<Vector> {

        // 左上
        let v0 = new Vector()
        v0.x = this.position.x
        v0.y = this.position.y

        // 右上
        let v1 = new Vector()
        v1.x = this.position.x + this.width
        v1.y = this.position.y

        // 左下 
        let v2 = new Vector()
        v2.x = this.position.x
        v2.y = this.position.y + this.height
        
        // 右下
        let v3 = new Vector()
        v3.x = this.position.x + this.width
        v3.y = this.position.y + this.height
        
        return [GLState.convertVertex(v0),
                GLState.convertVertex(v1),
                GLState.convertVertex(v2),
                GLState.convertVertex(v3)]
    }

    // テクスチャ座標を返す
    public getVertexCoord(): Array<Vector> {
        let v0 = new Vector()
        v0.x = 0.0
        v0.y = 0.0

        let v1 = new Vector()
        v1.x = 1.0
        v1.y = 0.0

        let v2 = new Vector()
        v2.x = 0.0
        v2.y = 1.0

        let v3 = new Vector()
        v3.x = 1.0
        v3.y = 1.0

        return [v0, v1, v2, v3]
    }

    // テクスチャを設定する
    public setTexture(texture: Texture) {
        this.texture = texture
    }

    // 描画する
    public draw() {
        // 子要素を描画する
        this.children.forEach((child) => {
            child.draw()
        })

        const gl = GLState.context
        if (this.texture != null) { // テクスチャが指定されているとき
            const shader = <PointTextureShader>ShaderManager.getShader(ShaderType.PointTextureShader)
            const vertices = this.getVertices()
            const texCoord = this.getVertexCoord()
            shader.drawVector(gl.TRIANGLE_STRIP, vertices, texCoord, this.texture)
        } else { // テクスチャが指定されていないとき
            const shader = <PointColorShader>ShaderManager.getShader(ShaderType.PointColorShader)
            const vertices = this.getVertices()
            shader.drawVector(gl.TRIANGLE_STRIP, vertices, this.vertexColors)
        }
    }
}
