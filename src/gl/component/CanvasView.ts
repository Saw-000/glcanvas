import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { PointColorShader } from "../shader/PointColorShader";
import { PointTextureShader } from "../shader/PointTextureShader";
import { ShaderManager } from "../shader/ShaderManager";
import { ShaderType } from "../shader/ShaderType";
import { View } from "./View";

// キャンバス
export class CanvasView extends View {

    // コンストラクタ
    constructor(width: number, height: number, position: Vector) {
        super()
        this.width = width
        this.height = height
        this.position = position
    }

    public draw() {
        super.draw()

        const gl = GLState.context
        if (this.texture != null) { // テクスチャが指定されているとき
            const shader = <PointTextureShader>ShaderManager.getShader(ShaderType.PointTextureShader)
            const vertices = this.getVertices()
            const texCoord = this.getVertexCoord()
            shader.drawVector(gl.TRIANGLE_STRIP, vertices, texCoord, this.texture)
        } else { // テクスチャが指定されていないとき
            const shader = <PointColorShader>ShaderManager.getShader(ShaderType.PointColorShader)
            const vertices = this.getVertices()
            const colors = this.getVertexColors()
            shader.drawVector(gl.TRIANGLE_STRIP, vertices, colors)
        }
    }
}