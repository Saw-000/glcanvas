export class Vector3 {

    private _x: number = 0.0

    private _y: number = 0.0

    private _z: number = 0.0

    // コンストラクタ
    constructor() {}

    public get x(): number {
        return this._x
    }
    public set x(value: number) {
        this._x = value
    }

    public get y(): number {
        return this._y
    }
    public set y(value: number) {
        this._y = value
    }

    public get z(): number {
        return this._z
    }
    
    public set z(value: number) {
        this._z = value
    }
}