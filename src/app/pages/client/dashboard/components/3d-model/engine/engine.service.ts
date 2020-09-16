import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

// import * as THREE from '../lib/Three';
// import * as Loader from  '../lib/GTFLLoader';
// import * as Controls from '../lib/OrbitControls';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public loader = new GLTFLoader();

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();


    // пол сцены!!!!!
    let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    this.scene.add( mesh );
    let grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
    //  grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    this.scene.add( grid );

    // let controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.scene.fog = new THREE.Fog( 0x91a3b0 , 0, 120 );

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.camera.position.set( -1, 9, 5 );
    this.camera.lookAt( new THREE.Vector3( 0, 2, 0 ) );
    this.scene.add(this.camera);
    

    this.light = new THREE.AmbientLight( 0x404040 );
    this.light.position.set(-500,100,500);
    this.scene.add(this.light);

    this.scene.rotation.x += 5;
    this.scene.rotation.y += 6;
    this.scene.rotation.z += 5;
    
    this.loader.load( '../../../../../../../assets/3d/uploads_files_2226358_STOOL.glb', gltf => {
      console.log(this.scene, 'scenaaaaa');
     
       this.scene.add(gltf.scene);
     }, err => err );
    
  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          console.log('in event-listener 80');
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    // Работает rotate, но пропадает боковое меню !!!!
    // 
    // this.scene.children[2].rotation.x += 0.005;
    // this.scene.children[2].rotation.y += 0.0000008;
    // this.scene.children[2].rotation.z += 0.0007;

    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}














  // scene
  // private canvas: HTMLCanvasElement;
  // public scene: THREE.Scene;
  // camera
  // renderer

  // createScene(canvas: ElementRef<HTMLCanvasElement>) {
  //   this.scene = new THREE.Scene();
  //   this.scene.background = new THREE.Color(0xdddddd);
  //   let camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
  //   camera.rotation.y = 45/180*Math.PI;
  //   camera.position.x = 800;
  //   camera.position.y = 100;
  //   camera.position.z = 1000;
  //   let controls = new Controls.OrbitControls(camera);
  //   controls.addEventListener('change', this.renderer);
  //  let  hlight = new THREE.AmbientLight (0x404040,100);
  //   this.scene.add(hlight);
  //   let directionalLight = new THREE.DirectionalLight(0xffffff,100);
  //   directionalLight.position.set(0,1,0);
  //   directionalLight.castShadow = true;
  //   this.scene.add(directionalLight);
  //  let  light = new THREE.PointLight(0xc4c4c4,10);
  //   light.position.set(0,300,500);
  //   this.scene.add(light);
  //  let light2 = new THREE.PointLight(0xc4c4c4,10);
  //   light2.position.set(500,100,0);
  //   this.scene.add(light2);
  //  let light3 = new THREE.PointLight(0xc4c4c4,10);
  //   light3.position.set(0,100,-500);
  //   this.scene.add(light3);
  //  let light4 = new THREE.PointLight(0xc4c4c4,10);
  //   light4.position.set(-500,300,500);
  //   this.scene.add(light4);
  //  let renderer = new THREE.WebGLRenderer({antialias:true});
  //   renderer.setSize(window.innerWidth,window.innerHeight);
  //   document.body.appendChild(renderer.domElement);
  //   let loader = new THREE.GLTFLoader();
  //   loader.load( '../../../../../../../assets/3d/uploads_files_2226358_STOOL.glb', gltf => {
  //     let car = gltf.scene.children[0];
  //     car.scale.set(0.5,0.5,0.5);
  //     this.scene.add(gltf.scene);
  //     this.animate();
  //   });
  // }
  // animate() {
  //   this.renderer.render(this.scene, this.camera);
  //   requestAnimationFrame(this.animate);
  // }
// }


