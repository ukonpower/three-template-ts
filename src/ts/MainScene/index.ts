import * as ORE from 'ore-three-ts';
import * as THREE from 'three';
import { GlobalManager } from './GlobalManager';
import { World } from './World';

export class MainScene extends ORE.BaseScene {

	private commonUniforms: ORE.Uniforms;

	private box: THREE.Mesh;
	private gManager: GlobalManager;
	private world: World;

	constructor() {

		super();

		this.name = "MainScene";

		this.commonUniforms = {
			time: {
				value: 0
			}
		};

	}

	onBind( gProps: ORE.GlobalProperties ) {

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;

		this.gManager = new GlobalManager( {
			onMustAssetsLoaded: () => {

				this.initScene();

			}
		} );

	}

	private initScene() {

		this.world = new World( this.scene, this.commonUniforms );

		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );

		this.box = new THREE.Mesh( new THREE.BoxBufferGeometry(), new THREE.MeshNormalMaterial() );
		this.scene.add( this.box );

	}

	public animate( deltaTime: number ) {

		if ( this.gManager.assetManager.isLoaded ) {

			this.box.rotateY( 0.01 );

		}

		this.renderer.render( this.scene, this.camera );

	}

	public onResize( args: ORE.ResizeArgs ) {

		super.onResize( args );

	}

}
