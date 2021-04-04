import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { Texture } from "../texture/Texture";
import { Shader } from "./Shader";

// 位置とテクスチャを指定するシェーダー
export class PointTextureShader extends Shader {

    vertexShader = `
    attribute vec4 a_position;
    attribute vec2 u_TexCoord;
    varying vec2 v_TexCoord;

    void main() {
        v_TexCoord = u_TexCoord;;
        gl_Position = a_position;
    }`

    fragmentShader = `
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
  
    void main() {
        gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }`

    // コンストラクタ
    constructor() {
        super()
        this.program = this.getProgram(this.vertexShader, this.fragmentShader)
    }

    // 描画する
    public draw(mode: GLenum, vertices: Array<number>, texCoords: Array<number>,
         texture: Texture) {
        const gl = GLState.context

        // バッファ生成
        const positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, vertices)
        const texCoordBuffer = this.createBufferObject(gl.ARRAY_BUFFER, texCoords)

        gl.useProgram(this.program)

        // 変数ハンドラー取得
        const positionLocation = gl.getAttribLocation(this.program, "a_position")
        const texCoordLocation = gl.getAttribLocation(this.program, "u_TexCoord")
        const samplerLocation = gl.getUniformLocation(this.program, "u_Sampler")

        // テクスチャをバインド
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture.getWebGLTexture())

        // 変数とバッファを紐付け
        this.setAttribute(positionLocation, 2, positionBuffer)
        this.setAttribute(texCoordLocation, 2, texCoordBuffer)
        gl.uniform1i(samplerLocation, 0)

        gl.drawArrays(mode, 0, vertices.length / 2.0)

        // テクスチャをアンバインド
        gl.bindTexture(gl.TEXTURE_2D, null)
    }

    // Vectorで指定された頂点で描画する
    public drawVector(mode: GLenum, vertices: Array<Vector>, texCoords: Array<Vector>,
        texture: Texture) {
        const nVertices = []
        for (let i = 0; i < vertices.length; i++) {
            nVertices.push(vertices[i].x)
            nVertices.push(vertices[i].y)
        }
        const nTexCoords = []
        for (let i = 0; i < texCoords.length; i++) {
            nTexCoords.push(texCoords[i].x)
            nTexCoords.push(texCoords[i].y)
        }
        this.draw(mode, nVertices, nTexCoords, texture)
    }
}