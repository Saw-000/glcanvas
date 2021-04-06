import { Color } from "../color/Color";
import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { Texture } from "../texture/Texture";
import { Shader } from "./Shader";

// 位置と色を指定するシェーダー
export class PointColorShader extends Shader {

    vertexShader = `
    attribute vec4 a_position;
    attribute vec4 a_Color;
    varying vec4 v_Color;

    void main() {
        v_Color = a_Color;
        gl_Position = a_position;
    }`

    fragmentShader = `
    precision mediump float;
    varying vec4 v_Color;
  
    void main() {
        gl_FragColor = v_Color;
    }`

    // コンストラクタ
    constructor() {
        super()
        this.program = this.getProgram(this.vertexShader, this.fragmentShader)
    }

    // 描画する
    public draw(mode: GLenum, vertices: Array<number>, colors: Array<number>) {
        const gl = GLState.context
        const positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, vertices)
        const colorBuffer = this.createBufferObject(gl.ARRAY_BUFFER, colors)
        gl.useProgram(this.program);
        var positionLocation = gl.getAttribLocation(this.program, "a_position");
        let colorLocation = gl.getAttribLocation(this.program, "a_Color");
        this.setAttribute(positionLocation, 2, positionBuffer)
        this.setAttribute(colorLocation, 4, colorBuffer)
        gl.drawArrays(mode, 0, vertices.length / 2.0)
    }

    // Vectorで指定された頂点で描画する
    public drawVector(mode: GLenum, vertices: Array<Vector>, colors: Array<Color>) {
        const nVertices = []
        for (let i = 0; i < vertices.length; i++) {
            nVertices.push(vertices[i].x)
            nVertices.push(vertices[i].y)
        }
        const nColor = []
        for (let i = 0; i < colors.length; i++) {
            nColor.push(colors[i].r)
            nColor.push(colors[i].g)
            nColor.push(colors[i].b)
            nColor.push(colors[i].a)
        }
        this.draw(mode, nVertices, nColor)
    }

    // テクスチャにオフスクリーン描画する
    public drawTexture(mode: GLenum, vertices: Array<number>, colors: Array<number>, 
        dstTex: Texture) {
        const gl = GLState.context
        gl.viewport(0, 0, dstTex.width, dstTex.height)
        const positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, vertices)
        const colorBuffer = this.createBufferObject(gl.ARRAY_BUFFER, colors)
        gl.useProgram(this.program);
        var positionLocation = gl.getAttribLocation(this.program, "a_position");
        let colorLocation = gl.getAttribLocation(this.program, "a_Color");
        this.setAttribute(positionLocation, 2, positionBuffer)
        this.setAttribute(colorLocation, 4, colorBuffer)
        gl.bindFramebuffer(gl.FRAMEBUFFER, GLState.frameBuffer)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
            dstTex.getWebGLTexture(), 0)
        gl.drawArrays(mode, 0, vertices.length / 2.0)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    }

    // テクスチャにオフスクリーン描画する
    public drawVectorTexture(mode: GLenum, vertices: Array<Vector>, colors: Array<Color>, 
        dstTex: Texture) {
        const nVertices = []
        for (let i = 0; i < vertices.length; i++) {
            nVertices.push(vertices[i].x)
            nVertices.push(vertices[i].y)
        }
        const nColor = []
        for (let i = 0; i < colors.length; i++) {
            nColor.push(colors[i].r)
            nColor.push(colors[i].g)
            nColor.push(colors[i].b)
            nColor.push(colors[i].a)
        }
        this.drawTexture(mode, nVertices, nColor, dstTex)
    }
}