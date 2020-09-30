import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EngineService } from './engine.service';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  // @ViewChild('rendererCanvas', null) rendererCanvas: ElementRef;
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  public canvas: HTMLCanvasElement;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls : OrbitControls;
  public light: THREE.DirectionalLight;
  public on: boolean = false;
  public animationPlay: boolean = false;

  public constructor(
    ) {}

  public ngOnInit(): void {
    this.createScene();
  }
  public createScene(){
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
    this.camera.position.z = 3;
    this.canvas = this.rendererCanvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias:true,
    });
    this.renderer.setSize(1138, 641);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('mousewheel',myOnMouseDownFunction);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    const color = 0xFFFFFF;
    const intensity = 1;
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      '../../../../../../../assets/3d/timothy-oldfield-luufnHoChRU-unsplash.jpg',
      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(this.renderer, texture);
        this.scene.background = rt;
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: '0x44aa88'});
  
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    
        cube.position.x = 0;
      });
    
      this.animate();
    }
    public animate() {
      this.renderer.render(this.scene,this.camera);
      requestAnimationFrame(this.animate.bind(this));
    }

    public onOff(){
      if(!this.on){
        this.on = !this.on;
        return
      }
      this.animationPlay = true;
      setTimeout(() => {
        this.animationPlay = false;
        this.on = !this.on;
      }, 3500)
    }
}
