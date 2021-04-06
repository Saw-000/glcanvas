// レイヤー情報
export class LayerInfo {
    // 幅
    private _width: number = 0
    // 高さ
    private _height: number = 0
    // レイヤー名
    private _name: string = ""
    // 不透明度
    private _opacity: number = 1.0
    // バックアップイメージ
    private _backupImage: HTMLImageElement = null

    // コンストラクタ
    constructor(width: number, height: number) {
        this._width = width 
        this._height = height
    }

    // 高さを取得する
    public get height(): number {
        return this._height
    }

    // 幅を取得する
    public get width(): number {
        return this._width
    }
}