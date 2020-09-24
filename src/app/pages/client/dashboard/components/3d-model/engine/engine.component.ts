import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EngineService } from './engine.service';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit, AfterViewInit {

  // @ViewChild('rendererCanvas', null) rendererCanvas: ElementRef;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls : OrbitControls;

  public constructor(
    // private engServ: EngineService
    ) {}

  public ngOnInit(): void {
    // this.engServ.createScene(this.rendererCanvas);
    // this.engServ.animate();
    this.createScene();
  }
  public createScene(){
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 857 / 483, 10, 30000);
      this.camera.position.set(0,0,0);
      this.renderer = new THREE.WebGLRenderer({
        antialias:true
      });
      this.renderer.setSize(857, 483);
      // this.rendererCanvas.nativeElement.append(this.renderer.domElement);
      document.querySelector('.engine-wrapper').appendChild(this.renderer.domElement);
      
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 200;
      this.controls.maxDistance = 2000;

      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load( "../../../../../../../assets/3d/arid2_ft.jpg");
      let texture_bk = new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_bk.jpg');
      let texture_up = new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_up.jpg');
      let texture_dn = new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_dn.jpg');
      let texture_rt = new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_rt.jpg');
      let texture_lf = new THREE.TextureLoader().load( '../../../../../../../assets/3d/arid2_lf.jpg');
      
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
        
        
      for (let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
      }
        
      // let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
      // let skybox = new THREE.Mesh( skyboxGeo, materialArray );
      
      // this.scene.add( skybox );
      const geometry = new THREE.BoxGeometry( 5000, 5000 , 5000, 6, 6, 6 );
      // const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
      const sphere = new THREE.Mesh( geometry, materialArray );
      // sphere.material = new THREE.MeshBasicMaterial( {color: 0xaaaabb, wireframe: true})
      this.scene.add( sphere );
      this.animate();
    }
    public animate() {
      this.renderer.render(this.scene,this.camera);
      requestAnimationFrame(this.animate.bind(this));
    }
    ngAfterViewInit(): void {
      // this.createScene();
    }

}
