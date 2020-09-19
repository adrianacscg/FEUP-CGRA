const SupplyStates = {
    INACTIVE : 0,
    FALLING : 1,
    LANDED : 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);

        this.state = SupplyStates.INACTIVE;

        this.position = [0, 9, 0];        
        this.previous_t = 0;

        this.floorLevel = 0;
        this.velocity   = 0;

        this.box     = new MyBox    (scene);
        this.openBox = new MyBoxOpen(scene);
    }

    update(t) {
        let elapsedTime;

        if (this.previous_t === 0) {
            elapsedTime = 0;
        }    
        else {
            elapsedTime = t - this.previous_t;
        }

        this.previous_t = t;

        if (this.state == SupplyStates.FALLING) {
            this.position[1] -= (elapsedTime/1000.0) * this.velocity;
            
            if (this.position[1] <= this.floorLevel) {
                this.land();
            }
        }
    }

    drop(dropPosition) {
        if (this.state == SupplyStates.INACTIVE) {
            this.state = SupplyStates.FALLING;
            this.position[0] = dropPosition[0];
            this.position[1] = dropPosition[1];
            this.position[2] = dropPosition[2];
            this.velocity = (this.position[1] - this.floorLevel) / 3.0;
        }
    }

    land() {
        if ((this.state == SupplyStates.FALLING) && (this.position[1] <= this.floorLevel)) {
            this.position[1] = this.floorLevel;
            this.state = SupplyStates.LANDED;
        }
    }

    reset() {
        this.state = SupplyStates.INACTIVE;
        this.previous_t = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        switch (this.state) {
            case SupplyStates.INACTIVE:
                break;
            case SupplyStates.FALLING:
                this.box.display();
                break;
            case SupplyStates.LANDED:
                this.openBox.display();
                break;
            default:
                break;
        }
        this.scene.popMatrix();
    }
}