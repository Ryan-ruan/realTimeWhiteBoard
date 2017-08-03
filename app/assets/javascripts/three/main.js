
var app = app || {};

app.controller = {
  step: 0,
  rotationSpeed: 0.02,
  bouncingSpeed: 0.02,
  cameraPosIndex: 0,

  numParticles: 200,
  particleDistribution: 300,

  velocityScale: 1.0,
  gravityScale: 0.05

};

app.init = function(){
  console.log('Hello My World');

  app.scene = new THREE.Scene();

  app.width  = window.innerWidth;
  app.height = window.innerHeight;

  // 4 params:
  // field of view (FOV)
  // screen ratio
  // near field: how close to render things
  // far field:  how far to render thiings
  app.camera = new THREE.PerspectiveCamera(
    60, // FOV
    app.width / app.height, // screen ratio
    0.1, // near field
    5000 // far field
  );

  // Position our camera somewhere in the scene; it has a perspective
  app.camera.position.x = -30;
  app.camera.position.y = 40;
  app.camera.position.z = 30;
  // Tell the camera where its looking - at the center of the scene, the origin (0, 0, 0)
  app.camera.lookAt( app.scene.position );

  // The renderer calculates how the canvas/browser will see these elements, based on the camera position.
  // It also defines how it will do the rendering calculation under the hood, i.e. WebGL
  // hardware acceleration or fallback to a software renderer
  app.renderer = new THREE.WebGLRenderer();
  // set the size
  app.renderer.setSize( app.width, app.height );
  app.renderer.setClearColor( 0x000000 ); // background colour
  // app.renderer.shadowMap.enabled = true; // shadows are computationally expensive, so disabled by default
  // app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;


  // app.axes = new THREE.AxisHelper( 40 );
  // app.scene.add( app.axes );
  //
  // app.plane = app.createPlane();
  // app.scene.add( app.plane );

  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );


  // app.cube = app.createCube( 15, 15, 15, 6);
  // app.scene.add( app.cube );




  app.sphere = app.createSphere();
  app.scene.add( app.sphere );


  app.moon = app.moon();
  app.scene.add( app.moon );

  app.ambient = new THREE.AmbientLight( 0x555555 );
  app.scene.add( app.ambient );

  app.spline = app.createSpline();

  app.particleSystem = app.createParticleSystem();
  app.scene.add( app.particleSystem );

  // app.line = app.createLineFromSpline( app.spline );
  // app.scene.add( app.line );


  app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement );

  // app.controller = {
  //   step: 0,
  //   rotationSpeed: 0.02,
  //   bouncingSpeed: 0.02
  // // };
  // app.gui = new dat.GUI();
  // app.gui.add( app.controller, 'rotationSpeed', 0, 0.2 );
  // app.gui.add( app.controller, 'bouncingSpeed', 0, 2.0 );
  // app.gui.add( app.controller, 'velocityScale', -2, 2 );
  // app.gui.add( app.controller, 'gravityScale', -0.1, 0.1 );


  // Attach the canvas element created by the renderer onto the page
  document.getElementById("output").appendChild( app.renderer.domElement );

  // app.stats = app.addStats();

  // Actually draw something
  app.animate();

}; // app.init

app.createLineFromSpline = function( spline ){

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0xFF00F0
  });

  var lineGeometry = new THREE.Geometry();

  var splinePoints = spline.getPoints( 10000 );

  for (var i = 0; i < splinePoints.length; i++) {
    lineGeometry.vertices.push( splinePoints[i] );
  }

  var line = new THREE.Line( lineGeometry, lineMaterial );

  return line;
};

app.createSpline = function(){

  var randomPoints = [];
  for (var i = 0; i < 10000; i++) {

    randomPoints.push(new THREE.Vector3(
      // randRange(-100, 100)
      THREE.Math.randInt(-100, 100),  // x
      THREE.Math.randInt(-50, 50),  // y
      THREE.Math.randInt(-50, 50),  // z
    ));

  }

  // return new THREE.SplineCurve3( randomPoints );
  return new THREE.CatmullRomCurve3( randomPoints );

};

app.createParticleSystem = function(){

  // Particles are just a collection of vertices in a general-purpose geometry
  var particles = new THREE.Geometry();

  for (var i = 0; i < app.controller.numParticles; i++) {

    // split the particles into two sheets!
    if(Math.random() < 0.5){
      var x = 200;
      var y = THREE.Math.randInt(-app.controller.particleDistribution, app.controller.particleDistribution );
      var z = THREE.Math.randInt(-app.controller.particleDistribution, app.controller.particleDistribution );
    } else {
      var x = THREE.Math.randInt(-app.controller.particleDistribution, app.controller.particleDistribution );
      var y = THREE.Math.randInt(-app.controller.particleDistribution, app.controller.particleDistribution );
      var z = 400;
    }



    // Create a vertex
    var particle = new THREE.Vector3(x, y, z);

    var velRange = 0.9;
    particle.vx = 0; // THREE.Math.randFloat( -velRange, velRange );
    particle.vy = 0; // THREE.Math.randFloat( -velRange, velRange );
    particle.vz = 0; // THREE.Math.randFloat( -velRange, velRange );


    // Add it to our particle system geometry
    particles.vertices.push( particle );
  } // for

  var particleMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture("/assets/snowflake.png"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: 0.5 // try values like 0 to 0.1 to see effect
  });

  var particleSystem = new THREE.Points( particles, particleMaterial );

  return particleSystem;
};


app.animateParticles = function(){

  var vertices = app.particleSystem.geometry.vertices;

  for (var i = 0; i < vertices.length; i++) {
    var vert = vertices[i];

    // rain effect
    // if( vert.y < -200 ){
    //   vert.y = app.controller.particleDistribution + THREE.Math.randInt(-50, 50);
    // }
    // vert.y -= app.controller.bouncingSpeed;

    var dist = Math.sqrt( vert.x*vert.x + vert.y*vert.y + vert.z*vert.z )


    if( dist > 10.0 ){
      // only apply gravity if the particle isn't too close to the origin,
      // to prevent too strong an effect
      var force = ( 10.0 / (dist*dist) ) * -app.controller.gravityScale;
      vert.vx += force * vert.x;
      vert.vy += force * vert.y;
      vert.vz += force * vert.z;

    }

    vert.x += vert.vx * app.controller.velocityScale;
    vert.y += vert.vy * app.controller.velocityScale;
    vert.z += vert.vz * app.controller.velocityScale;


  } // for

    // app.particleSystem.rotation.y -= app.controller.rotationSpeed;

    app.particleSystem.geometry.verticesNeedUpdate = true;
};


app.animate = function(){
  //
  // app.controller.cameraPosIndex++;
  // if( app.controller.cameraPosIndex > 10000 ){
  //   app.controller.cameraPosIndex = 0;
  // }
  //
  // // Get a point a short distance ahead along the spline, and move camera to that point
  // var newCameraPos = app.spline.getPoint( app.controller.cameraPosIndex / 3000 );
  // app.camera.position.set(newCameraPos.x, newCameraPos.y, newCameraPos.z  );
  //
  // // Get tanget to that point, and set camera rotatation and focus so it's always looking along the track
  // var newCameraRot = app.spline.getTangent( app.controller.cameraPosIndex / 3000);
  // app.camera.rotation.set(newCameraRot.x, newCameraRot.y, newCameraRot.z);
  // var newCameraLookAt = app.spline.getPoint( (app.controller.cameraPosIndex + 1) / 3000 ); // look 1 step ahead of current position
  // app.camera.lookAt( newCameraLookAt );

  app.animateParticles();
  //
  // app.cube.rotation.x += app.controller.rotationSpeed;
  // app.cube.rotation.y += app.controller.rotationSpeed;
  // app.cube.rotation.z += app.controller.rotationSpeed;

  // app.stats.update();

  app.controller.step += app.controller.bouncingSpeed;

  app.sphere.rotation.y += app.controller.rotationSpeed;
  app.moon.rotation.y += app.controller.rotationSpeed;


  // app.sphere.position.x = -20 + ( 10 * Math.cos(app.controller.step) );
  // app.sphere.position.y =   4 + ( 10 * Math.abs(Math.sin(app.controller.step)) );

  app.renderer.render( app.scene, app.camera );
  requestAnimationFrame( app.animate );

};


app.createSpotlight = function(){

  var spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( 30, 60, 10 );
  // spotlight.castShadow = true;
  // spotlight.shadow.mapSize.width = 2048;
  // spotlight.shadow.mapSize.height = 2048;

  return spotlight;
};


app.createSphere = function(){

  var sphereGeometry = new THREE.SphereGeometry( 20, 40, 40 );  // radius, X and Y segments to approximate sphere with
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    wireframe: false,
    side: THREE.DoubleSide,
    map: THREE.ImageUtils.loadTexture("/assets/earth.jpg")
  });

  var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

  sphere.position.set( 0, 0, 0 );
  // sphere.castShadow = true;

  return sphere;
};

app.moon = function(){

  var sphereGeometry = new THREE.SphereGeometry( 10, 40, 40 );  // radius, X and Y segments to approximate sphere with
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

  sphere.position.set(60, 0, 0 );
  // sphere.castShadow = true;

  return sphere;
};

app.createCube = function(x, y, z, size){

  var cubeGeometry = new THREE.BoxGeometry( size, size, size );
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF8F00,   // mustard cube, the culinary hit of the 4th millenium
    wireframe: false
  });

  var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

  cube.position.set( x, y, z );
  // // cube.castShadow = true;

  return cube;
};

app.createPlane = function(){

  var planeGeometry = new THREE.PlaneGeometry( 120, 20 );  // 120 x 20 plane (no height)
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xCFD8DB // a kind of dull grey
  });

  // combine shape and material into a final object, a mesh
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );

  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.rotation.x = -0.5 *  Math.PI;  // don't ask... it's because of math(s)
  plane.receiveShadow = true;

  return plane;
};

app.addStats = function(){

  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("stats").appendChild( stats.domElement );

  return stats;
}



app.onResize = function(){
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize( app.width, app.height );
}

window.addEventListener( "resize", app.onResize, false);


window.onload = app.init;  // no jQuery today, but this is basically $(document).ready(function(){ ... })
