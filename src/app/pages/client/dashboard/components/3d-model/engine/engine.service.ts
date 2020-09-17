import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
  private light1: THREE.AmbientLight;
  private light2: THREE.AmbientLight;

  private light3: THREE.Light

  private cube: THREE.Mesh;

  private frameId: number = null;

  public controls : OrbitControls;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public loader = new GLTFLoader();

  private multiLoad(...model) {
      let arr = [...model];
      arr.forEach(item => {
        this.loader.load( item, gltf => {
          console.log(gltf.scene);
          
          // gltf.scene.children[0].scale.set(2, 2, 2)
          // gltf.scene.children[3].scale.set(2, 2, 2)
          // gltf.scene.children[4].scale.set(2, 2, 2)
    
           this.scene.add(gltf.scene);
         }, err => err );
      })
  }


  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    // пол сцены!
    let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    this.scene.add( mesh );
    let grid = new THREE.GridHelper( 100, 40, 0x000000, 0x000000 );
    this.scene.add( grid );


    this.scene.fog = new THREE.Fog( 0x91a3b0 , 0, 120 );

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500)
    this.camera.position.set( 0,4,8 );
    this.camera.lookAt( new THREE.Vector3( ) );
    this.scene.add(this.camera);
    
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

      this.controls.enableKeys = true
      this.controls.keys = {
          LEFT: 37, //left arrow
          UP: 38, // up arrow
          RIGHT: 39, // right arrow
          BOTTOM: 40 // down arrow
      }
      this.controls.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
      }
      this.controls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
      }
      this.controls.screenSpacePanning = true

    this.light = new THREE.AmbientLight( 0x3a5050 );
    this.light.position.set(-500,100,500);
    this.scene.add(this.light);

    this.light1 = new THREE.AmbientLight( 0x576b6e );
    this.light1.position.set(-200,100,400);
    this.scene.add(this.light1);

    this.light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.light2.position.set(-500,100,500);
    this.scene.add( this.light2 );

    this.light3 = new THREE.Light('#f50a26') 
    this.light3.position.set(-500,100,500);
    this.scene.add( this.light3 );
    

    this.multiLoad (
      '../../../../../../../assets/3d/scene.gltf', 
      '../../../../../../../assets/3d/uploads_files_2226358_STOOL.glb'
    )
    
  }
  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.controls.update()
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.controls.update()
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.controls.update()
        this.resize();
      });
    });
  }


  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
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



