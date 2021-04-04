import { GLState } from "../GLState";
import { Vector } from "../math/Vector";
import { Shader } from "./Shader";

export class PointShader extends Shader {

    vertexShader = `
    attribute vec4 a_position;

    void main() {
      gl_Position = a_position;
    }`

    fragmentShader = `
    precision mediump float;
  
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`

    // コンストラクタ
    constructor() {
        super()
        this.program = this.getProgram(this.vertexShader, this.fragmentShader)
    }

    // 描画する
    public draw(mode: GLenum, vertices: Array<number>) {
        const gl = GLState.context
        var positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, vertices)
        gl.useProgram(this.program);
        var location = gl.getAttribLocation(this.program, "a_position");
        this.setAttribute(location, 2, positionBuffer)
        gl.drawArrays(mode, 0, vertices.length / 2.0);
    }

    // Vectorで指定された頂点で描画する
    public drawVector(mode: GLenum, vertices: Array<Vector>) {
        const nVertices = []
        for (let i = 0; i < vertices.length; i++) {
            nVertices.push(vertices[i].x)
            nVertices.push(vertices[i].y)
        }
        const gl = GLState.context
        var positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, nVertices)
        gl.useProgram(this.program);
        var location = gl.getAttribLocation(this.program, "a_position");
        this.setAttribute(location, 2, positionBuffer)
        gl.drawArrays(mode, 0, nVertices.length / 2.0);
    }
}