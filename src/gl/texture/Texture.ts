import { GLState } from "../GLState";

// テクスチャ基底クラス
export class Texture {

    // WebGLテクスチャ
    protected texture: WebGLTexture
    // ロード完了コールバック
    public onload: Function

    // コンストラクタ
    constructor() {
        this.texture = null
        this.onload = null
    }
    
    // 空のテクスチャを作成する
    public createEmptyTexture(width: number,  height: number) {
        const gl = GLState.context
        this.texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA,
             gl.UNSIGNED_BYTE, null)
        gl.bindTexture(gl.TEXTURE_2D, null)
    }

    // 画像からテクスチャを作成する
    public createTextureFromImage(image: HTMLImageElement) {
        const gl = GLState.context
        this.texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.bindTexture(gl.TEXTURE_2D, null)
    }

    // 画像ソースからテクスチャを作成する
    public createTextureFromResourceName(src: string) {
        const image = new Image()
        image.onload = () => {
            console.log("image loaded")
            this.createTextureFromImage(image)
            if (this.onload != null) {
                this.onload()
            }
        }
        image.src = "src"
    }

    // テクスチャを取得する
    public getWebGLTexture(): WebGLTexture {
        return this.texture;
    }
}