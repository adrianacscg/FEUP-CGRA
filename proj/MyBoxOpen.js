class MyBoxOpen extends CGFobject {
    constructor(scene) {
        super(scene);

        this.sphere = new MySphere(scene, 10, 10);
        this.quad   = new MyQuad(scene);

        this.initMaterials();
    }

    initMaterials() {
        this.orangeTexture = new CGFappearance(this.scene);
        this.orangeTexture.setAmbient (1.0, 1.0, 1.0, 1.0);
        this.orangeTexture.setDiffuse (0.1, 0.1, 0.1, 1.0);
        this.orangeTexture.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.orangeTexture.setShininess(10.0);
        this.orangeTexture.loadTexture('images/Orange-Peel-Texture.jpg');
        this.orangeTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.box = new CGFappearance(this.scene);
        this.box.setAmbient (0.9, 0.9, 0.9, 1);
        this.box.setDiffuse (0.1, 0.1, 0.1, 1);
        this.box.setSpecular(0.1, 0.1, 0.1, 1);
        this.box.setShininess(10.0);
        this.box.loadTexture('images/insideBoxTexture.jpg');
        this.box.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.box.apply();
        
        // Bottom
        this.scene.pushMatrix(); 
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix(); 
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix(); 
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Front
        this.scene.pushMatrix(); 
        this.scene.translate(0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix(); 
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();


        this.orangeTexture.apply();

        this.scene.translate(0, 0.5, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.sphere.display();
    }
}