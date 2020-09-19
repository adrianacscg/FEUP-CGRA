class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
        this.initTextCoords();
    }
    
	initBuffers() {
        this.positiveX = new MyQuad(this.scene);    // RIGHT
        this.positiveY = new MyQuad(this.scene);    // TOP
        this.positiveZ = new MyQuad(this.scene);    // BACK
        this.negativeX = new MyQuad(this.scene);    // LEFT
        this.negativeY = new MyQuad(this.scene);    // BOTTOM
        this.negativeZ = new MyQuad(this.scene);    // FRONT
    }

    initTextCoords() {
        this.positiveX.updateTexCoords([
            0.75, 0.65,
            0.50, 0.65,
            0.75, 0.34,
            0.50, 0.34
            ]);
        this.positiveY.updateTexCoords([
            0.25, 0.00,
            0.50, 0.00,
            0.25, 0.34,
            0.50, 0.34
        ]);
        this.positiveZ.updateTexCoords([
            1.00, 0.65,
            0.75, 0.65,
            1.00, 0.34,
            0.75, 0.34
        ]);
        this.negativeX.updateTexCoords([
            0.25, 0.65,
            0.00, 0.65,
            0.25, 0.34,
            0.00, 0.34
        ]);
        this.negativeY.updateTexCoords([
            0.25, 0.65,
            0.50, 0.65,
            0.25, 1.00,
            0.50, 1.00
        ]);
        this.negativeZ.updateTexCoords([
            0.25, 0.34,
            0.50, 0.34,
            0.25, 0.65,
            0.50, 0.65
        ]);
    }

    display() {
        // X + (RIGHT)
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(1, 1, -1);
        this.positiveX.display();
        this.scene.popMatrix();
        
        // X - (LEFT)
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(1, 1, -1);
        this.negativeX.display();
        this.scene.popMatrix();
        
        // Y + (TOP)
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.positiveY.display();
        this.scene.popMatrix();
        
        // Y - (BOTTOM)
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.negativeY.display();
        this.scene.popMatrix();
        
        // Z + (BACK)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(1, 1, -1);
        this.positiveZ.display();
        this.scene.popMatrix();
        
        // Z - (FRONT)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.negativeZ.display();
        this.scene.popMatrix();
    }
    
}

