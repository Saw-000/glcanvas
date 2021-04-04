import { PointColorShader } from "./PointColorShader";
import { PointShader } from "./PointShader";
import { PointTextureShader } from "./PointTextureShader";
import { Shader } from "./Shader";
import { ShaderType } from "./ShaderType";

// シェーダーマネージャー
export class ShaderManager {

    // シェーダー
    private static shaders: Map<ShaderType, Shader> = new Map()

    // シェーダーをロードする
    public static load() {
        Object.entries(ShaderType).forEach(([key, value]) => {
            switch (value) {
                case "PointShader":
                    this.shaders.set(ShaderType.PointShader, new PointShader())
                    break
                case "PointColorShader":
                    this.shaders.set(ShaderType.PointColorShader, new PointColorShader())
                    break
                case "PointTextureShader":
                    this.shaders.set(ShaderType.PointTextureShader, new PointTextureShader())
                    break
                default:
                    break
            }
        })
    }

    // シェーダを取得する
    public static getShader(type: ShaderType): Shader {
        return this.shaders.get(type)
    }
}