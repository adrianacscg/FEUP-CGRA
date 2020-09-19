class MyBody extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.cilinder = new MyCilinder(this.scene,   16);
        this.sphere   = new MySphere(this.scene, 16, 16);
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

        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0);
        
        // Front
        this.cilinder.display();
        this.sphere.display();

        // Back
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
