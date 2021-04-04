// カラー
export class Color {

    // r要素(0.0 ~ 1.0)
    private _r: number = 0.0

    // g要素(0.0 ~ 1.0)
    private _g: number = 0.0

    // b要素(0.0 ~ 1.0)
    private _b: number = 0.0

    // 不透明度(0.0 ~ 1.0)
    private _a: number = 0.0

    // コンストラクタ
    constructor() {}

    public get r(): number {
        return this._r
    }

    public set r(value: number) {
        this._r = value
    }

    public get g(): number {
        return this._g
    }

    public set g(value: number) {
        this._g = value
    }

    public get b(): number {
        return this._b
    }

    public set b(value: number) {
        this._b = value
    }

    public get a(): number {
        return this._a
    }

    public set a(value: number) {
        this._a = value
    }
}