import * as ORE from 'ore-three-ts';
import { MainScene } from './MainScene';

import { GlobalManager } from './MainScene/GlobalManager';
import { AssetManager } from './MainScene/GlobalManager/AssetManager';

declare global {
	interface Window {
		gManager: GlobalManager;
		assetManager: AssetManager;
		isIE: boolean;
		isSP: boolean;
		mainScene: MainScene;
	}
}

class APP {

	private canvas: HTMLCanvasElement;
	private controller: ORE.Controller;

	constructor() {

		this.checkUA();

		this.initORE();

	}

	private checkUA() {

		var ua = navigator.userAgent;
		window.isSP = ( ua.indexOf( 'iPhone' ) > 0 || ua.indexOf( 'iPod' ) > 0 || ua.indexOf( 'Android' ) > 0 && ua.indexOf( 'Mobile' ) > 0 || ua.indexOf( 'iPad' ) > 0 || ua.indexOf( 'Android' ) > 0 || ua.indexOf( 'macintosh' ) > 0 );
		window.isSP = window.isSP || navigator.platform == "iPad" || ( navigator.platform == "MacIntel" && navigator.userAgent.indexOf( "Safari" ) != - 1 && navigator.userAgent.indexOf( "Chrome" ) == - 1 && ( navigator as any ).standalone !== undefined );

	}

	private initORE() {

		this.canvas = document.querySelector( "#canvas" );

		this.controller = new ORE.Controller( {

			canvas: this.canvas,
			retina: true,

		} );

		this.controller.bindScene( new MainScene() );

	}

}

window.addEventListener( 'load', ()=>{

	let app = new APP();

} );
