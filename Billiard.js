function printMat(m, fixed) {
  if(fixed===undefined) fixed = 2;


  var len = Math.sqrt(m.elements.length);
  for(var r=0;r<len; ++r) {
      var str = '';
      for (var c=0; c<len; ++c) {
          var num = m.elements[c*len+r];
          if (num>=0) str += ' ' + num.toFixed(fixed) + ' ';
          else str += num.toFixed(fixed) + ' ';
      }
      console.log(str);
  }
}

//  scene
var clock = new THREE.Clock();
var scene = new THREE.Scene();

var canvas = document.getElementById("myCanvas");
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({canvas:canvas});
var temp;
 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
 
renderer.shadowMap.Enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 
var ambientLight = new THREE.AmbientLight(0x404040 );
scene.add(ambientLight);

//Create a SpotLight and turn on shadows for the light
const light = new THREE.SpotLight( 0xffffff );
light.position.set(50,50,300);
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
light.shadow.focus = 1; // default

 
 
camera.position.z = 200;
camera.position.y = 0;
camera.position.x = 0;

 
// defining user variables
var ballSize = 5;
 
var tableWidth = 100; // play surface dimentions
var tableHeight = 200;
 
var legHeight = 100; // table leg dimentions
var legWidth = 10;
 
var borderWidth = 10; // border width
 

// floor
var floorGeo = new THREE.PlaneGeometry(1000, 1000, 1,1);
var floorGeoMat = new THREE.MeshStandardMaterial( { color: "gray" } );
var floor = new THREE.Mesh(floorGeo,floorGeoMat);
floor.position.z = -tableWidth;
floor.receiveShadow = true;
//floor.castShadow = true;
 
scene.add(floor);


// roof
var roofG = new THREE.PlaneGeometry(1000, 1000, 1,1);
var roofMat = new THREE.MeshStandardMaterial( { color: "gray" } );
var roof = new THREE.Mesh(roofG,roofMat);
roof.position.z = 300;
roof.receiveShadow = true;
 
scene.add(roof);


const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.z = -20
roof.add( sphere );
 
// play surface
var tableSurfaceGeo = new THREE.BoxGeometry(tableWidth, tableHeight, 1,1);
var tableSurfaceMat = new THREE.MeshPhongMaterial( { color: "green" } );
var tableSurface = new THREE.Mesh(tableSurfaceGeo, tableSurfaceMat);
scene.add(tableSurface);
tableSurface.position.x=0;
tableSurface.position.y=0;
tableSurface.castShadow = true;
tableSurface.receiveShadow = true;

light.target = tableSurface;

// table borders x 4
var borderMat = new THREE.MeshPhongMaterial({color: "green"});
 
var leftBorderGeo = new THREE.BoxGeometry(borderWidth, borderWidth, tableHeight + legWidth);
var leftBorder = new THREE.Mesh(leftBorderGeo, borderMat);
leftBorder.position.x = -tableWidth/2;
leftBorder.castShadow = true;
 
var rightBorderGeo = new THREE.BoxGeometry(borderWidth, borderWidth, tableHeight + legWidth);
var rightBorder = new THREE.Mesh(rightBorderGeo, borderMat);
rightBorder.position.x = tableWidth/2;
rightBorder.castShadow = true;
 
var topBorderGeo = new THREE.BoxGeometry(tableWidth + legWidth, borderWidth, borderWidth);
var topBorder = new THREE.Mesh(topBorderGeo, borderMat);
topBorder.position.z = tableHeight/2;
topBorder.castShadow = true;
 
var bottomBorderGeo = new THREE.BoxGeometry(tableWidth + legWidth, borderWidth, borderWidth);
var bottomBorder = new THREE.Mesh(bottomBorderGeo, borderMat);
bottomBorder.position.z = -tableHeight/2;
bottomBorder.castShadow = true;
 
var borders = new THREE.Mesh();
borders.add(leftBorder);
borders.add(rightBorder);
borders.add(topBorder);
borders.add(bottomBorder);
borders.rotation.x = Math.PI/2;
scene.add(borders);
 
// table legs
var legsMat = new THREE.MeshPhongMaterial({color: "brown"}); 
var leftBotLegGeo = new THREE.BoxGeometry(borderWidth, tableWidth, borderWidth);
var leftBotLeg = new THREE.Mesh(leftBotLegGeo, borderMat);
leftBotLeg.position.x = -tableWidth/2;
leftBotLeg.position.y =  -tableWidth/2;
leftBotLeg.position.z = -tableHeight/2;
leftBotLeg.castShadow = true;
 
var rightBotLegGeo = new THREE.BoxGeometry(borderWidth, tableWidth, borderWidth);
var rightBotLeg = new THREE.Mesh(rightBotLegGeo, borderMat);
rightBotLeg.position.x = tableWidth/2;
rightBotLeg.position.y = - tableWidth/2;
rightBotLeg.position.z = tableHeight/2;
rightBotLeg.castShadow = true;
 
var leftTopLegGeo = new THREE.BoxGeometry(borderWidth, tableWidth, borderWidth);
var leftTopLeg = new THREE.Mesh(leftTopLegGeo, borderMat);
leftTopLeg.position.x = -tableWidth/2;
leftTopLeg.position.y = - tableWidth/2;
leftTopLeg.position.z = tableHeight/2;
leftTopLeg.castShadow = true;
 
var rightTopLegGeo = new THREE.BoxGeometry(borderWidth, tableWidth, borderWidth);
var rightTopLeg = new THREE.Mesh(rightTopLegGeo, borderMat);
rightTopLeg.position.x = tableWidth/2;
rightTopLeg.position.y = - tableWidth/2;
rightTopLeg.position.z = -tableHeight/2;
rightTopLeg.castShadow = true;
 
var legs = new THREE.Mesh();
legs.add(leftBotLeg);
legs.add(rightBotLeg);
legs.add(leftTopLeg);
legs.add(rightTopLeg);
 
legs.rotation.x = Math.PI/2;
legs.castShadow = true;
scene.add(legs);
 
var x=Math.random()*200-200;
var y=Math.random()*200-200;
var z=0;
 
var controls = new THREE.TrackballControls( camera, canvas );
var playBalls = [];

var generatePlayBalls = function(){
   
    var startPosY=0;
    var startPosX=0;
    var startPosZ=ballSize;
   
    startPosX -= ballSize*4;
    startPosY -= tableHeight*0.5-(tableHeight*0.5*0.25);
 
    var counter=0;

    for(var i=0; i<imgBase64Array.length; i++){
        var tmpX = startPosX;
        var tmpY = startPosY;
       
        var tmp = new THREE.Mesh(ballGeo,ballMat);
        tmp.direction = new THREE.Vector3(0,0,0);
        tmp.position.x = tmpX;
        tmp.position.y = tmpY;
        tmp.position.z = startPosZ;
        playBalls[counter]=tmp;
        tmpX+=ballSize*2+1;
        tmp.castShadow = true;
       
        counter++;
      
      startPosY+=ballSize*2;
      startPosX+=ballSize;

      var ballGeo = new THREE.IcosahedronGeometry(ballSize, 2);
      var ballMat = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load(imgBase64Array[i])});
      var ball = new THREE.Mesh(ballGeo, ballMat);
      
      ball.castShadow = true;
      scene.add(ball);
  
      ball.direction = new THREE.Vector3(x,y,z);
      ball.position.x = Math.random()*40-40;
      ball.position.y = Math.random()*50;
      ball.position.z = ballSize;
  
      playBalls[i]=ball;
  }
 }

 function resetSpeed(){
    for(var i=0; i<imgBase64Array.length; i++){

    playBalls[i].direction = new THREE.Vector3(x,y,z);
    playBalls[i].position.x = Math.random()*40-40;
    playBalls[i].position.y = Math.random()*50;
    playBalls[i].position.z = ballSize;
  }
 }


 
//function to calculate reflection vector
var reflectionVector = function(v,n){
    var dotP = new THREE.Vector3();
    var result = new THREE.Vector3();  
    var velocity = v;
    var normal = n;
 
    dotP = v.dot(n);
    normal.multiplyScalar(dotP);
    normal.multiplyScalar(2);
    result.subVectors(velocity,normal);
    return result;
}

function printMat(m, fixed) {
  if(fixed===undefined) fixed = 2;


  var len = Math.sqrt(m.elements.length);
  for(var r=0;r<len; ++r) {
      var str = '';
      for (var c=0; c<len; ++c) {
          var num = m.elements[c*len+r];
          if (num>=0) str += ' ' + num.toFixed(fixed) + ' ';
          else str += num.toFixed(fixed) + ' ';
      }
  }
}

/**
* add x,y,z coordinate axes to scene
*/
function addWorldAxes(parent, opts) {

  // Default arguments
  if(opts === undefined) opts={}; 
  if(opts.len===undefined) opts.len = 1.5;
  if(opts.thick===undefined) opts.thick = opts.len/100;
 
  // Material and Geometry
  var redMat = new THREE.MeshBasicMaterial({color: 'red'});
  var greenMat = new THREE.MeshBasicMaterial({color: 'green'});
  var blueMat = new THREE.MeshBasicMaterial({color: 'blue'});
  var axisGeo = new THREE.CylinderGeometry(opts.thick, opts.thick, opts.len, 48);
  var headGeo = new THREE.CylinderGeometry(0, 3*opts.thick, 3*opts.thick, 48);

  // x-axis
  var xAxis = new THREE.Object3D();
  var ax = new THREE.Mesh(axisGeo, redMat);
  xAxis.add(ax);
  var head = new THREE.Mesh(headGeo, redMat);
  head.position.y = opts.len/2+opts.thick;
  xAxis.add(head);
  xAxis.rotation.z = -Math.PI/2;
  xAxis.position.x = opts.len/6;
  parent.add(xAxis);

  // y-axis
  var yAxis = new THREE.Object3D();
  ax = new THREE.Mesh(axisGeo, greenMat);
  yAxis.add(ax);
  head = new THREE.Mesh(headGeo, greenMat);
  head.position.y = opts.len/2+opts.thick;
  yAxis.add(head);
  yAxis.position.y=opts.len/6;
  parent.add(yAxis);

  // z-axis
  var zAxis = new THREE.Object3D();
  ax = new THREE.Mesh(axisGeo, blueMat);
  zAxis.add(ax);
  head = new THREE.Mesh(headGeo, blueMat);
  head.position.y = opts.len/2+opts.thick;
  zAxis.add(head);
  zAxis.rotation.x = Math.PI/2;
  zAxis.position.z = opts.len/6;
  parent.add(zAxis);
}
 
addWorldAxes(scene);

// Draw everything
var updatePos = function(){
    for(var i=0;i<playBalls.length;i++){
        playBalls[i].position.x += playBalls[i].direction.getComponent(0)*t; // new vector coordinates
        playBalls[i].position.y += playBalls[i].direction.getComponent(1)*t; // new vector coordinates
        playBalls[i].position.z += playBalls[i].direction.getComponent(2)*t; // new vector coordinates
        playBalls[i].direction.x -= playBalls[i].direction.x*0.02;
        playBalls[i].direction.y -= playBalls[i].direction.y*0.02;
    }
}
 
generatePlayBalls();
 
var checkCollisions = function(t){
    // checking collision with borders
    for(var i=0;i<=playBalls.length-1;i++){
        if(Math.abs(playBalls[i].position.x)+ballSize > tableWidth/2-borderWidth/2) { // checking collision with borders
            temp = new THREE.Vector3(tableHeight,0,0);
            temp.normalize();
            playBalls[i].direction = reflectionVector(playBalls[i].direction,temp); // bounce back according to this function
        }
        if(Math.abs(playBalls[i].position.y)+ballSize > tableHeight/2-borderWidth/2) {
            temp = new THREE.Vector3(0,tableWidth,0);
            temp.normalize();
            playBalls[i].direction = reflectionVector(playBalls[i].direction,temp);
        }
    }
	
    // checking collision in between balls
    for(var i=0;i<=playBalls.length-1;i++){
        for(var j=0;j<=playBalls.length-1;j++){
            if(playBalls[i].position.x < playBalls[j].position.x + ballSize*2 &&
            playBalls[i].position.x + ballSize*2 > playBalls[j].position.x &&
            playBalls[i].position.y < playBalls[j].position.y + ballSize*2 &&
            ballSize*2 + playBalls[i].position.y > playBalls[j].position.y){
                if(i!=j){
                        temp = new THREE.Vector3(playBalls[i].position.x-playBalls[j].position.x,playBalls[i].position.y-playBalls[j].position.y,0);
                        playBalls[j].direction.x -= (temp.getComponent(0));
                        playBalls[j].direction.y -= (temp.getComponent(1));
                        temp.normalize();
                        playBalls[i].direction = reflectionVector(playBalls[i].direction,temp); // bounce back according to this function
                }
            }
        }
    }
}
 
function render(){
    t = clock.getDelta();
    // if bouncing balls reached border bounce back
    if(t<1/40	)
	{
        checkCollisions(t);
        updatePos();
    }
	
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
   
}

render();
