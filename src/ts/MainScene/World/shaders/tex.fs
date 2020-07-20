uniform sampler2D texture;
varying vec2 vUv;

void main( void ) {

  vec2 uv = vec2( vUv.x, 1.0 - vUv.y );

  gl_FragColor = texture2D( texture, uv );

}