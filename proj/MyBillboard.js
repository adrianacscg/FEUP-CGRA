class MyBillboard extends CGFobject {
	constructor(scene, supplies) {
        super(scene);
        
        this.nSuppliesDelivered = 0;
        this.nSuppliesToDeliver = supplies;

        this.initBuffers();
        this.initMaterials();
    }
    
	initBuffers() {
        this.board    = new MyPlane(this.scene, 2, 0, 1, 0, 1,  true);
        this.progress = new MyPlane(this.scene, 20, 0, 1, 0, 1, false);
    }
    
    initMaterials() {
        // Texture
        this.textTexture = new CGFappearance(this.scene);
        this.textTexture.setAmbient (204/255, 204/255, 204/255, 1.0);
        this.textTexture.setDiffuse (100/255, 100/255, 100/255, 1.0);
        this.textTexture.setSpecular(255/255, 255/255, 255/255, 1.0);
        this.textTexture.setShininess(10.0);
        this.textTexture.loadTexture('images/board.png');
        this.textTexture.setTextureWrap('REPEAT', 'REPEAT');

        // Grey
        this.grey = new CGFappearance(this.scene);
        this.grey.setAmbient ( 70/255,  70/255,  70/255, 1.0);
        this.grey.setDiffuse ( 30/255,  30/255,  30/255, 1.0);
        this.grey.setSpecular(120/255, 120/255, 120/255, 1.0);
        this.grey.setShininess(10.0);

        // Progress
        this.progressShader = new CGFshader(this.scene.gl, "shaders/progress.vert", "shaders/progress.frag");
        this.progressShader.setUniformsValues({ nSuppliesDelivered: this.nSuppliesDelivered });
        this.progressShader.setUniformsValues({ nSuppliesToDeliver: this.nSuppliesToDeliver });
    }

    display() {
        // Legs of the Panel
        this.grey.apply();
        
        // Right Leg
        this.scene.pushMatrix();
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.board.display();
        this.scene.popMatrix();
        
        // Left Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        // Supplies Display
        this.textTexture.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        // Progress Bar
        this.grey.apply();
        // apply shader
        this.scene.setActiveShader(this.progressShader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.15, 0.01);
        this.scene.scale(1.5, 0.2, 1);
        this.progress.display();
        this.scene.popMatrix();
        // restore default shader
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    
    deliverSupply() {
        this.nSuppliesDelivered += 1;
        this.progressShader.setUniformsValues({ nSuppliesDelivered: this.nSuppliesDelivered });
    }
}