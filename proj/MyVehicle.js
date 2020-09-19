class MyVehicle extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.position = [0, 10, 0];
        this.velocity = 0;
        this.angle = 0;
        
        this.initBuffers();
        this.initMaterials();
    }
    
	initBuffers() {
        this.wing   = new MyWing  (this.scene);
        this.sphere = new MySphere(this.scene, 16, 16);
        this.oval   = new MyBody  (this.scene);
        this.helice = new MyHelice(this.scene);
        this.flag   = new MyPlane (this.scene, 20, 0, 1, 0, 1, true);
        this.heliceAngle = 0;
    }
    
    initMaterials() {
        // --- BLIMP --- //
        // Texture
        this.blimpTexture = new CGFappearance(this.scene);
        this.blimpTexture.setAmbient (204/255, 204/255, 204/255, 1.0);
        this.blimpTexture.setDiffuse (100/255, 100/255, 100/255, 1.0);
        this.blimpTexture.setSpecular(255/255, 255/255, 255/255, 1.0);
        this.blimpTexture.setShininess(10.0);
        this.blimpTexture.loadTexture('images/vehicleTexture1.png');
        this.blimpTexture.setTextureWrap('REPEAT', 'REPEAT');
        
        // Blue
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient (10/255, 10/255, 204/255, 1.0);
        this.blue.setDiffuse ( 0/255,  0/255, 100/255, 1.0);
        this.blue.setSpecular( 0/255,  0/255, 255/255, 1.0);
        this.blue.setShininess(10.0);

        // Grey
        this.grey = new CGFappearance(this.scene);
        this.grey.setAmbient ( 70/255,  70/255,  70/255, 1.0);
        this.grey.setDiffuse ( 30/255,  30/255,  30/255, 1.0);
        this.grey.setSpecular(120/255, 120/255, 120/255, 1.0);
        this.grey.setShininess(10.0);

        // --- WATERMELON --- //
        // Texture
        this.watermelonTexture = new CGFappearance(this.scene);
        this.watermelonTexture.setAmbient (204/255, 204/255, 204/255, 1.0);
        this.watermelonTexture.setDiffuse (100/255, 100/255, 100/255, 1.0);
        this.watermelonTexture.setSpecular(255/255, 255/255, 255/255, 1.0);
        this.watermelonTexture.setShininess(10.0);
        this.watermelonTexture.loadTexture('images/watermelon_outside.jpg');
        this.watermelonTexture.setTextureWrap('REPEAT', 'REPEAT');

        // Red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient (204/255, 10/255, 10/255, 1.0);
        this.red.setDiffuse (100/255,  0/255,  0/255, 1.0);
        this.red.setSpecular(255/255,  0/255,  0/255, 1.0);
        this.red.setShininess(10.0);
        this.red.loadTexture('images/watermelon_inside.jpg');
        this.red.setTextureWrap('REPEAT', 'REPEAT');

        // Green
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient (10/255, 204/255, 10/255, 1.0);
        this.green.setDiffuse ( 0/255, 100/255,  0/255, 1.0);
        this.green.setSpecular( 0/255, 255/255,  0/255, 1.0);
        this.green.setShininess(10.0);

        // --- FLAG --- //
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagShader.setUniformsValues({ speed: 0 });
        this.flagShader.setUniformsValues({ timeFactor: 0 });

        this.flagTexture = new CGFappearance(this.scene);
        this.flagTexture.setAmbient (204/255, 204/255, 204/255, 1.0);
        this.flagTexture.setDiffuse (100/255, 100/255, 100/255, 1.0);
        this.flagTexture.setSpecular(255/255, 255/255, 255/255, 1.0);
        this.flagTexture.setShininess(10.0);
        this.flagTexture.loadTexture('images/earth.jpg'); // TODO
        this.flagTexture.setTextureWrap('REPEAT', 'REPEAT');
        
    }

    display() {
        this.scene.pushMatrix(); // 1
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.angle, 0, 1, 0);
        
        // --- Wing Texture --- //
        if (this.scene.selectedVehicleTexture == 0) {
            this.grey.apply();
        }
        else if (this.scene.selectedVehicleTexture == 1) {
            this.green.apply();
        }

        // Wing Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.45, -0.7);
        if (this.velocity >= 0) {
            if (this.scene.direction == this.scene.directions['Right']) {
                // Rudders go Left -> Wing go Left
                this.scene.rotate(-Math.PI/6, 0, 1, 0);
            }
            else if (this.scene.direction == this.scene.directions['Left']) {
                // Rudders go Right -> Wing go Right
                this.scene.rotate(Math.PI/6, 0, 1, 0);
            }
        }
        else {
            if (this.scene.direction == this.scene.directions['Right']) {
                // Rudders go Left -> Wing go Left
                this.scene.rotate(Math.PI/6, 0, 1, 0);
            }
            else if (this.scene.direction == this.scene.directions['Left']) {
                // Rudders go Right -> Wing go Right
                this.scene.rotate(-Math.PI/6, 0, 1, 0);
            }
        }
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 1);
        this.wing.display();
        this.scene.popMatrix();

        // Wing Bot
        this.scene.pushMatrix();
        this.scene.translate(0, -0.45, -0.7);
        if (this.velocity >= 0) {
            if (this.scene.direction == this.scene.directions['Right']) {
                // Rudders go Left -> Wing go Left
                this.scene.rotate(-Math.PI/6, 0, 1, 0);
            }
            else if (this.scene.direction == this.scene.directions['Left']) {
                // Rudders go Right -> Wing go Right
                this.scene.rotate(Math.PI/6, 0, 1, 0);
            }
        }
        else {
            if (this.scene.direction == this.scene.directions['Right']) {
                // Rudders go Left -> Wing go Left
                this.scene.rotate(Math.PI/6, 0, 1, 0);
            }
            else if (this.scene.direction == this.scene.directions['Left']) {
                // Rudders go Right -> Wing go Right
                this.scene.rotate(-Math.PI/6, 0, 1, 0);
            }
        }
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 1);
        this.wing.display();
        this.scene.popMatrix();

        // Wing Left
        this.scene.pushMatrix();
        this.scene.translate(-0.45, 0, -0.7);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 1);
        this.wing.display();
        this.scene.popMatrix();

        // Wing Right
        this.scene.pushMatrix();
        this.scene.translate(0.45, 0, -0.7);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 1);
        this.wing.display();
        this.scene.popMatrix();
        
        // --- Body Texture --- //
        if (this.scene.selectedVehicleTexture == 0) {
            this.blimpTexture.apply();
        }
        else if (this.scene.selectedVehicleTexture == 1) {
            this.watermelonTexture.apply();
        }

        // Body
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        // --- Cabin Texture --- //
        if (this.scene.selectedVehicleTexture == 0) {
            this.blue.apply();
        }
        else if (this.scene.selectedVehicleTexture == 1) {
            this.red.apply();
        }

        // Cabin
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.2);
        this.scene.scale(0.2, 0.2, 0.3);
        this.oval.display();
        this.scene.popMatrix();

        // --- Motor Texture --- //
        if (this.scene.selectedVehicleTexture == 0) {
            this.grey.apply();
        }
        else if (this.scene.selectedVehicleTexture == 1) {
            this.green.apply();
        }
        
        // Motor Right
        this.scene.pushMatrix();
        this.scene.translate(0.15, -0.55, -0.15);
        this.scene.scale(0.07, 0.07, 0.08);
        this.oval.display();
        this.scene.popMatrix();

        // Motor Left
        this.scene.pushMatrix();
        this.scene.translate(-0.15, -0.55, -0.15);
        this.scene.scale(0.07, 0.07, 0.08);
        this.oval.display();
        this.scene.popMatrix();

        // Helice Right
        this.scene.pushMatrix();
        this.scene.translate(0.15, -0.55, -0.28);
        this.scene.scale(0.15, 0.125, 0.125);
        this.scene.rotate(this.heliceAngle, 0, 0, 1);
        this.helice.display();
        this.scene.popMatrix();

        // Helice Left
        this.scene.pushMatrix();
        this.scene.translate(-0.15, -0.55, -0.28);
        this.scene.scale(0.15, 0.125, 0.125);
        this.scene.rotate(this.heliceAngle, 0, 0, 1);
        this.helice.display();
        this.scene.popMatrix();

        // Helice Center Right
        this.scene.pushMatrix();
        this.scene.translate(0.15, -0.55, -0.28);
        this.scene.scale(0.02, 0.02, 0.02);
        this.sphere.display();
        this.scene.popMatrix();

        // Helice Center Left
        this.scene.pushMatrix();
        this.scene.translate(-0.15, -0.55, -0.28);
        this.scene.scale(0.02, 0.02, 0.02);
        this.sphere.display();
        this.scene.popMatrix();

        // Flag
        this.flagTexture.apply();
        // apply shader
        this.scene.setActiveShader(this.flagShader);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.2);
        this.scene.scale(1, 0.8, 1.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();
        // restore default shader
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix(); // 1
        
    }

    update(t) {
        if (this.autopilot) {
            var deltaT = (t - this.previousT) / 1000.0;
            this.previousT = t;

            this.autopilotAngle = this.autopilotAngle + this.angularSpeed * deltaT;
            this.angle          = this.angle          + this.angularSpeed * deltaT;
            this.position[0] = this.autopilotCenter[0] + 5 * Math.sin(this.autopilotAngle);     // X
            this.position[1] = this.position[1];                                                // Y
            this.position[2] = this.autopilotCenter[2] + 5 * Math.cos(this.autopilotAngle);     // Z
        }
        else {
            this.position[0] = this.position[0] + this.velocity * Math.sin(this.angle);         // X
            this.position[1] = this.position[1];                                                // Y
            this.position[2] = this.position[2] + this.velocity * Math.cos(this.angle);         // Z
        }
        this.heliceAngle = this.heliceAngle + 1.2 * this.velocity;

        this.flagShader.setUniformsValues({ speed: this.velocity });
        this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }

    turn(val) {
        if (!this.autopilot) {
            this.angle = this.angle + val;
        }
    }

    accelerate(val) {
        if (!this.autopilot) {
            this.velocity = this.velocity + this.scene.speedFactor * val;
            if ((!this.scene.negativeSpeed) && (this.velocity < 0)) {
                this.velocity = 0;
            } 
        }
    }

    reset() {
        this.position = [0, 10, 0];
        this.velocity = 0;
        this.angle = 0;
        this.autopilot = false;
    }

    startAutoPilot(t) {
        if (!this.autopilot) {
            this.autopilot = true;
            this.previousT = t;

            var centripetalVector = [Math.sin(this.angle + Math.PI/2), 0, Math.cos(this.angle + Math.PI/2)];
            this.autopilotCenter = [0, 0, 0];
            this.autopilotCenter[0] = this.position[0] + centripetalVector[0] * 5.0;
            this.autopilotCenter[1] = this.position[1] + centripetalVector[1] * 5.0;
            this.autopilotCenter[2] = this.position[2] + centripetalVector[2] * 5.0;
            
            this.autopilotAngle = this.angle + 3 * Math.PI / 2;
            if (this.velocity >= 0) {
                this.angularSpeed =  2.0 * Math.PI / 5.0;
                
            }
            else {
                this.angularSpeed = -2.0 * Math.PI / 5.0;
            }
            this.velocity = this.angularSpeed * 5;
            
            this.scene.direction = this.scene.directions['Left'];
        }
    }
}