import { GLState } from "../GLState";

// シェーダー基底クラス
export class Shader {

    // 頂点シェーダー
    protected vertexShader: string = ""
    // フラグメントシェーダー
    protected fragmentShader: string = ""
    // プログラム
    protected program: WebGLProgram = null

    // コンストラクタ
    constructor() {}

    // プログラムを取得する
    protected getProgram(vSource: string, fSource: string) {
        const gl = GLState.context
        var vShader = this.createShader(gl.VERTEX_SHADER, vSource);
        var fShader = this.createShader(gl.FRAGMENT_SHADER, fSource);
        return this.createProgram(vShader, fShader);
    }

    // バッファオブジェクトを取得する
     protected createBufferObject(target: GLenum, data: Array<number>) {
        const gl = GLState.context
        var buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        if (target === gl.ARRAY_BUFFER) {
            gl.bufferData(target, new Float32Array(data), gl.STATIC_DRAW);
        } else if (target === gl.ELEMENT_ARRAY_BUFFER) {
            gl.bufferData(target, new Int16Array(data), gl.STATIC_DRAW);
        }
        gl.bindBuffer(target, null);
        return buffer;
    }
    
    // バッファと変数を紐付ける
    protected setAttribute(location: GLuint, size: GLint, buffer: WebGLBuffer) {
        const gl = GLState.context
        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    // シェーダーを作成する
    protected createShader(type: GLenum, source: string) {
        const gl = GLState.context
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { // シェーダーの作成に成功したとき
            return shader;
        } else { // シェーダーの作成に失敗したとき
            console.log(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
    }

    // プログラムを作成する
    protected createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const gl = GLState.context
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) { // プログラムの作成に成功したとき
            return program;
        } else { // プログラムの作成に失敗したとき
            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
    }
}