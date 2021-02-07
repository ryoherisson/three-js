// import * as THREE from 'three';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Scene } from 'three/src/scenes/Scene';
import { PointLight } from 'three/src/lights/PointLight';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { MeshLambertMaterial } from 'three/src/materials/MeshLambertMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { Vector2 } from 'three/src/math/Vector2';

// このクラス内に three.js のコードを書いていきます
export default class Canvas {
  constructor(elementId) {

		// elementIdのついたDOM要素を取得
		this.element = document.getElementById(elementId);
		const rect = this.element.getBoundingClientRect();

    // ウィンドウサイズ
    this.w = window.innerWidth;
		this.h = window.innerHeight;

		// スクロール量
		this.scrollY = 0;
		
		// マウス座標
		this.mouse = new Vector2(0, 0);

    // レンダラーを作成
    this.renderer = new WebGLRenderer({alpha: true});
    this.renderer.setSize(this.w, this.h);// 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比

    // #canvas-containerにレンダラーのcanvasを追加
    const container = document.getElementById("canvas-container");
		container.appendChild(this.renderer.domElement);
		
		const fov = 60;
		const fovRad = (fov / 2) * (Math.PI / 180);
		const dist = (this.h / 2) / Math.tan(fovRad);

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(fov, this.w / this.h, 1, dist * 2);
    this.camera.position.z = dist;// カメラを遠ざける

    // シーンを作成
    this.scene = new Scene();

    // ライトを作成
    this.light = new PointLight(0x00ffff);
    this.light.position.set(0, 0, 400);// ライトの位置を設定

    // ライトをシーンに追加
    this.scene.add(this.light);

		// 立方体のジオメトリを作成(幅, 高さ, 奥行き)
		const depth = 300;
    const geo = new BoxGeometry(rect.width, rect.height, depth);

    // マテリアルを作成
    const mat = new MeshLambertMaterial({ color: 0xffffff });

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new Mesh(geo, mat);
    // this.mesh.rotation.x = Math.PI / 4;
    // this.mesh.rotation.y = Math.PI / 4;
    // this.mesh.rotation.x = Math.DEG2RAD * 45;
		// this.mesh.rotation.y = Math.DEG2RAD * 45;

		// ウィンドウ中心からDOMRect中心へのベクトルを求めてオフセットする
		const center = new Vector2(rect.left + rect.width / 2, rect.top + rect.height / 2);
		const diff   = new Vector2(center.x - this.w / 2, center.y - this.h / 2);
		this.mesh.position.set(diff.x, diff.y - center.y, -depth / 2);
		this.offsetY = this.mesh.position.y;

    // メッシュをシーンに追加
    this.scene.add(this.mesh);

    // 画面に表示
    // this.renderer.render(this.scene, this.camera);
		this.render();
		
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => { this.render(); });

    const sec = performance.now() / 1000;

		// let vx = 0.3 * (1.0 - Math.pow(Math.max(0.0, Math.cos(sec) * 2.0 - 1.0), 1.5));
		// let vy = 0.3 * (1.0 - Math.pow(Math.max(0.0, Math.sin(sec) * 2.0 - 1.0), 1.5));

    // this.mesh.rotation.x = sec * (Math.PI / 4) * vx;
    // this.mesh.rotation.y = sec * (Math.PI / 4) * vy;

		// this.mesh.scale.x *= Math.abs(Math.sin(sec));

		this.mesh.position.y = this.offsetY + this.scrollY;

    // 画面に表示
		this.renderer.render(this.scene, this.camera);
	}

	mouseMoved(x, y) {
		this.mouse.x = x - (this.w / 2);
		this.mouse.y = -y + (this.h / 2);

		this.light.position.x = this.mouse.x;
		this.light.position.y = this.mouse.y;

	}

	scrolled(y) {
		this.scrollY = y;
	}
};
