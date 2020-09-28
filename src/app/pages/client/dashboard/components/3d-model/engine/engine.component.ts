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
  public on: boolean = false;
  public animationPlay: boolean = false;
  public pause: boolean = false;
  
  public array: any = [
    {
      texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/arid2_ft.jpg"),
      texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_bk.jpg'),
      texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_up.jpg'),
      texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_dn.jpg'),
      texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_rt.jpg'),
      texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_lf.jpg')
    },
    // {
    //   texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/arid_ft.jpg"),
    //   texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_bk.jpg'),
    //   texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_up.jpg'),
    //   texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_dn.jpg'),
    //   texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_rt.jpg'),
    //   texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_lf.jpg')
    // },
    // {
    //   texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/overcast_ft.jpg"),
    //   texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_bk.jpg'),
    //   texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_up.jpg'),
    //   texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_dn.jpg'),
    //   texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_rt.jpg'),
    //   texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_lf.jpg')
    // },
    {
      texture_ft: new THREE.TextureLoader().load( "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg"),
      texture_bk: new THREE.TextureLoader().load( 'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg'),
      texture_up: new THREE.TextureLoader().load( 'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg'),
      texture_dn: new THREE.TextureLoader().load( 'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg'),
      texture_rt: new THREE.TextureLoader().load( 'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg'),
      texture_lf: new THREE.TextureLoader().load( 'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg')
    },
  ]
  public index: number = 0;

  public constructor(
    ) {}

  public ngOnInit(): void {
    this.createScene();
  }
  public createScene(){
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 1138 / 641, 10, 30000);
      this.camera.position.set(0,0,0);
      // this.camera.enabled(false)
      this.canvas = this.rendererCanvas.nativeElement;
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias:true,
      });
      this.renderer.setSize(1138, 641);
      
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 200;
      this.controls.maxDistance = 2000;
      this.controls.target.set(0, 0, 0);
      this.controls.update();

      // const geometry1 = new THREE.BoxGeometry(1, 1, 1);

      // function makeInstance(geometry, color, x) {
      //   const material = new THREE.MeshPhongMaterial({color});
    
      //   const cube = new THREE.Mesh(geometry, material);
      //   this.scene.add(cube);
    
      //   cube.position.x = x;
    
      //   return cube;
      // }
    
      // const cubes = [
      //   makeInstance(geometry1, 0x44aa88,  0),
      //   makeInstance(geometry1, 0x8844aa, -2),
      //   makeInstance(geometry1, 0xaa8844,  2),
      // ];


      let materialArray = [];
      for( let item in this.array[this.index]){
        materialArray.push(new THREE.MeshBasicMaterial( { map: this.array[this.index][item] }))
      }
        
      for (let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
      }
      const geometry = new THREE.BoxGeometry( 5000, 5000 , 5000, 6, 6, 6 );
      const sphere = new THREE.Mesh( geometry, materialArray );
      this.scene.add( sphere );
      this.animate();
    }
    public animate() {
      this.renderer.render(this.scene,this.camera);
      if(this.pause){
        return
      }
      requestAnimationFrame(this.animate.bind(this));
    }

    public onOff(){
      if(!this.on){
        this.on = !this.on;
        setTimeout(() => {
          this.pause = false;
          this.createScene();
        }, 50)
        return
      }
      this.animationPlay = true;
      setTimeout(() => {
        this.animationPlay = false;
        this.on = !this.on;
        this.index = 0;
        this.pause = true;
      }, 3500)
    }
    public plus(){
      if(this.index < this.array.length - 1 && this.on){
        this.index++;
        this.pause = true;
        setTimeout(() => {
          this.pause = false;
          this.createScene();
        }, 50)
        return;
      }
    }
    public minus(){
      if(this.index > 0 && this.on){
        this.index--;
        this.pause = true;
        setTimeout(() => {
          this.pause = false;
          this.createScene();
        }, 50)
        return;
      }
    }

}
