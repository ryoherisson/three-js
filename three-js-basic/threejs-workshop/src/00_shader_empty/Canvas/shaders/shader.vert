// vertex shader ( 頂点シェーダー )
// このファイルに各頂点ごとの処理を記述します

varying float vSample;// varying: 頂点シェーダーからピクセルシェーダーに変数を送るための装飾子
varying vec2 vUv;

void main() {
  vUv = uv;// uv: ShaderMaterialで補完される vec2 型(xy)の変数。テクスチャ座標のこと。
  vSample = 0.5;// main() の中で値を代入する

  vec3 pos = position;// position: ShaderMaterialで補完される vec3 型(xyz)の変数。ジオメトリの頂点のこと。

  // pos.y = (pos.y * 0.5) + sin(pos.x * 3.0) * 0.5;
  gl_Position = vec4( pos, 1.0 );
}
