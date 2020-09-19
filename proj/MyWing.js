class MyWing extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.triangle = new MyTriangle(this.scene);
        this.square   = new MyQuad(this.scene);
    }
    
    initTextCoords() {
        this.texCoords = [];
    }

    updateTextCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(1, -1, 1);

        // Front Triangle
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.scale(0.5, -0.5, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // Back Triangle
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(0.5, 0.5, -1);
        this.triangle.display();
        this.scene.popMatrix();

        // Front Square
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.square.display();
        this.scene.popMatrix();

        // Back Square
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.square.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
