import { GLState } from "../GLState";
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

    constructor() {
        super()
        this.program = this.getProgram(this.vertexShader, this.fragmentShader)
    }

    public draw(mode: GLenum, vertices: Array<number>) {
        const gl = GLState.context
        var positionBuffer = this.createBufferObject(gl.ARRAY_BUFFER, vertices)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);
        var location = gl.getAttribLocation(this.program, "a_position");
        this.setAttribute(location, 2, positionBuffer)
        gl.drawArrays(mode, 0, vertices.length / 2.0);
    }

}