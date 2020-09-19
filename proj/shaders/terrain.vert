attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    vec4 height_map = texture2D(uSampler2, aTextureCoord);
    vec3 offsetCoords = vec3(0.0, 0.0, fract(height_map.b) * 8.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offsetCoords, 1.0);
}
