import { Vector } from "./math/Vector"

export class GLState {

    // コンテキスト
    private static _context: WebGLRenderingContext

    // ビューポートのサイズ
    private static _viewport: Vector = new Vector()

    // コンテキストを取得する
    public static get context(): WebGLRenderingContext {
        return GLState._context
    }

    // コンテキストを設定する
    public static set context(value: WebGLRenderingContext) {
        GLState._context = value
    }

    // ビューポートの幅を設定する
    public static set width(value: number) {
        this._viewport.x = value
    }

    // ビューポートの高さを設定する
    public static set height(value: number) {
        this._viewport.y = value
    }

    // ビューポートの幅を返す
    public static get width(): number {
        return this._viewport.x
    }

    // ビューポートの高さを返す
    public static get height(): number {
        return this._viewport.y
    }

    // GLの座標に変換する
    public static convertVertex(pos: Vector): Vector {
        let hw = this._viewport.x / 2.0
        let hh = this._viewport.y / 2.0
        
        let x = (pos.x - hw) / hw
        let y = (hh - pos.y) / hh

        let v = new Vector()
        v.x = x
        v.y = y
        return v
    }
}