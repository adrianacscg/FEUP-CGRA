class MyCilinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices) {
    super(scene);
    this.divs = slices;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the cilinder buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    this.initialVertices = [];

    var alpha = 0;
    var alphaIncrement = (2 * Math.PI) / this.divs;
    var sideVertices = this.divs + 1;

    // build both bases
    for (let height = 1; height >= 0; height --) {

      // in base, build all the slices around
      alpha = 0;
      for (let side = 0; side <= this.divs; side ++) {
        //--- Vertices coordinates
        var x = Math.cos(alpha);
        var y = height;
        var z = Math.sin(-alpha);
        this.vertices.push(x, y, z);
        

        //--- Indices
        if (height < 1 && side < this.divs) {
          var current = height * sideVertices + side;
          var next = current + sideVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the cilinder base to the vertex.
        // in a cilinder of radius equal to one, the vector length is one.
        this.normals.push(x, 0, z);
        alpha += alphaIncrement;

        //--- Texture Coordinates
        this.texCoords.push(side/this.divs, 1 - height);
      }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
