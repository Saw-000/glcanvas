import { GLState } from "../GLState";

// テクスチャ基底クラス
export class Texture {

    protected texture: WebGLTexture;

    // コンストラクタ
    constructor() {}
    
    // 空のテクスチャを作成する
    public makeTexture(): void {
        const gl = GLState.context
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, 
                      gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    // テクスチャを取得する
    public getTexture(): WebGLTexture {
        return this.texture;
    }
}