const gulp = require( 'gulp' );
const webpackStream = require( 'webpack-stream' );
const webpack = require( 'webpack' );
const webpackConfig = require( './webpack.config.js' );
const browserSync = require( 'browser-sync' );
const autoprefixer = require( 'gulp-autoprefixer' );
const plumber = require( 'gulp-plumber' );
const sass = require( 'gulp-sass' );
const cssmin = require( 'gulp-cssmin' );
const del = require( 'del' );
const minimist = require( 'minimist' );

const options = minimist( process.argv.slice( 2 ), {

	default: {
		P: false,
	}
	
} );

gulp.task( "webpack",function(){

	let conf = webpackConfig;
	conf.entry.main = './src/ts/main.ts';
	conf.output.filename = 'script.js';

	if( options.P ){

		conf.mode = 'production';

	}

	return webpackStream( conf, webpack ).on( 'error', function ( e ) {
			this.emit( 'end' );
		} )
		.pipe( gulp.dest( "./public/js/" ) )
		.unpipe( browserSync.reload() );
		
} );

gulp.task( "sass",function( c ){
	
	return gulp.src( "./src/scss/style.scss" )
		.pipe( plumber() )
		.pipe( autoprefixer() )
		.pipe( sass() )
		.pipe( cssmin() )
		.pipe( gulp.dest( "./public/css/" ) )
		.pipe( browserSync.stream() );
		
} );

gulp.task( 'copy', function( c ){
	
	gulp.src( ['./src/html/**/*'] ).pipe( gulp.dest( './public/' ) );
	gulp.src( ['./src/assets/**/*'] ).pipe( gulp.dest( './public/assets/' ) );

	browserSync.reload();
	
	c();
	
} );

gulp.task( 'browser-sync',function(){

	browserSync.init( {
		server: {
			baseDir: "public",
			index: "index.html"
		},
		open: true
	} );

} );

gulp.task( 'reload',function(){

	browserSync.reload();

} );

gulp.task( 'clean', function( c ){

	del( [

		'./public/'
		
	],{

		force: true,

	} ).then( (paths) => {

		c();

	} );

} );

gulp.task( 'watch', function(){

	gulp.watch( './src/ts/**/*', gulp.series( 'webpack' ) );
	gulp.watch( './src/scss/*.scss', gulp.task( 'sass' ) );
	gulp.watch( './src/html/**/*', gulp.task( 'copy' ) );
	gulp.watch( './src/assets/**/*', gulp.task( 'copy' ) );
	
} );

gulp.task( 'default', gulp.series( 
	'clean',
	gulp.parallel( 
		'webpack', 'sass'
	 ),
	'copy',
	gulp.parallel( 'browser-sync', 'watch' ),
 ) );