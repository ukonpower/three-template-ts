import * as THREE from 'three';
import * as ORE from 'ore-three-ts';

import basicVert from './shaders/basic.vs';
import texFrag from './shaders/tex.fs';

import { SPRayoutController } from './SPRayoutController';

export class World {

	private commonUniforms: ORE.Uniforms;
	private scene: THREE.Scene;
	private spRayoutContorllers: SPRayoutController[] = [];

	constructor( scene: THREE.Scene, commonUniforms: ORE.Uniforms ) {

		this.scene = scene;

		this.commonUniforms = commonUniforms;

		this.init();

	}

	protected init() {

	}

	public update( spWeight: number ) {

		for ( let i = 0; i < this.spRayoutContorllers.length; i ++ ) {

			this.spRayoutContorllers[ i ].updateTransform( spWeight );

		}

	}

}
