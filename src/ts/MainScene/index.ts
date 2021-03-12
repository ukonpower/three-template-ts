import * as ORE from 'ore-three-ts';
import * as THREE from 'three';
import { GlobalManager } from './GlobalManager';
import { RenderPipeline } from './RenderPipeline';
import { CameraController } from './CameraController';
export class MainScene extends ORE.BaseLayer {

	private gManager: GlobalManager;
	private renderPipeline: RenderPipeline;
	private cameraController: CameraController;

	constructor() {

		super();

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {} );

	}

	onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		this.gManager = new GlobalManager( {
			onMustAssetsLoaded: () => {

				this.scene.add( window.assetManager.gltfScene );

				this.initScene();

				window.dispatchEvent( new Event( 'resize' ) );

			}
		} );

	}

	private initScene() {

		this.renderPipeline = new RenderPipeline( this.renderer, 0.5, 3.0, this.commonUniforms );

		this.cameraController = new CameraController( this.camera, this.scene.getObjectByName( 'CameraData' ) );

		let light = new THREE.DirectionalLight();
		light.intensity = 0.8;
		light.position.set( 1, 2, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

		if ( ! window.assetManager.isLoaded ) return;

		this.cameraController.update( deltaTime );

		this.renderPipeline.render( this.scene, this.camera );

	}

	public onResize() {

		super.onResize();

		if ( ! window.assetManager.isLoaded ) return;

		this.renderPipeline.resize( this.info.size.canvasPixelSize );

	}

	public onHover( args: ORE.TouchEventArgs ) {

		if ( ! window.assetManager.isLoaded ) return;

		this.cameraController.updateCursor( args.normalizedPosition );

	}

}
