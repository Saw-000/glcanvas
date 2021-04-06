import { Vector } from "../math/Vector";
import { View } from "./View";

// キャンバス
export class CanvasView extends View {

    // コンストラクタ
    constructor(width: number, height: number, position: Vector) {
        super()
        this.width = width
        this.height = height
        this.position = position
    }

    public draw() {
        super.draw()
    }
}