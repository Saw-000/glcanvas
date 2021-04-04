import { PointShader } from "./PointShader";
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
                    let shader = new PointShader()
                    this.shaders.set(ShaderType.PointShader, shader)
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