
let scene, camera, renderer, 
	geometry, material, cube,
	ArToolkitSource, ArToolkitContext, ArMarkerControls;

scene = new THREE.Scene();
camera = new THREE.Camera();
scene.add(camera);

renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

ArToolkitSource = new THREEx.ArToolkitSource({
	sourceType: "webcam",
})

ArToolkitSource.init(function() {
	setTimeout(function() {
		ArToolkitSource.onResizeElement();
		ArToolkitSource.copyElementSizeTo( renderer.domElement)
	},2000)
})

ArToolkitContext = new THREEx.ArToolkitContext({
	cameraParametersUrl: 'camera_para.dat',
	detectionMode: 'color_and_matrix',
})

ArToolkitContext.init(function() {
	camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
})


ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
	type: 'pattern',
	patternUrl:'pattern-R.patt',
	changeMatrixMode: 'cameraTransformMatrix'
})

scene.visible = false;

geometry = new THREE.CubeGeometry( 1, 1, 1 );
material = new THREE.MeshNormalMaterial( { 
	transparent: true,
	opacity: 0.5,
	side: THREE.DoubleSide
} );
cube = new THREE.Mesh( geometry, material );
cube.position.y = geometry.parameters.height / 2;
scene.add( cube );


function animate() {
	requestAnimationFrame( animate );
	ArToolkitContext.update(ArToolkitSource.domElement);
	scene.visible = camera.visible;
	renderer.render( scene, camera );
};

animate(); scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

geometry = new THREE.BoxGeometry( 1, 1, 1 );
material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();