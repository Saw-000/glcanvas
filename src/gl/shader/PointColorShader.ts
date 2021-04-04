import { Color } from "../color/Color";
import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { Shader } from "./Shader";

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
        const gl = GLState.context
        const positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, nVertices)
        const colorBuffer = this.createBufferObject(gl.ARRAY_BUFFER, nColor)
        gl.useProgram(this.program);
        var positionLocation = gl.getAttribLocation(this.program, "a_position");
        let colorLocation = gl.getAttribLocation(this.program, "a_Color");
        this.setAttribute(positionLocation, 2, positionBuffer)
        this.setAttribute(colorLocation, 4, colorBuffer)
        gl.drawArrays(mode, 0, nVertices.length / 2.0)
    }
}