import * as ORE from 'ore-three';
import { GlobalManager } from './GlobalManager';
import { RenderPipeline } from './RenderPipeline';
import { CameraController } from './CameraController';
import { AssetManager } from './GlobalManager/AssetManager';
import { World } from './World';
export class MainScene extends ORE.BaseLayer {

	private gManager: GlobalManager;
	private renderPipeline: RenderPipeline;

	private cameraController?: CameraController;
	private world?: World;

	constructor( param: ORE.LayerParam ) {

		super( param );

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {} );

		/*-------------------------------
			Gmanager
		-------------------------------*/

		this.gManager = new GlobalManager();

		this.gManager.assetManager.load( {
			assets: [
				{ name: 'scene', path: './assets/scene/scene.glb', type: 'gltf' }
			]
		} );

		this.gManager.assetManager.addEventListener( 'loadMustAssets', ( e ) => {

			let gltf = ( e.target as AssetManager ).getGltf( 'scene' );

			if ( gltf ) {

				this.scene.add( gltf.scene );

			}

			this.initScene();
			this.onResize();

		} );

		/*-------------------------------
			RenderPipeline
		-------------------------------*/

		this.renderPipeline = new RenderPipeline( this.renderer, this.commonUniforms );

	}

	onUnbind() {

		super.onUnbind();

		if ( this.world ) {

			this.world.dispose();

		}

	}

	private initScene() {

		/*-------------------------------
			CameraController
		-------------------------------*/

		this.cameraController = new CameraController( this.camera, this.scene.getObjectByName( 'CameraData' ) );

		/*-------------------------------
			World
		-------------------------------*/

		this.world = new World( this.scene, this.commonUniforms );
		this.scene.add( this.world );

	}

	public animate( deltaTime: number ) {

		if ( this.gManager ) {

			this.gManager.update( deltaTime );

		}

		if ( this.cameraController ) {

			this.cameraController.update( deltaTime );

		}

		if ( this.world ) {

			this.world.update( deltaTime );

		}

		this.renderPipeline.render( this.scene, this.camera );

	}

	public onResize() {

		super.onResize();

		if ( this.cameraController ) {

			this.cameraController.resize( this.info );

		}

		if ( this.world ) {

			this.world.resize( this.info );

		}

		this.renderPipeline.resize( this.info );

	}

	public onHover( args: ORE.TouchEventArgs ) {

		if ( this.cameraController ) {

			this.cameraController.updateCursor( args.screenPosition );

		}

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {
	}

	public onTouchMove( args: ORE.TouchEventArgs ) {
	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {
	}

	public onWheelOptimized( event: WheelEvent ) {
	}

}
