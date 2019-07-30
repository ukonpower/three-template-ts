import * as ORE from 'ore-three-ts'
import * as THREE from 'three';

export default class MainScene extends ORE.BaseScene{

	private renderer: THREE.WebGLRenderer;
	private box: THREE.Mesh;
	private light: THREE.Light;

	constructor(){

		super();

		this.name = "MainScene";
	
	}

	onBind( gProps: ORE.GlobalProperties ){

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;
		
		this.camera.position.set( 0, 1.5, 3 );
        this.camera.lookAt( 0, 0, 0 );

        var boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
        var boXMat = new THREE.MeshNormalMaterial();
        this.box = new THREE.Mesh( boxGeo, boXMat );
		this.scene.add( this.box );

        this.light = new THREE.DirectionalLight();
        this.light.position.y = 10;
		this.scene.add( this.light );

	}

	public onUnbind( ){

	}

	public animate( deltaTime: number ){

        this.box.rotateY(0.01);
		
		this.renderer.render( this.scene, this.camera );
	
	}

	public onResize(width, height) {
		
		super.onResize(width,height);
	
	}

    public onTouchStart( cursor: ORE.Cursor, event: MouseEvent ) {

	}

    public onTouchMove( cursor: ORE.Cursor, event: MouseEvent ) {

	}

    public onTouchEnd( cursor: ORE.Cursor, event: MouseEvent ) {

	}

	public onHover( cursor: ORE.Cursor ){

	}

	public onWheel( event: WheelEvent ){

	}
}