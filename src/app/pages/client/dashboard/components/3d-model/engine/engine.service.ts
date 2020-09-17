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
  private hlight: THREE.AmbientLight;
  private light: THREE.PointLight;
  private light2: THREE.PointLight;
  private light3: THREE.PointLight;
  private light4: THREE.PointLight;
  private directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );

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
          gltf.scene.children[0].scale.set(0.5,0.5,0.5);
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
    this.renderer.setSize(857, 483);

    this.scene = new THREE.Scene();

    // пол сцены!
    let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    this.scene.add( mesh );
    let grid = new THREE.GridHelper( 10000, 4000, 0x999999, 0x999999 );
    this.scene.add( grid );


    this.camera = new THREE.PerspectiveCamera(25, 857 / 483, 10, 1500)
    this.camera.position.set( 500,150,50 );
    this.camera.lookAt( new THREE.Vector3() );
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

      this.hlight = new THREE.AmbientLight (0x0f0f0f,400);
      this.scene.add(this.hlight);

      this.directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
      this.directionalLight.position.set(0,1,0);
      this.directionalLight.castShadow = true;
      this.scene.add(this.directionalLight);

      this.light = new THREE.PointLight(0xc4c4c4,2);
      this.light.position.set(0,300,500);
      this.scene.add(this.light);

      this.light2 = new THREE.PointLight(0xc4c4c4,2);
      this.light2.position.set(500,100,0);
      this.scene.add(this.light2);

      this.light3 = new THREE.PointLight(0xc4c4c4,2);
      this.light3.position.set(0,100,-500);
      this.scene.add(this.light3);
      
      this.light4 = new THREE.PointLight(0xc4c4c4,2);
      this.light4.position.set(-500,300,500);
      this.scene.add(this.light4);

    this.multiLoad (
      '../../../../../../../assets/3d/scene.gltf'
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
    const width = 857;
    const height = 483;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}



