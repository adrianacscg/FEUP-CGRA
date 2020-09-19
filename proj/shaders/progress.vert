#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
varying vec4 coords;
varying float limit;

uniform float nSuppliesToDeliver;
uniform float nSuppliesDelivered;

void main() {
	vec4 vertex = vec4(aVertexPosition + aVertexNormal * normScale * 0.1, 1.0);
    coords = vertex / 10.0;
    limit = nSuppliesDelivered / nSuppliesToDeliver;

	gl_Position = uPMatrix * uMVMatrix * vertex;
}
