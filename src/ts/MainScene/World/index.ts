import * as THREE from 'three';
import * as ORE from 'ore-three-ts';

import basicVert from './shaders/basic.vs';
import texFrag from './shaders/tex.fs';

export class World {

	private commonUniforms: ORE.Uniforms;
	private scene: THREE.Scene;
	private layoutController: ORE.LayoutController[] = [];

	constructor( scene: THREE.Scene, commonUniforms: ORE.Uniforms ) {

		this.scene = scene;

		this.commonUniforms = commonUniforms;

		this.init();

	}

	protected init() {

	}

	public update( spWeight: number ) {

		for ( let i = 0; i < this.layoutController.length; i ++ ) {

			this.layoutController[ i ].updateTransform( spWeight );

		}

	}

}
