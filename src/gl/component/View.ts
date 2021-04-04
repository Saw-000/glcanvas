import { Color } from "../color/Color";
import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { Texture } from "../texture/Texture";

// View基底クラス
export class View {

    // 位置
    protected position: Vector = new Vector()
    // 角度
    protected angle: number = 0.0
    // 幅
    protected width: number = 0.0
    // 高さ
    protected height: number = 0.0
    // 拡大率
    protected scale: number = 0.0 
    // 背景色   
    protected backgroundColor: Color = new Color()
    // テクスチャ
    protected texture: Texture = null
    // 子View
    protected children: View[] =　new Array<View>()

    // 頂点座標を取得する
    // 独自の形状を持つViewはこれをオーバーライドする
    protected getVertices(): Array<Vector> {
        // 左下 
        let v1 = new Vector()
        v1.x = this.position.x
        v1.y = this.position.y + this.height
        
        // 右下
        let v2 = new Vector()
        v2.x = this.position.x + this.width
        v2.y = this.position.y + this.height

        // 左上
        let v3 = new Vector()
        v3.x = this.position.x
        v3.y = this.position.y
        
        // 右上
        let v4 = new Vector()
        v4.x = this.position.x + this.width
        v4.y = this.position.y
        
        return [GLState.convertVertex(v1),
                GLState.convertVertex(v2),
                GLState.convertVertex(v3),
                GLState.convertVertex(v4)]
    }

    // 頂点色を返す
    // 独自の形状を持つViewはこれをオーバーライドする
    public getVertexColors(): Array<Color> {
        return [this.backgroundColor, this.backgroundColor, this.backgroundColor,
             this.backgroundColor]
    }

    // テクスチャを設定する
    public setTexture(texture: Texture) {
        this.texture = texture
    }

    // 描画する
    protected draw() {
        // 子要素を描画する
        this.children.forEach((child) => {
            child.draw()
        })
    }
}
