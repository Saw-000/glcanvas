import { GLState } from "../GLState";

// テクスチャ基底クラス
export class Texture {

    // WebGLテクスチャ
    protected texture: WebGLTexture
    // ロード完了コールバック
    public onload: Function
    // 幅
    private _width: number;
    // 高さ
    private _height: number;

    // コンストラクタ
    constructor() {
        this.texture = null
        this.onload = null
        this._width = 0
        this._height = 0
    }

    // 幅を取得する
    public get width(): number {
        return this._width;
    }

    // 高さを取得する
    public get height(): number {
        return this._height;
    }
    
    // 空のテクスチャを作成する
    public createEmptyTexture(width: number,  height: number) {
        this._width = width
        this._height = height
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
        this._width = image.width
        this._height = image.height
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
            this.createTextureFromImage(image)
            if (this.onload != null) {
                this.onload()
            }
        }
        image.src = src
    }

    // テクスチャを取得する
    public getWebGLTexture(): WebGLTexture {
        return this.texture;
    }
}