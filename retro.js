





let scene, camera, renderer;
let gridHelper, bgTexture, skybox;

const worldWidth = 50, worldDepth = 200;
const hillVertX = 20, hillVertY = 100;

const initCamZ = 50;

const pi = 3.1415926536;



function init(){

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    antialias	: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);


  // renderer.setClearColor(0x442244);
  scene.fog = new THREE.FogExp2( 0x884444, 0.01 );


  var groundGeo = new THREE.PlaneGeometry(400,400,4,4);
  var groundMat = new THREE.MeshPhongMaterial({
    color:0x244876,
    opacity: 0.8,
    refractionRatio: .1,
    transparent: true,
    emissive: 0x008800,
    emissiveIntensity: 0.2,

  });
  groundMat.shininess = 100;
  var ground = new THREE.Mesh(groundGeo,groundMat);
  scene.add(ground);



  ground.position.x = 140;
  ground.position.y = 0;
  ground.position.z = -150;
  ground.rotation.x = -pi/2;

  const gridSize = 500;
  const gridDivisions = 500;
  const gridColor = 0x04d9ff
  gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
  scene.add(gridHelper);

  camera.position.x = 0.5;
  camera.position.y = 1;
  camera.position.z = 50;


  camera.rotation.y = 0;
  camera.rotation.z = 0;
  camera.rotation.x = -0.1;
  // camera.rotation.x = 0.6;

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( -20, 10, 30 );
  scene.add( directionalLight );

  pLight = new THREE.PointLight( 0xffffff, 1, 1000 );
  scene.add(pLight);

}

function makeHill(){



  var hillGeo = new THREE.PlaneGeometry(worldWidth, worldDepth, hillVertX, hillVertY);

  var hillMat	= new THREE.MeshPhongMaterial({
  // wireframe: true,
  color: 0x222222,
  emissive: 0x770000,
  emissiveIntensity: 0.2,
  polygonOffset: true,
  polygonOffsetFactor: 1, // positive value pushes polygon further away
  polygonOffsetUnits: 1
  });
  hillMat.shininess = 100;


  dx = camera.position.x;

  var scalex = 1, scaley = 1;
  var wx = 0.2, wy = 0.2;
  var positionAttribute = hillGeo.attributes.position;

  for ( var i = 0; i < positionAttribute.count; i ++ ) {
    // access single vertex (x,y,z)
    var x = positionAttribute.getX( i ) - dx;
    var y = positionAttribute.getY( i );
    var z = positionAttribute.getZ( i );
    // modify data (in this case just the z coordinate)
      // z += Math.random() * 20;

    z += 1.3*(x/5)*(x/4) - Math.abs((x/9)*(x/7)*(x/9)) -  Math.sqrt(Math.abs(x/15))*1.5;//+(y/10)*(y/10);
    z -= 3;
    // z -= Math.random() * 2.7;
    // z += Math.cos(y/5)-Math.cos(y/2)-0.5*Math.cos(y/10)+0.2*Math.cos(x/7);

    z += perlin((x+dx)/1000000000, y/1000000000, wx, wy)*10;


    // write data back to attribute
    positionAttribute.setXYZ( i, x, y, z );

}


  hill = new THREE.Mesh(hillGeo, hillMat);
  //
  var geo = new THREE.EdgesGeometry( hillGeo ); // or WireframeGeometry
  var mat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );
  var wireframe = new THREE.LineSegments( geo, mat );
  hill.add( wireframe );

  // for(var x = 0; x < worldWidth; x++){
  //   for(var z = 0; z < worldDepth; z++){
  //
  //
  //   }
  // }



  hillGeo.computeFaceNormals();
  hillGeo.computeVertexNormals();

  hill.rotation.x  = -3.1415/2;

  scene.add(hill);

}






function render(){
  requestAnimationFrame(render);
  //
  // skybox.position.copy(camera.position)
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (camera.position.z < 10){
    camera.position.z = 50;
  }

  camera.position.z -= 0.03;
  // camera.rotation.x += 0.1;
  pLight.position.set(camera.position.x +1,camera.position.y+1,camera.position.z+1);
  // hill.position.x += 0.01;
  // hill.rotation.x += 0.01;
  renderer.render(scene, camera);
};


window.addEventListener( 'resize', onWindowResize, false );

init();
makeHill();
render();

document.body.appendChild(renderer.domElement);



function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
