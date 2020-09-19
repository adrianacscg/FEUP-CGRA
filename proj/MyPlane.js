
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyPlane extends CGFobject{
	constructor(scene, nrDivs, minS, maxS, minT, maxT, doubleSided) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
        this.w = (this.maxT - this.minT) / this.nrDivs;
        this.doubleSided = doubleSided;
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
        this.texCoords = [];
        
        var xCoord;
        var yCoord;

        yCoord = 0.5;
        if (this.doubleSided) {
            yCoord = 0.5;
            for (let j = 0; j <= this.nrDivs; j++) {
                xCoord = -0.5;
                for (let i = 0; i <= this.nrDivs; i++) {
                    this.vertices.push(xCoord, yCoord, 0);
                    this.normals.push(0, 0, 1);
                    this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
                    this.vertices.push(xCoord, yCoord, 0);
                    this.normals.push(0, 0, -1);
                    this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
                    xCoord += this.patchLength;
                }
                yCoord -= this.patchLength;
            }
        }
        else {
            for (let j = 0; j <= this.nrDivs; j++) {
                xCoord = -0.5;
                for (let i = 0; i <= this.nrDivs; i++) {
                    this.vertices.push(xCoord, yCoord, 0);
                    this.normals.push(0, 0, 1);
                    this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
                    xCoord += this.patchLength;
                }
                yCoord -= this.patchLength;
            }
        }
        
		// Generating indices
		this.indices = [];

        var ind;
        if (this.doubleSided) {
            ind = 0;
            var aux = [];
            for (let j = 0; j < this.nrDivs; j++) {
                for (let i = 0; i <= this.nrDivs; i++) {
                    this.indices.push(ind * 2);
                    this.indices.push((ind + this.nrDivs + 1) * 2);
                    aux.push(ind * 2 + 1);
                    aux.push((ind + this.nrDivs + 1) * 2 + 1);
                    ind++;
                }
                if (j + 1 < this.nrDivs) {
                    this.indices.push((ind + this.nrDivs) * 2);
                    this.indices.push(ind * 2);
                    aux.push((ind + this.nrDivs) * 2 + 1);
                    aux.push(ind * 2 + 1);
                }
                else {
                    this.indices.push((ind + this.nrDivs) * 2);
                }
            }
            for (let index = aux.length - 1; index >= 0; index --) {
                let value = aux[index];
                this.indices.push(value);
            }
            
        }
        else {
            ind = 0;
            for (var j = 0; j < this.nrDivs; j++) {
                for (var i = 0; i <= this.nrDivs; i++) {
                    this.indices.push(ind);
                    this.indices.push(ind + this.nrDivs + 1);
                    ind++;
                }
                if (j + 1 < this.nrDivs) {
                    this.indices.push(ind + this.nrDivs);
                    this.indices.push(ind);
                }
            }
        }
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	};

}


