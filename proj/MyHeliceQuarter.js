class MyHeliceQuarter extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		this.initTextCoords();
	}
	
    initBuffers() {
		this.vertices = [
            0.0/24.0,  0.0/24.0, 0,	//0
            6.0/24.0, 11.0/24.0, 0,	//1
            8.0/24.0, 15.0/24.0, 0,	//2
            7.0/24.0, 20.0/24.0, 0,	//3
            5.0/24.0, 23.0/24.0, 0,	//4
            0.0/24.0, 24.0/24.0, 0,	//5

            0.0/24.0,  0.0/24.0, 0,	//6
            6.0/24.0, 11.0/24.0, 0,	//7
            8.0/24.0, 15.0/24.0, 0,	//8
            7.0/24.0, 20.0/24.0, 0,	//9
            5.0/24.0, 23.0/24.0, 0,	//10
            0.0/24.0, 24.0/24.0, 0  //11
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0,  1,  2,
            0,  2,  3,
            0,  3,  4,
            0,  4,  5,
            
            6,  8,  7,
            6,  9,  8,
            6, 10,  9,
            6, 11, 10
		];

		this.normals = [
			0, 0,  1,
			0, 0,  1,
            0, 0,  1,
            0, 0,  1,
            0, 0,  1,
            0, 0,  1,

            0, 0, -1,
			0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    initTextCoords() {
        this.texCoords = [];
    }

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }
}