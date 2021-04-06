import { Color } from "../color/Color";
import { GLState } from "../GLState";
import { PointColorShader } from "../shader/PointColorShader";
import { ShaderManager } from "../shader/ShaderManager";
import { ShaderType } from "../shader/ShaderType";
import { Texture } from "../texture/Texture";
import { LayerInfo } from "./LayerInfo";

export class Layer {
    
    // テクスチャ
    private _texture: Texture;

    // コンストラクタ
    constructor(info: LayerInfo) {
        this._texture = new Texture()
        this.texture.createEmptyTexture(info.width, info.height)
    }

    public get texture(): Texture {
        return this._texture;
    }

    // 塗りつぶす
    public fill(color: Color) {
        const vertices = [
            -1.0, 1.0,      // 左上
            1.0, 1.0,       // 右上
            -1.0, -1.0,     // 左下
            1.0, -1.0        // 右下
        ]
        const colors = [
            color.r, color.g, color.b, color.a,
            color.r, color.g, color.b, color.a,
            color.r, color.g, color.b, color.a,
            color.r, color.g, color.b, color.a
        ]

        const gl = GLState.context
        const shader = <PointColorShader>ShaderManager.getShader(ShaderType.PointColorShader)
        shader.drawTexture(gl.TRIANGLE_STRIP, vertices, colors, this._texture)
    }

}