import * as THREE from 'three';
import * as ORE from 'ore-three-ts';

import { AssetManager } from './AssetManager';
import { Uniform } from 'three';

export class GlobalManager {

	public assetManager: AssetManager;
	public animator: ORE.Animator;

	constructor( param: { onPreAssetsLoaded?: Function, onMustAssetsLoaded?: Function, onSubAssetsLoaded?: Function } ) {

		window.gManager = this;

		this.animator = new ORE.Animator();
		this.assetManager = new AssetManager();
		param.onPreAssetsLoaded && this.assetManager.addEventListener( 'preAssetsLoaded', param.onPreAssetsLoaded );
		param.onMustAssetsLoaded && this.assetManager.addEventListener( 'mustAssetsLoaded', param.onMustAssetsLoaded );
		param.onSubAssetsLoaded && this.assetManager.addEventListener( 'subAssetsLoaded', param.onSubAssetsLoaded );

		setTimeout( () => {

			this.assetManager.load();

		}, 0 );


	}

	public update( deltaTime: number ) {

		this.animator.update( deltaTime );

	}

}

