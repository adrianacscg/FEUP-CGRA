#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying float limit;

void main() {
	/*if (coords.x < limit) {
        gl_FragColor = vec4(abs(coords.xyz) / 3.0, 1.0);
    }
    else {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
    }*/
    gl_FragColor = vec4(abs(coords.xyz) / 3.0, 1.0);
}
