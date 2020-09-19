class MyHelice extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.quarter   = new MyHeliceQuarter(this.scene);
    }
    
    initTextCoords() {
        this.texCoords = [];
    }

    updateTextCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }

    display() {
        // Right Up
        this.quarter.display();

        // Left Up
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quarter.display();
        this.scene.popMatrix();

        // Right Down
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quarter.display();
        this.scene.popMatrix();

        // Left Down
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quarter.display();
        this.scene.popMatrix();
    }
}
