import * as ORE from 'ore-three-ts';
import * as THREE from 'three';
import { GlobalManager } from './GlobalManager';
import { World } from './World';

import testVert from './shaders/test.vs';
import testFrag from './shaders/test.fs';

export class MainScene extends ORE.BaseScene {

	private commonUniforms: ORE.Uniforms;

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

		this.camera.position.set( 2, 1, 2 );
		this.camera.fov = 45;
		this.camera.lookAt( 0, 0, 0 );
		this.camera.updateProjectionMatrix();

		let box = new THREE.Mesh( new THREE.BoxBufferGeometry(), new THREE.MeshStandardMaterial() );
		this.scene.add( box );

		let light = new THREE.DirectionalLight();
		light.position.set( 1, 2, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

		this.renderer.render( this.scene, this.camera );

	}

	public onResize( args: ORE.ResizeArgs ) {

		super.onResize( args );

	}

}
