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
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls : OrbitControls;
  public on: boolean = false;
  public animationPlay: boolean = false;
  
  public array: any = [
    {
      texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/arid2_ft.jpg"),
      texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_bk.jpg'),
      texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_up.jpg'),
      texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_dn.jpg'),
      texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_rt.jpg'),
      texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_lf.jpg')
    },
    {
      texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/arid_ft.jpg"),
      texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_bk.jpg'),
      texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_up.jpg'),
      texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_dn.jpg'),
      texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_rt.jpg'),
      texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid_lf.jpg')
    },
    {
      texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/overcast_ft.jpg"),
      texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_bk.jpg'),
      texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_up.jpg'),
      texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_dn.jpg'),
      texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_rt.jpg'),
      texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/overcast_lf.jpg')
    },
    {
      texture_ft: new THREE.TextureLoader().load( "../../../../../../../assets/3d/quirk_ft.jpg"),
      texture_bk: new THREE.TextureLoader().load( '../../../../../../../assets/3d/quirk_bk.jpg'),
      texture_up: new THREE.TextureLoader().load( '../../../../../../../assets/3d/quirk_up.jpg'),
      texture_dn: new THREE.TextureLoader().load( '../../../../../../../assets/3d/quirk_dn.jpg'),
      texture_rt: new THREE.TextureLoader().load( '../../../../../../../assets/3d/quirk_rt.jpg'),
      texture_lf: new THREE.TextureLoader().load( '../../../../../../../assets/3d/quirk_lf.jpg')
    },
  ]
  public index: number = 0;

  public constructor(
    ) {}

  public ngOnInit(): void {
    // this.createScene();
  }
  public createScene(){
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 1138 / 641, 10, 30000);
      this.camera.position.set(0,0,0);
      this.renderer = new THREE.WebGLRenderer({
        antialias:true
      });
      this.renderer.setSize(1138, 641);
      document.querySelector('.engine-wrapper').appendChild(this.renderer.domElement);
      
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 200;
      this.controls.maxDistance = 2000;

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
      requestAnimationFrame(this.animate.bind(this));
    }

    public onOff(){
      if(!this.on){
        this.on = !this.on;
        let selection = document.querySelector('.engine-wrapper')
        selection.childNodes.forEach((item) => {
          if(item.nodeName === "CANVAS"){
            selection.removeChild(item)
          }
        })
        this.createScene();
        return
      }
      this.animationPlay = true;
      setTimeout(() => {
        let selection = document.querySelector('.engine-wrapper')
        selection.childNodes.forEach((item) => {
          if(item.nodeName === "CANVAS"){
            selection.removeChild(item)
          }
        })
        this.animationPlay = false;
        this.on = !this.on;
        this.index = 0;
      }, 3500)
    }
    public plus(){
      if(this.index < this.array.length - 1 && this.on){
        let selection = document.querySelector('.engine-wrapper')
        selection.childNodes.forEach((item) => {
          if(item.nodeName === "CANVAS"){
            selection.removeChild(item)
          }
        })
        this.index++;
        this.createScene();
        return;
      }
    }
    public minus(){
      if(this.index > 0 && this.on){
        let selection = document.querySelector('.engine-wrapper')
        selection.childNodes.forEach((item) => {
          if(item.nodeName === "CANVAS"){
            selection.removeChild(item)
          }
        })
        this.index--;
        this.createScene();
        return;
      }
    }

}
